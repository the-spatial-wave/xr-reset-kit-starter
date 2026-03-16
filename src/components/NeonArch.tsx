import { useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// vUv.x = posizione lungo l'arco (0 → 1, sinistra → destra)
// vUv.y = posizione intorno al tubo (0 → 1, usato per il core glow)
const fragmentShader = `
  varying vec2 vUv;

  void main() {
    // 3 colori: cyan → violet → pink/magenta
    vec3 cyan   = vec3(0.05, 0.92, 1.00);
    vec3 violet = vec3(0.52, 0.15, 0.92);
    vec3 pink   = vec3(1.00, 0.20, 0.88);

    float t = vUv.x;

    // Pesi normalizzati: nessun taglio netto, blend continuo
    float wCyan   = 1.0 - smoothstep(0.0, 0.75, t);
    float wViolet = smoothstep(0.0, 0.55, t) * (1.0 - smoothstep(0.45, 1.0, t));
    float wPink   = smoothstep(0.25, 1.0, t);
    float total   = wCyan + wViolet + wPink;
    vec3 color    = (cyan * wCyan + violet * wViolet + pink * wPink) / total;

    // glow core: centro tubo brillante, bordi sfumati
    float tube  = abs(vUv.y - 0.5) * 2.0;        // 0 = centro, 1 = bordo
    float core  = 1.0 - smoothstep(0.0, 0.9, tube);
    color *= 0.65 + core * 1.1;

    gl_FragColor = vec4(color, 1.0);
  }
`

const glowFragmentShader = `
  varying vec2 vUv;

  void main() {
    vec3 cyan   = vec3(0.05, 0.92, 1.00);
    vec3 violet = vec3(0.52, 0.15, 0.92);
    vec3 pink   = vec3(1.00, 0.20, 0.88);

    float t = vUv.x;
    float wCyan   = 1.0 - smoothstep(0.0, 0.75, t);
    float wViolet = smoothstep(0.0, 0.55, t) * (1.0 - smoothstep(0.45, 1.0, t));
    float wPink   = smoothstep(0.25, 1.0, t);
    float total   = wCyan + wViolet + wPink;
    vec3 color    = (cyan * wCyan + violet * wViolet + pink * wPink) / total;

    float tube  = abs(vUv.y - 0.5) * 2.0;
    float alpha = 1.0 - smoothstep(0.0, 1.0, tube);

    gl_FragColor = vec4(color * 0.6, alpha * 0.35);
  }
`

export function NeonArch() {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <group position={[0, 1.2, -1.0]}>

      {/* Core neon principale */}
      <mesh ref={meshRef}>
        <torusGeometry args={[2.5, 0.04, 16, 128]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
        />
      </mesh>

      {/* Alone volumetrico sfondo */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[10, 8]} />
        <meshBasicMaterial
          color="#302060"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

    </group>
  )
}
