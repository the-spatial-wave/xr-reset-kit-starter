import { useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  void main() {
    // Gradiente da Cyan (#00E5FF) a Violet (#8A2BE2)
    vec3 colorA = vec3(0.0, 0.90, 1.00); // Cyan
    vec3 colorB = vec3(0.54, 0.17, 0.89); // Violet
    vec3 color = mix(colorA, colorB, vUv.x);
    gl_FragColor = vec4(color, 1.0);
  }
`

export function NeonArch() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group position={[0, 1.2, -1.0]}>
      {/* Ring principale con Shader Gradiente */}
      <mesh ref={meshRef}>
        <torusGeometry args={[2.5, 0.04, 16, 128]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
        />
      </mesh>

      {/* Alone Volumetrico (Haze) — Piano emissivo sfumato dietro l'arco */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[10, 8]} />
        <meshBasicMaterial
          color="#302060"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

    </group>
  )
}
