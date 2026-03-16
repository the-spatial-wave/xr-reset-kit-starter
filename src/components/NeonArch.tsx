// NeonArch.tsx
// Arco neon circolare con glow cyan/magenta
// Il gradiente colore e' creato dai pointLight laterali in XRReset.tsx

export function NeonArch() {
  return (
    <group position={[0, 2.8, -1.2]}>
      {/* Ring principale — bianco emissivo */}
      <mesh>
        <torusGeometry args={[2.85, 0.045, 16, 120]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1.2}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Glow esterno — alone diffuso */}
      <mesh>
        <torusGeometry args={[2.85, 0.16, 16, 120]} />
        <meshStandardMaterial
          color="#aaaaff"
          emissive="#aaaaff"
          emissiveIntensity={0.4}
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  )
}
