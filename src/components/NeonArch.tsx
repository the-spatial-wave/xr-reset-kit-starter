import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
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
    float core  = 1.0 - smoothstep(0.0, 0.9, tube);
    color *= 0.65 + core * 1.1;

    gl_FragColor = vec4(color, 1.0);
  }
`

// ── PORTAL SHADER ──
const portalVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const portalFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  // Noise semplice 2D
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);

    // Edge fade — si dissolve verso il bordo dell'arco
    float edge = 1.0 - smoothstep(0.28, 0.5, dist);
    if (edge <= 0.0) discard;

    // Angolo + swirl animato
    float angle = atan(uv.y, uv.x);
    float swirl = sin(angle * 4.0 + dist * 10.0 - uTime * 1.2) * 0.5 + 0.5;

    // Nebbia procedurale
    float n1 = noise(uv * 4.0 + uTime * 0.15);
    float n2 = noise(uv * 8.0 - uTime * 0.22);
    float nebula = n1 * 0.6 + n2 * 0.4;

    // Gradiente colori — cyan centro, violet mid, pink bordo
    vec3 cyan   = vec3(0.05, 0.92, 1.00);
    vec3 violet = vec3(0.52, 0.15, 0.92);
    vec3 pink   = vec3(1.00, 0.20, 0.88);

    float t = dist * 1.4 + swirl * 0.25 + nebula * 0.15;
    vec3 color = mix(cyan, violet, smoothstep(0.0, 0.6, t));
    color      = mix(color, pink,  smoothstep(0.4, 1.0, t));

    // Glow al centro
    float centerGlow = 1.0 - smoothstep(0.0, 0.3, dist);
    color += cyan * centerGlow * 0.6;

    // Pulsazione lenta
    float pulse = 0.85 + sin(uTime * 0.8) * 0.15;

    gl_FragColor = vec4(color * pulse, edge * 0.62);
  }
`

export function NeonArch() {
  const meshRef = useRef<THREE.Mesh>(null)
  const portalRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (portalRef.current) {
      portalRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <group position={[0, 1.2, -1.0]}>

      {/* ── PORTALE — disco animato dentro l'arco ── */}
      <mesh position={[0, 0, 0.05]}>
        <circleGeometry args={[2.42, 128]} />
        <shaderMaterial
          ref={portalRef}
          vertexShader={portalVertexShader}
          fragmentShader={portalFragmentShader}
          uniforms={{ uTime: { value: 0 } }}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

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
