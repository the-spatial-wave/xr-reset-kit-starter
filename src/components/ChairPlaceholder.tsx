// ChairPlaceholder.tsx
// Poltrona placeholder con box geometries.
// Sostituire con GraffitiChair quando il modello GLTF e' disponibile:
//
//   import { useGLTF } from '@react-three/drei'
//   export function GraffitiChair() {
//     const { scene } = useGLTF('/models/chair-graffiti.glb')
//     return <primitive object={scene} position={[0, 0, 0.3]} scale={1} />
//   }
//   useGLTF.preload('/models/chair-graffiti.glb')

export function ChairPlaceholder() {
  return (
    <group position={[0, 0, 0.3]}>
      {/* Seduta */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.1, 0.18, 0.9]} />
        <meshStandardMaterial color="#1A0A30" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Schienale */}
      <mesh position={[0, 0.92, -0.37]}>
        <boxGeometry args={[1.1, 0.82, 0.16]} />
        <meshStandardMaterial color="#1A0A30" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Bracciolo sinistro */}
      <mesh position={[-0.52, 0.62, 0]}>
        <boxGeometry args={[0.12, 0.38, 0.9]} />
        <meshStandardMaterial color="#150820" roughness={0.8} />
      </mesh>

      {/* Bracciolo destro */}
      <mesh position={[0.52, 0.62, 0]}>
        <boxGeometry args={[0.12, 0.38, 0.9]} />
        <meshStandardMaterial color="#150820" roughness={0.8} />
      </mesh>

      {/* Base */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.95, 0.28, 0.75]} />
        <meshStandardMaterial color="#0E0518" roughness={0.9} />
      </mesh>
    </group>
  )
}
