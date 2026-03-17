// VideoPanel.tsx
// Pannello video 16:9 con architettura ultra-robusta per WebXR

import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uVideo;
  uniform float uVideoAspect;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    const float planeAspect = 2.6 / 1.46;

    // Contain: mantieni le proporzioni del video, portal bg sulle barre
    float va = uVideoAspect;
    float pa = planeAspect;
    vec2 videoUv = uv;
    float inVideo = 0.0;

    if (va < pa) {
      // Video verticale → barre laterali
      float w = va / pa;
      float x0 = 0.5 - w * 0.5;
      float x1 = 0.5 + w * 0.5;
      if (uv.x >= x0 && uv.x <= x1) {
        videoUv = vec2((uv.x - x0) / w, uv.y);
        inVideo = 1.0;
      }
    } else {
      // Video orizzontale / quadrato → barre top/bottom (o fit esatto)
      float h = pa / va;
      float y0 = 0.5 - h * 0.5;
      float y1 = 0.5 + h * 0.5;
      if (uv.y >= y0 && uv.y <= y1) {
        videoUv = vec2(uv.x, (uv.y - y0) / h);
        inVideo = 1.0;
      }
    }

    // Fade sottile solo sui bordi del video (ridotto da 14%/10% a 5%/4%)
    float fadeX = smoothstep(0.0, 0.05, videoUv.x) * smoothstep(1.0, 0.95, videoUv.x);
    float fadeY = smoothstep(0.0, 0.04, videoUv.y) * smoothstep(1.0, 0.96, videoUv.y);
    float videoMask = inVideo * fadeX * fadeY;

    vec4 videoSample = texture2D(uVideo, videoUv);

    // Portal background
    vec2 centered = uv - 0.5;
    float radial = length(centered) * 2.0;
    vec3 portalBg = mix(
      vec3(0.02, 0.04, 0.12),
      mix(vec3(0.05, 0.85, 1.0) * 0.18,
          vec3(0.52, 0.15, 0.92) * 0.22,
          clamp(radial, 0.0, 1.0)),
      clamp(radial * 0.8, 0.0, 1.0)
    );

    vec3 col = mix(portalBg, videoSample.rgb, videoMask);
    float alpha = 0.96;
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
  // 1. Elemento video persistente e integrato nel DOM (nascosto)
  const [video] = useState(() => {
    const v = document.createElement('video')
    v.playsInline = true
    v.preload = 'auto'
    v.muted = false
    v.loop = false
    v.crossOrigin = 'anonymous'
    // Stile per nasconderlo ma mantenerlo "attivo" per il browser
    v.style.position = 'fixed'
    v.style.top = '0'
    v.style.left = '0'
    v.style.width = '1px'
    v.style.height = '1px'
    v.style.opacity = '0'
    v.style.pointerEvents = 'none'
    return v
  })

  // 2. Texture persistente
  const texture = useMemo(() => {
    const tex = new THREE.VideoTexture(video)
    tex.minFilter = THREE.LinearFilter
    tex.magFilter = THREE.LinearFilter
    if ('colorSpace' in tex) (tex as any).colorSpace = THREE.SRGBColorSpace
    tex.update = () => {}  // needsUpdate gestito manualmente in useFrame
    return tex
  }, [video])

  const uniforms = useMemo(() => ({
    uVideo: { value: texture },
    uVideoAspect: { value: 16 / 9 },
  }), [texture])
  const errorRef = useRef(false)

  // 3. Mount/Unmount del video nel DOM
  useEffect(() => {
    document.body.appendChild(video)
    return () => {
      if (document.body.contains(video)) document.body.removeChild(video)
    }
  }, [video])

  // 4. Update sorgente
  useEffect(() => {
    if (!url) return

    errorRef.current = false
    const handleLoad = () => console.log("VideoPanel: Success ->", url)
    const handleError = () => {
      const err = video.error
      console.error(`VideoPanel: MediaError [${err?.code}] on ->`, url)
      errorRef.current = true
    }
    const handleMeta = () => {
      if (video.videoWidth && video.videoHeight) {
        uniforms.uVideoAspect.value = video.videoWidth / video.videoHeight
      }
    }

    video.addEventListener('canplay', handleLoad)
    video.addEventListener('error', handleError)
    video.addEventListener('loadedmetadata', handleMeta)

    // Gestione CORS intelligente
    if (url.startsWith('blob:') || !url.startsWith('http')) {
      video.removeAttribute('crossOrigin')
    } else {
      video.crossOrigin = 'anonymous'
    }

    video.src = url
    video.load()

    return () => {
      video.removeEventListener('canplay', handleLoad)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadedmetadata', handleMeta)
    }
  }, [url, video, uniforms])

  // 5. Play/Pause
  useEffect(() => {
    if (visible && url) {
      const playVideo = () => {
        video.play().catch(() => {
          video.muted = true
          video.play().catch(e => console.error("VideoPanel: Critical Play Error", e))
        })
      }

      // HAVE_FUTURE_DATA = 3, HAVE_ENOUGH_DATA = 4
      if (video.readyState >= 3) playVideo()
      else video.addEventListener('canplaythrough', playVideo, { once: true })
    } else {
      video.pause()
      video.currentTime = 0
    }
  }, [visible, url, video])

  // 6. Eventi
  useEffect(() => {
    if (onEnded) video.addEventListener('ended', onEnded)
    return () => {
      if (onEnded) video.removeEventListener('ended', onEnded)
    }
  }, [video, onEnded])

  // 7. Raf Update
  useFrame(() => {
    // Evitiamo texImage2D se il video non è pronto e non ha dimensioni
    if (visible && !errorRef.current && video.readyState >= 3 && video.videoWidth > 0 && video.videoHeight > 0) {
      texture.needsUpdate = true
    }
  })

  if (!visible) return null

  return (
    <mesh>
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
