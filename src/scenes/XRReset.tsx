import { Suspense } from 'react'
import * as THREE from 'three'
import { Particles } from '../components/Particles'
import { NeonArch } from '../components/NeonArch'
import { FloorGlow } from '../components/FloorGlow'
import { GraffitiChair } from '../components/GraffitiChair'
import { SceneTexts } from '../components/SceneTexts'
import { Effects } from '../components/Effects'
import { AudioPlayer } from '../components/AudioPlayer'
import { VideoPanel } from '../components/VideoPanel'
import { CameraRig } from '../components/CameraRig'

interface XRResetProps {
  mode: 'DEFAULT' | 'VIDEO'
  entered: boolean
  videoUrl: string
}

export function XRReset({ mode, entered, videoUrl }: XRResetProps) {
  return (
    <>
      <Effects />

      {/* Audio Ambient — si attiva solo dopo l'ingresso, in pausa quando il portale è attivo */}
      {entered && (
        <AudioPlayer
          url="/audio/audio ambient.mp3"
          volume={0.4}
          loop={true}
          paused={mode === 'VIDEO'}
        />
      )}

      {/* Background più scuro per aumentare contrasto e saturazione */}
      <color attach="background" args={['#020009']} />
      <fog attach="fog" args={['#0b0216', 4, 14]} />

      {/* ── LUCI BASE ── */}
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

      {/* ── HALO PRINCIPALE ── */}
      <pointLight
        position={[0, 1.35, -1.4]}
        intensity={42}
        distance={6.5}
        decay={2}
        color="#9fefff"
      />

      <pointLight
        position={[0, 1.35, -1.6]}
        intensity={60}
        distance={7}
        decay={2}
        color="#8ff7ff"
      />

      {/* Accenti colorati */}
      <pointLight position={[-1.0, 0.95, -0.15]} intensity={10} color="#ff45d8" />
      <pointLight position={[1.0, 0.95, -0.15]} intensity={10} color="#3be4ff" />

      {/* Glow pavimento */}
      <pointLight position={[-0.55, 0.08, -0.28]} intensity={3.5} color="#ff3edb" />
      <pointLight position={[0.55, 0.08, -0.28]} intensity={3.5} color="#32e7ff" />

      {/* Key light sulla chair */}
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

      {/* ── ELEMENTI SCENA ── */}
      <Particles count={28} />

      {/* Portale (Fermo, camera si sposta sul retro) */}
      <group position={[0, 0.08, -0.52]} scale={0.66}>
        {/* Fronte: L'arco neon */}
        <NeonArch />

        {/* Retro: Il pannello video (alzato e ingrandito per impatto cinematografico) */}
        <group position={[0, 1.55, -1.15]} rotation={[0, Math.PI, 0]} scale={1.32}>
          <VideoPanel
            url={videoUrl}
            visible={mode === 'VIDEO'}
          />
        </group>
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
      {mode === 'DEFAULT' && <SceneTexts />}

      {/* Gestione Camera Cinematografica */}
      <CameraRig mode={mode} />
    </>
  )
}
