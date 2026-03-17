# Comando Antigravity — XR Starter Kit per Creator
# Copia e incolla questo prompt nella chat di Antigravity

---

## BLAST — Metodo Jack Robert
### Prompt strutturato per Antigravity · Progetto: XR Starter Kit per Creator

Il BLAST è il formato di kickoff AI-first sviluppato da Jack Robert.
Ogni lettera copre un livello del progetto: Background, Layout, Actions, Safeguards, Tests.
Incolla l'intero blocco nella chat AI di Antigravity (Cmd+L / Ctrl+L).

---

```
╔══════════════════════════════════════════════════════════════════════╗
║   BLAST — XR STARTER KIT PER CREATOR                                ║
║   Progetto: xr-immersive-web-v1 · The Spatial Wave                  ║
║   Metodo: Jack Robert BLAST · AI-first dev prompt                   ║
╚══════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
B — BACKGROUND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stai lavorando su xr-immersive-web-v1, il progetto WebXR di The Spatial
Wave. Stack: React 18 + TypeScript + Vite + Three.js r128 + React Three
Fiber + @react-three/drei. Deploy su Vercel via push GitHub.

Il tuo obiettivo e' creare UNA SCENA STANDALONE chiamata
"XR Starter Kit per Creator" — una scena onboarding che introduce
i creator al mondo XR attraverso un visual iconico:
  - Una poltrona graffiti al centro di un portale neon circolare
  - Atmosfera dark-blue con particelle e riflessi colorati
  - Testi motivazionali sovrapposti (HTML overlay)
  - Nome componente: SceneXRStarterKit
  - File: src/scenes/SceneXRStarterKit.tsx

Questa scena e' il punto di ingresso per nuovi creator: deve essere
visivamente impattante, leggera (niente GLTF pesanti inizialmente)
e completamente autonoma rispetto alle scene esistenti.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
L — LAYOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Struttura 3D della scena (dal basso verso l'alto):

  [ PAVIMENTO ]
    Plane 28x28, colore #080C12
    + 2 pool di glow: CYAN (destra) e MAGENTA (sinistra)
    + alone viola centrale sotto la poltrona

  [ POLTRONA — elemento principale ]
    Armchair graffiti al centro, posizione [0, 0, 0.3]
    → Usa ChairPlaceholder (box geometries) finche' non hai il GLTF
    → Quando disponibile: /public/models/chair-graffiti.glb

  [ PORTALE NEON — arco circolare ]
    Torus ring bianco emissivo, position [0, 2.8, -1.2]
    Il gradiente MAGENTA (sx) → CYAN (dx) e' creato dai pointLight
    Un secondo torus piu' grande crea il glow diffuso intorno all'arco

  [ PARTICELLE ]
    ~220 punti argento sparsi nello spazio 3D
    Rotazione Y lenta su useFrame

  [ NEBBIA ]
    fog: color #0a0818, near 10, far 22

  [ HTML OVERLAY — solo desktop >= 768px ]
    TOP CENTER:
      "XR RESET"  — Orbitron 58px bold bianco, textShadow viola
      "Build your first XR space" — Manrope 17px #00E5FF

    BOTTOM CENTER (vicino al pavimento):
      "THE SPATIAL WAVE" — Orbitron 11px #C8CCD6 letterSpacing 6px

  Palette colori:
    --void:    #080C12   (sfondo)
    --cyan:    #00E5FF   (luce dx, testi attivi)
    --magenta: #FF2FD6   (luce sx, accenti caldi)
    --violet:  #7A6CFF   (fill ombre)
    --silver:  #C8CCD6   (testo secondario)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A — ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Esegui questi passi nell'ordine esatto. Non saltare nessuno.

  STEP 1 — Leggi il progetto
    cat src/store/useAppStore.ts
    cat App.tsx
    ls src/scenes/
    ls public/models/

  STEP 2 — Crea il componente
    Crea src/scenes/SceneXRStarterKit.tsx con:
    a) Componente Particles (useRef<THREE.Points>, useFrame, ~220 punti)
    b) Componente NeonArch (torus + glow, position [0,2.8,-1.2])
    c) Componente FloorGlow (3 piani emissivi: cyan, magenta, viola)
    d) Componente ChairPlaceholder (box geometries, vedere misure in S)
    e) Componente SceneTexts (Html overlay, solo !isMobile)
    f) Export function SceneXRStarterKit con fog, luci, tutti i componenti

  STEP 3 — Luci da implementare (NON superare 0.06 ambient)
    <ambientLight intensity={0.06} />
    <directionalLight position={[2, 8, 4]} intensity={0.25} color="#9090ff" />
    <pointLight position={[-4, 3, -0.5]} color="#FF2FD6" intensity={4} distance={9} decay={2} />
    <pointLight position={[4, 3, -0.5]} color="#00E5FF" intensity={4} distance={9} decay={2} />
    <pointLight position={[0, 0.3, 1]} color="#7A6CFF" intensity={1.2} distance={4} decay={2} />
    <spotLight position={[0, 6, 1]} intensity={0.6} angle={0.4} penumbra={0.8} />

  STEP 4 — Aggiorna App.tsx
    SOLO se manca la rotta/import per SceneXRStarterKit.
    NON modificare nient'altro in App.tsx.

  STEP 5 — Build check
    npm run build
    Atteso: 0 errors, 0 warnings critici
    Verifica: ls -la dist/index.html (deve essere > 50.000 bytes)

  STEP 6 — Output
    Comunica: "SceneXRStarterKit — build OK"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
S — SAFEGUARDS  (regole che non puoi violare)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  LIGHT RULES:
    ambientLight intensity MAX 0.06 — MAI superare

  FILE RULES:
    NON modificare scene esistenti (Scene1, Scene2, Scene3, Scene4)
    NON modificare App.tsx salvo aggiunta rotta nuova scena
    NON modificare l'avatar Lyra, il pavimento esistente, l'anello cyan
    NON creare file al di fuori di src/scenes/ senza esplicita richiesta

  CODE RULES:
    CylinderGeometry: SEMPRE con heightSegments=1 (quinto argomento)
    Html drei: SEMPRE occlude={false} e zIndexRange={[1, 10]}
    Html drei: NON renderizzare su mobile (window.innerWidth < 768)
    Navigazione: leggere SEMPRE useAppStore.ts — NON inventare metodi
    Commenti JSX: solo ASCII, zero emoji nel codice

  CHAIR PLACEHOLDER (misure esatte):
    Seduta:     boxGeometry [1.1, 0.18, 0.9]  pos [0, 0.42, 0]   #1A0A30
    Schienale:  boxGeometry [1.1, 0.82, 0.16] pos [0, 0.92, -0.37] #1A0A30
    Bracciolo L: boxGeometry [0.12, 0.38, 0.9] pos [-0.52, 0.62, 0] #150820
    Bracciolo R: boxGeometry [0.12, 0.38, 0.9] pos [0.52, 0.62, 0]  #150820
    Base:       boxGeometry [0.95, 0.28, 0.75] pos [0, 0.14, 0]   #0E0518
    Gruppo: position={[0, 0, 0.3]}

  NEON ARCH (misure esatte):
    Ring:       torusGeometry [2.85, 0.045, 16, 120]
                material: color #fff, emissive #fff, emissiveIntensity 1.2
    Glow ring:  torusGeometry [2.85, 0.16, 16, 120]
                material: color #aaaaff, emissive #aaaaff, intensity 0.4,
                transparent, opacity 0.12
    Posizione gruppo: [0, 2.8, -1.2]

  GLTF CHAIR (blocco commentato da lasciare nel codice):
    // import { useGLTF } from '@react-three/drei'
    // function GraffitiChair() {
    //   const { scene } = useGLTF('/models/chair-graffiti.glb')
    //   return <primitive object={scene} position={[0, 0, 0.3]} scale={1} />
    // }
    // useGLTF.preload('/models/chair-graffiti.glb')

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
T — TESTS  (criteri di successo)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  BUILD:
    [ ] npm run build -> exit code 0
    [ ] dist/index.html > 50.000 bytes
    [ ] Nessun TypeScript error

  VISUAL (npm run dev -> http://localhost:5173):
    [ ] Sfondo dark blue-purple visibile
    [ ] Arco neon circolare con glow colorato visibile
    [ ] Poltrona al centro dell'arco
    [ ] Riflessi CYAN (dx) e MAGENTA (sx) sul pavimento
    [ ] Particelle bianche/argento sparse nella scena
    [ ] Testo "XR RESET" in overlay in alto
    [ ] Testo "Build your first XR space" in cyan sotto il titolo
    [ ] "THE SPATIAL WAVE" in basso

  ISOLAMENTO:
    [ ] Le scene esistenti non sono state modificate
    [ ] App.tsx: solo l'import e la rotta di SceneXRStarterKit aggiunti
    [ ] Nessun file eliminato o rinominato
```

