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
import { AudioPlayer } from '../components/AudioPlayer'

export function XRReset() {
  return (
    <>
      <Effects />
      <AudioPlayer url="/audio/audio ambient.mp3" volume={0.45} />

      {/* Background più scuro per aumentare contrasto e saturazione */}
      <color attach="background" args={['#020009']} />
      <fog attach="fog" args={['#0b0216', 4, 14]} />

      {/* ── LUCI BASE ── */}
      {/* Base minima: niente wash generale */}
      <ambientLight intensity={0.02} color="#241040" />

      <hemisphereLight
        intensity={0.04}
        color="#5ea8ff"
        groundColor="#07000d"
      />

      <directionalLight
        position={[0, 2.2, 4]}
        intensity={0.035}
        color="#dce9ff"
      />

      {/* ── HALO PRINCIPALE: UNA SOLA LUCE DIETRO L'ARCO ── */}
      {/* Questa è la luce chiave che crea l'aura poster-like */}
      <pointLight
        position={[0, 1.35, -1.4]}
        intensity={42}
        distance={6.5}
        decay={2}
        color="#9fefff"
      />

      {/* Halo aggiuntivo dietro arco */}
      <pointLight
        position={[0, 1.35, -1.6]}
        intensity={60}
        distance={7}
        decay={2}
        color="#8ff7ff"
      />

      {/* ── ACCENTI LEGGERI MAGENTA / CYAN ── */}
      <pointLight
        position={[-1.0, 0.95, -0.15]}
        intensity={10}
        distance={3.2}
        decay={2}
        color="#ff45d8"
      />

      <pointLight
        position={[1.0, 0.95, -0.15]}
        intensity={10}
        distance={3.2}
        decay={2}
        color="#3be4ff"
      />

      {/* ── ATMOSFERA LATERALE CONTROLLATA ── */}
      <pointLight
        position={[-2.0, 0.55, 0.55]}
        intensity={8}
        distance={4.6}
        decay={2}
        color="#7f2cff"
      />

      <pointLight
        position={[2.0, 0.55, 0.55]}
        intensity={8}
        distance={4.6}
        decay={2}
        color="#1edbff"
      />

      {/* Glow viola pavimento — largo e morbido */}
      <pointLight
        position={[-0.55, 0.08, -0.28]}
        intensity={3.5}
        distance={8}
        decay={1}
        color="#ff3edb"
      />

      {/* Glow cyan pavimento — largo e morbido */}
      <pointLight
        position={[0.55, 0.08, -0.28]}
        intensity={3.5}
        distance={8}
        decay={1}
        color="#32e7ff"
      />

      {/* Key light sulla chair — frontale alto, neutro/freddo */}
      <spotLight
        position={[0, 2.8, 2.2]}
        target-position={[0, 0.6, 0.18]}
        intensity={55}
        distance={6}
        angle={0.28}
        penumbra={0.85}
        decay={2}
        color="#e8f4ff"
      />

      {/* Punto luce frontale basso — subito davanti alla chair */}
      <pointLight
        position={[0, 0.32, 1.6]}
        intensity={12}
        distance={2.5}
        decay={2}
        color="#e8f4ff"
      />

      {/* Fill molto leggero sulla chair */}
      <pointLight
        position={[0, 0.78, 1.45]}
        intensity={3.5}
        distance={2.8}
        decay={2}
        color="#9dbbff"
      />

      {/* ── ELEMENTI SCENA ── */}
      <Particles count={28} />

      {/* Arco */}
      <group position={[0, 0.08, -0.52]} scale={0.66}>
        <NeonArch />
      </group>

      {/* Glow pavimento */}
      <group position={[0, 0.03, 0.02]} scale={0.78}>
        <FloorGlow />
      </group>

      {/* Piano scuro sotto la poltrona */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <circleGeometry args={[3.2, 64]} />
        <meshBasicMaterial color="#010005" transparent opacity={0.82} depthWrite={false} />
      </mesh>

      {/* Poltrona */}
      <Suspense fallback={null}>
        <group position={[0, 0.5, 0.18]} scale={1.28}>
          <GraffitiChair />
        </group>
      </Suspense>

      {/* Testi */}
      <SceneTexts />
    </>
  )
}
