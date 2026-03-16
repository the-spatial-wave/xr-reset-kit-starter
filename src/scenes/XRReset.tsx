// XRReset.tsx
// xr-reset-kit-starter — The Spatial Wave
// Scena: XR Reset — "Build your first XR space"

import { Suspense } from 'react'
import { Particles } from '../components/Particles'
import { NeonArch } from '../components/NeonArch'
import { FloorGlow } from '../components/FloorGlow'
import { GraffitiChair } from '../components/GraffitiChair'
import { SceneTexts } from '../components/SceneTexts'
import { Effects } from '../components/Effects'

export function XRReset() {
  return (
    <>
      <Effects />

      <color attach="background" args={['#050012']} />
      <fog attach="fog" args={['#180028', 2.7, 9.2]} />

      {/* ── LUCI BASE ── */}
      <ambientLight intensity={0.035} color="#2a1750" />

      <hemisphereLight
        intensity={0.06}
        color="#77bfff"
        groundColor="#0a0012"
      />

      <directionalLight
        position={[0, 2.1, 4]}
        intensity={0.05}
        color="#e5efff"
      />

      {/* ── HALO DIETRO L'ARCO / POLTRONA ── */}
      <pointLight
        position={[0, 1.32, -0.45]}
        intensity={32}
        distance={4.2}
        decay={2}
        color="#87f7ff"
      />

      <pointLight
        position={[-0.62, 1.1, -0.36]}
        intensity={22}
        distance={3.5}
        decay={2}
        color="#ff3ed5"
      />

      <pointLight
        position={[0.64, 1.1, -0.36]}
        intensity={20}
        distance={3.5}
        decay={2}
        color="#32e7ff"
      />

      <pointLight
        position={[0, 1.95, -0.38]}
        intensity={8}
        distance={3.8}
        decay={2}
        color="#d2fbff"
      />

      {/* Rim light morbide sui lati della poltrona */}
      <pointLight
        position={[-0.98, 1.0, 0.24]}
        intensity={14}
        distance={2.9}
        decay={2}
        color="#ff4ddd"
      />

      <pointLight
        position={[0.98, 1.0, 0.24]}
        intensity={14}
        distance={2.9}
        decay={2}
        color="#49e8ff"
      />

      {/* Atmosfera laterale */}
      <pointLight
        position={[-2.2, 0.9, 0.3]}
        intensity={13}
        distance={5.4}
        decay={2}
        color="#7c27ff"
      />

      <pointLight
        position={[2.15, 0.95, 0.35]}
        intensity={13}
        distance={5.3}
        decay={2}
        color="#1edcff"
      />

      {/* Riflessi a terra */}
      <pointLight
        position={[-0.58, 0.15, 0.9]}
        intensity={10}
        distance={2.5}
        decay={2}
        color="#ff42d8"
      />

      <pointLight
        position={[0.6, 0.15, 0.9]}
        intensity={10}
        distance={2.5}
        decay={2}
        color="#39e3ff"
      />

      {/* Fill basso minimo */}
      <pointLight
        position={[0, 0.72, 1.55]}
        intensity={4.5}
        distance={2.8}
        decay={2}
        color="#a9c2ff"
      />

      {/* ── ELEMENTI SCENA ── */}
      <Particles count={38} />

      {/* Arco piccolo e vicino, ma un po' più basso per non mangiare il sottotitolo */}
      <group position={[0, 0.08, -0.52]} scale={0.66}>
        <NeonArch />
      </group>

      {/* Glow più stretto sotto la chair */}
      <group position={[0, 0.03, 0.02]} scale={0.78}>
        <FloorGlow />
      </group>

      {/* Poltrona: posizione mantenuta */}
      <Suspense fallback={null}>
        <group position={[0, 0.5, 0.18]} scale={1.28}>
          <GraffitiChair />
        </group>
      </Suspense>

      {/* Testi scena */}
      <SceneTexts />
    </>
  )
}