---

## NOTE PER IL COLLEGA

**Cos'e' il metodo BLAST di Jack Robert?**
E' un framework di prompting AI-first sviluppato per editor come Antigravity e Cursor.
Struttura ogni richiesta in 5 livelli (Background, Layout, Actions, Safeguards, Tests)
cosi' l'AI ha tutto il contesto necessario per eseguire in autonomia senza fare
domande o prendere decisioni sbagliate.

**Come usarlo:**
1. Apri Antigravity nel tuo progetto xr-immersive-web-v1
2. Premi `Cmd+L` (Mac) o `Ctrl+L` (Windows) per aprire la chat AI
3. Copia tutto il blocco dentro i backtick sopra
4. Incolla nella chat e premi invio
5. Antigravity leggera' lo store, creera' il file e verifichera' la build

**Il modello GLTF della poltrona**
Il BLAST usa un placeholder geometrico. Quando hai il modello 3D:
1. Salva in `/public/models/chair-graffiti.glb`
2. In `SceneXRStarterKit.tsx` commenta `<ChairPlaceholder />` e decommenta `<GraffitiChair />`
3. Decommenta il blocco import useGLTF e la funzione GraffitiChair
4. Rifai `npm run build` e verifica

---

*The Spatial Wave · xr-immersive-web skill v1.0 · Jack Robert BLAST method · 2026*
