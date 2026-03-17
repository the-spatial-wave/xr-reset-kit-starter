// SceneXRReset.tsx
// The Spatial Wave — xr-immersive-web-v1
// Scena: XR RESET — "Build your first XR space"
// Ref visivo: poltrona graffiti + arco neon cyan/magenta + atmosfera dark
//
// ISTRUZIONI CHAIR:
//   - Inserisci il modello GLTF in /public/models/chair-graffiti.glb
//   - Decommenta il blocco GraffitiChair e commenta ChairPlaceholder
//   - Se non hai il modello, ChairPlaceholder e' il fallback visivo

import { useRef, useMemo, Suspense } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAppStore } from '../store/useAppStore'

// ─────────────────────────────────────────────────────────────────────────────
// PARTICELLE — stelle/polvere atmosferica
// ─────────────────────────────────────────────────────────────────────────────
function Particles({ count = 220 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = Math.random() * 7
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1
    }
    return pos
  }, [count])

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.015
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#C8CCD6"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ARCO NEON — ring con glow cyan->magenta
// Tecnica: 2 luci colorate (magenta sx, cyan dx) + torus bianco emissivo
// ─────────────────────────────────────────────────────────────────────────────
function NeonArch() {
  return (
    <group position={[0, 2.8, -1.2]}>
      {/* Ring principale */}
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
      {/* Alone esterno — glow diffuso */}
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

// ─────────────────────────────────────────────────────────────────────────────
// GLOW A TERRA — riflessi colorati sul pavimento
// ─────────────────────────────────────────────────────────────────────────────
function FloorGlow() {
  return (
    <group>
      {/* Riflesso cyan — destra */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.8, 0.005, 0.8]}>
        <planeGeometry args={[3.5, 2.5]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.13} />
      </mesh>
      {/* Riflesso magenta — sinistra */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.8, 0.005, 0.8]}>
        <planeGeometry args={[3.5, 2.5]} />
        <meshBasicMaterial color="#FF2FD6" transparent opacity={0.13} />
      </mesh>
      {/* Alone centrale sotto la poltrona */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0.4]}>
        <circleGeometry args={[1.2, 32]} />
        <meshBasicMaterial color="#7A6CFF" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAIR PLACEHOLDER — box colorato finche' non hai il GLTF
// ─────────────────────────────────────────────────────────────────────────────
function ChairPlaceholder() {
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
      {/* Bracciolo sx */}
      <mesh position={[-0.52, 0.62, 0]}>
        <boxGeometry args={[0.12, 0.38, 0.9]} />
        <meshStandardMaterial color="#150820" roughness={0.8} />
      </mesh>
      {/* Bracciolo dx */}
      <mesh position={[0.52, 0.62, 0]}>
        <boxGeometry args={[0.12, 0.38, 0.9]} />
        <meshStandardMaterial color="#150820" roughness={0.8} />
      </mesh>
      {/* Base/gambe */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[0.95, 0.28, 0.75]} />
        <meshStandardMaterial color="#0E0518" roughness={0.9} />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CHAIR GLTF — attiva quando il modello e' disponibile
// Decommenta tutto il blocco e commenta <ChairPlaceholder />
// ─────────────────────────────────────────────────────────────────────────────
// import { useGLTF } from '@react-three/drei'
// function GraffitiChair() {
//   const { scene } = useGLTF('/models/chair-graffiti.glb')
//   return <primitive object={scene} position={[0, 0, 0.3]} scale={1} />
// }
// useGLTF.preload('/models/chair-graffiti.glb')

// ─────────────────────────────────────────────────────────────────────────────
// TESTI HTML OVERLAY
// Struttura: titolo XR RESET + sottotitolo + bottom label
// Solo desktop (isMobile check)
// ─────────────────────────────────────────────────────────────────────────────
function SceneTexts() {
  return (
    <>
      {/* TITOLO + SOTTOTITOLO — in alto centrato */}
      <Html
        position={[0, 5.8, -1.2]}
        occlude={false}
        zIndexRange={[1, 10]}
        center
      >
        <div style={{ textAlign: 'center', pointerEvents: 'none', userSelect: 'none' }}>
          <div
            style={{
              fontFamily: "'Orbitron', 'Arial Black', Arial, sans-serif",
              fontSize: '58px',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '6px',
              lineHeight: 1,
              marginBottom: '14px',
              textShadow: '0 0 40px rgba(100, 80, 255, 0.9), 0 0 80px rgba(100, 80, 255, 0.4)',
            }}
          >
            XR RESET
          </div>
          <div
            style={{
              fontFamily: "'Manrope', Arial, sans-serif",
              fontSize: '17px',
              color: '#00E5FF',
              letterSpacing: '2.5px',
              fontWeight: 400,
              textShadow: '0 0 20px rgba(0, 229, 255, 0.6)',
            }}
          >
            Build your first XR space
          </div>
        </div>
      </Html>

      {/* LABEL BOTTOM — THE SPATIAL WAVE */}
      <Html
        position={[0, 0.08, 1.8]}
        occlude={false}
        zIndexRange={[1, 10]}
        center
      >
        <div
          style={{
            fontFamily: "'Orbitron', Arial, sans-serif",
            fontSize: '11px',
            fontWeight: 500,
            color: '#C8CCD6',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            userSelect: 'none',
            opacity: 0.85,
          }}
        >
          THE SPATIAL WAVE
        </div>
      </Html>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// SCENA PRINCIPALE
// ─────────────────────────────────────────────────────────────────────────────
export function SceneXRReset() {
  const isMobile = window.innerWidth < 768

  // Leggi useAppStore per il metodo di navigazione corretto
  // const { goToScene } = useAppStore()

  return (
    <>
      {/* NEBBIA atmosferica — dark blue-purple */}
      <fog attach="fog" args={['#0a0818', 10, 22]} />

      {/* ── LUCI ── */}
      {/* Ambient minimo — max 0.1 */}
      <ambientLight intensity={0.06} />
      {/* Direzionale chiave — luce morbida dall'alto */}
      <directionalLight position={[2, 8, 4]} intensity={0.25} color="#9090ff" />
      {/* Punto magenta — sinistra, colora il ring e il pavimento */}
      <pointLight position={[-4, 3, -0.5]} color="#FF2FD6" intensity={4} distance={9} decay={2} />
      {/* Punto cyan — destra, colora il ring e il pavimento */}
      <pointLight position={[4, 3, -0.5]} color="#00E5FF" intensity={4} distance={9} decay={2} />
      {/* Viola sotto — riempie le ombre della poltrona */}
      <pointLight position={[0, 0.3, 1]} color="#7A6CFF" intensity={1.2} distance={4} decay={2} />
      {/* Spot fill dall'alto sulla poltrona */}
      <spotLight
        position={[0, 6, 1]}
        target-position={[0, 0, 0.3]}
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

      {/* Poltrona — usa ChairPlaceholder finche' non hai il GLTF */}
      <Suspense fallback={null}>
        <ChairPlaceholder />
        {/* <GraffitiChair /> */}
      </Suspense>

      {/* ── TESTI OVERLAY — solo desktop ── */}
      {!isMobile && <SceneTexts />}
    </>
  )
}
