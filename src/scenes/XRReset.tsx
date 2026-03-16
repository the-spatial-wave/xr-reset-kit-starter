// XRReset.tsx
// xr-reset-kit-starter — The Spatial Wave
// Scena: XR Reset — "Build your first XR space"

import { Suspense } from 'react'
import { Particles } from '../components/Particles'
import { NeonArch } from '../components/NeonArch'
import { FloorGlow } from '../components/FloorGlow'
import { ChairPlaceholder } from '../components/ChairPlaceholder'
import { SceneTexts } from '../components/SceneTexts'

// Quando il modello GLTF e' disponibile:
// 1. Salva in public/models/chair-graffiti.glb
// 2. Importa GraffitiChair da '../components/GraffitiChair'
// 3. Sostituisci <ChairPlaceholder /> con <GraffitiChair />

export function XRReset() {
  return (
    <>
      {/* Nebbia atmosferica dark blue */}
      <fog attach="fog" args={['#0a0818', 10, 22]} />

      {/* ── LUCI ── */}
      <ambientLight intensity={0.06} />
      <directionalLight position={[2, 8, 4]} intensity={0.25} color="#9090ff" />
      {/* Magenta — sinistra */}
      <pointLight position={[-4, 3, -0.5]} color="#FF2FD6" intensity={4} distance={9} decay={2} />
      {/* Cyan — destra */}
      <pointLight position={[4, 3, -0.5]} color="#00E5FF" intensity={4} distance={9} decay={2} />
      {/* Violet fill — sotto */}
      <pointLight position={[0, 0.3, 1]} color="#7A6CFF" intensity={1.2} distance={4} decay={2} />
      {/* Spot fill — dall'alto */}
      <spotLight
        position={[0, 6, 1]}
        intensity={0.6}
        angle={0.4}
        penumbra={0.8}
        color="#ffffff"
      />

      {/* ── PAVIMENTO ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[28, 28]} />
        <meshStandardMaterial color="#080C12" roughness={0.95} metalness={0.05} />
      </mesh>

      {/* ── ELEMENTI SCENA ── */}
      <Particles count={220} />
      <NeonArch />
      <FloorGlow />

      <Suspense fallback={null}>
        <ChairPlaceholder />
      </Suspense>

      {/* ── OVERLAY TESTI ── */}
      <SceneTexts />
    </>
  )
}
