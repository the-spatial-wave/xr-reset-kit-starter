// FloorGlow.tsx
// Riflessi colorati sul pavimento: cyan (dx), magenta (sx), violet (centro)

import { MeshReflectorMaterial } from '@react-three/drei'

export function FloorGlow() {
  return (
    <group>
      {/* Pavimento riflettente principale */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#1a0033" // Very dark purple
          metalness={0.5}
          mirror={1}
        />
      </mesh>

    </group>
  )
}
