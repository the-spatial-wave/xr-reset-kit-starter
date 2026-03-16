// FloorGlow.tsx
// Riflessi colorati sul pavimento: cyan (dx), magenta (sx), violet (centro)

export function FloorGlow() {
  return (
    <group>
      {/* Glow cyan — destra */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.8, 0.005, 0.8]}>
        <planeGeometry args={[3.5, 2.5]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.13} />
      </mesh>

      {/* Glow magenta — sinistra */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.8, 0.005, 0.8]}>
        <planeGeometry args={[3.5, 2.5]} />
        <meshBasicMaterial color="#FF2FD6" transparent opacity={0.13} />
      </mesh>

      {/* Alone violet — sotto la poltrona */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0.4]}>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color="#7A6CFF" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}
