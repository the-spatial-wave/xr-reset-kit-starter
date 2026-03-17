---
name: new-scene
description: Use this skill when the user asks to "create a new scene", "add a scene", "nuova scena", "crea scena", or wants to build a new R3F/Three.js scene in this project. Guides the creation of a new scene following the xr-reset-kit-starter conventions.
version: 1.0.0
---

# New Scene — xr-reset-kit-starter

## Project Stack
- React 18 + @react-three/fiber v8 + @react-three/drei + Three.js 0.183
- @react-three/postprocessing v2 (NOT v3 — incompatible with React 18)
- Vite + TypeScript

## Scene File Location
All scenes live in `src/scenes/SceneName.tsx` and are exported as named functions.

## Minimal Scene Template

```tsx
// src/scenes/SceneName.tsx
import { Suspense } from 'react'
import { Particles } from '../components/Particles'
import { NeonArch } from '../components/NeonArch'
import { FloorGlow } from '../components/FloorGlow'
import { Effects } from '../components/Effects'

export function SceneName() {
  return (
    <>
      <Effects />

      <color attach="background" args={['#050012']} />
      <fog attach="fog" args={['#180028', 2.7, 9.2]} />

      {/* ── LUCI BASE ── */}
      <ambientLight intensity={0.035} color="#2a1750" />
      <hemisphereLight intensity={0.06} color="#77bfff" groundColor="#0a0012" />
      <directionalLight position={[0, 2.1, 4]} intensity={0.06} color="#e5efff" />

      {/* ── HALO NEON ── */}
      <pointLight position={[0, 1.35, -1.4]} intensity={34} distance={6.5} decay={2} color="#9fefff" />

      {/* ── ELEMENTI ── */}
      <Particles count={45} />

      <group position={[0, 0.08, -0.52]} scale={0.66}>
        <NeonArch />
      </group>

      <group position={[0, 0.03, 0.02]} scale={0.78}>
        <FloorGlow />
      </group>

      {/* Modello 3D o placeholder */}
      <Suspense fallback={null}>
        {/* <group position={[0, 0.5, 0.18]} scale={1.28}><ModelComponent /></group> */}
      </Suspense>
    </>
  )
}
```

## Registrare la scena in App.tsx
Importa e usa la scena dentro `<Canvas>` in `src/App.tsx`:
```tsx
import { SceneName } from './scenes/SceneName'
// ...
<SceneName />
```

## Lighting Guidelines
- **ambientLight**: intensity max 0.1 — altrimenti schiaccia il neon
- **pointLight halo**: position z negativo (dietro il soggetto), intensity 30-60, decay={2}
- **Rim lights**: accenti magenta `#ff3ed5` e cyan `#32e7ff` sui lati del soggetto
- **Key spotlight**: `<spotLight penumbra={0.85} angle={0.28}>` dall'alto frontale
- Mai usare `color="transparent"` su `<color>` — Three.js non lo supporta

## Effects.tsx
Non modificare la struttura di Effects.tsx. Per cambiare bloom:
- `luminanceThreshold`: soglia (0.5 = solo elementi luminosi)
- `intensity`: 0.4-1.5 range normale per questa scena

## Font in SceneTexts
- Usa `@react-three/drei` `<Text>` con font CDN `.woff` (NON `.woff2` — troika non supporta woff2)
- CDN affidabile: `https://cdn.jsdelivr.net/npm/@fontsource/[font]/files/[font]-latin-[weight]-normal.woff`

## Componenti disponibili
| Componente | Descrizione |
|---|---|
| `<NeonArch />` | Arco neon con gradiente cyan→violet→pink |
| `<FloorGlow />` | Pavimento riflettente MeshReflectorMaterial |
| `<Particles count={N} />` | Particelle ambientali (45-120 consigliato) |
| `<Effects />` | Bloom + Noise + Vignette |
| `<SceneTexts />` | Titolo, sottotitolo, branding in 3D |
| `<GraffitiChair />` | Poltrona graffiti (richiede GLTF in public/models/) |

## Workflow & Execution Rules (Workflow OS)
- **Single-focus execution**: Lavora su una dimensione alla volta (scena, luci, UI). Non mescolare i concetti.
- **Scoped scene editing**: Definisci sempre la zona attiva (es. fronte/retro) e non toccare altre aree salvo esplicita richiesta.
- **Lighting contrast discipline**: Mantieni una gerarchia chiara. 1 luce primaria, 1-2 accenti cromatici. Evita il washout.
- **Validation before completion**: Verifica sempre chiarezza focale, contrasto e assenza di errori in console prima di chiudere un task.
- **Plan Mode**: Per task complessi (>2 step), definisci zona, outcome atteso e vincoli prima di iniziare.


