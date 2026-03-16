// FloorGlow.tsx
// Pavimento dark blue/violet con leggera lucentezza

import * as THREE from 'three'
import { MeshReflectorMaterial } from '@react-three/drei'

export function FloorGlow() {
  return (
    <group>
      {/* Pavimento principale — dark blue/violet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[400, 150]}
          resolution={1024}
          mixBlur={0.8}
          mixStrength={3}
          roughness={0.55}
          depthScale={1.0}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#08001a"
          metalness={0.35}
          mirror={0}
        />
      </mesh>

      {/* Layer viola scuro overlay — per calore cromatico */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial
          color="#12003a"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
