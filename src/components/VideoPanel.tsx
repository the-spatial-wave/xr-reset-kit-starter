// VideoPanel.tsx
// Pannello video 9:16 con bordi sfumati — si fonde con il retro del portale

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Contenitore 16:9 con bordi opachi scuri — copre le scritte frontali del portale
const fragmentShader = `
  uniform sampler2D uVideo;
  varying vec2 vUv;

  void main() {
    // Flip X per orientamento corretto (piano ruotato 180° su Y)
    vec2 uv = vec2(1.0 - vUv.x, vUv.y);

    // Zona video centrale vs bordi scuri del portale
    float fadeX = smoothstep(0.0, 0.14, uv.x) * smoothstep(1.0, 0.86, uv.x);
    float fadeY = smoothstep(0.0, 0.10, uv.y) * smoothstep(1.0, 0.90, uv.y);
    float videoMask = fadeX * fadeY;

    vec4 video = texture2D(uVideo, uv);

    // Sfondo opaco scuro cyan/viola che copre le scritte frontali
    vec2 centered = uv - 0.5;
    float radial = length(centered) * 2.0;
    vec3 portalBg = mix(
      vec3(0.02, 0.04, 0.12),             // centro scuro
      mix(vec3(0.05, 0.85, 1.0) * 0.18,   // cyan bordo
          vec3(0.52, 0.15, 0.92) * 0.22,  // viola bordo
          clamp(radial, 0.0, 1.0)),
      clamp(radial * 0.8, 0.0, 1.0)
    );

    // Blend: centro = video, bordi = portale scuro opaco
    vec3 col = mix(portalBg, video.rgb, videoMask);

    // Alpha sempre alta — copre le scritte dietro
    float alpha = 0.96;
    // Fade solo agli angoli estremi del piano
    float cornerFade = smoothstep(0.0, 0.04, uv.x) * smoothstep(1.0, 0.96, uv.x)
                     * smoothstep(0.0, 0.04, uv.y) * smoothstep(1.0, 0.96, uv.y);
    alpha *= cornerFade;

    if (alpha <= 0.01) discard;

    gl_FragColor = vec4(col, alpha);
  }
`

interface VideoPanelProps {
  url: string
  visible: boolean
  onEnded?: () => void
}

export function VideoPanel({ url, visible, onEnded }: VideoPanelProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const textureRef = useRef<THREE.VideoTexture | null>(null)

  const uniforms = useMemo(() => ({
    uVideo: { value: null as THREE.VideoTexture | null },
  }), [])

  useEffect(() => {
    const video = document.createElement('video')
    video.src = encodeURI(url)
    video.loop = false
    video.muted = false      // audio del video abilitato
    video.playsInline = true
    video.preload = 'auto'
    if (onEnded) video.addEventListener('ended', onEnded)
    videoRef.current = video

    const texture = new THREE.VideoTexture(video)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    textureRef.current = texture
    uniforms.uVideo.value = texture

    return () => {
      if (onEnded) video.removeEventListener('ended', onEnded)
      video.pause()
      texture.dispose()
      uniforms.uVideo.value = null
    }
  }, [url, uniforms, onEnded])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (visible) {
      video.play().catch(() => {
        // Fallback muted se autoplay bloccato
        video.muted = true
        video.play().catch(() => {})
      })
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [visible])

  useFrame(() => {
    if (textureRef.current && visible) {
      textureRef.current.needsUpdate = true
    }
  })

  if (!visible) return null

  return (
    <mesh>
      {/*
        Formato 16:9 inscritto nell'arco (raggio portale ~1.6 world units)
        width 2.6, height 1.46 — diagonale angolo 1.49, dentro il cerchio
      */}
      <planeGeometry args={[2.6, 1.46]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.FrontSide}
        depthWrite={false}
      />
    </mesh>
  )
}
