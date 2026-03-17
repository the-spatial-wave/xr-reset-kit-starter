# Guida all'Implementazione — Scena XR Reset

Questa guida documenta l'architettura tecnica e le scelte di design implementate nella scena **XR Reset**, un ambiente cinematico cyberpunk ultra-dark ottimizzato per il WebXR.

## 1. Stack Tecnologico
- **Core**: React 18 + TypeScript + Vite.
- **3D Engine**: Three.js + React Three Fiber (R3F).
- **Utility**: `@react-three/drei` (per riflessi, testi e helper).
- **Post-processing**: `@react-three/postprocessing` (Bloom cinematico).

---

## 2. Architettura della Scena
La scena è gestita nel file principale [XRReset.tsx](file:///c:/Users/admin/Dev/XR_STARTER_KIT_SCENE/06_REPO/xr-reset-kit-starter/src/scenes/XRReset.tsx) e orchestrata come un insieme di componenti modulari:

- **`Effects`**: Gestisce il Bloom per far brillare le sorgenti luminose neon.
- **`NeonArch`**: L'elemento iconico ad arco con shader personalizzato.
- **`FloorGlow`**: Pavimento riflettente con layer additivi.
- **`GraffitiChair`**: Il modello 3D centrale (hero asset).
- **`Particles`**: Particelle fluttuanti per dare profondità volumetrica.
- **`SceneTexts`**: Pannelli informativi in glassmorphism.

---

## 3. Sistema di Illuminazione (Cinematic Lighting)
L'illuminazione è il cuore del look "premium". Invece di una luce ambientale piatta, utilizziamo oltre 10 sorgenti puntiformi:

- **Halo Posteriore**: Due `pointLight` ad alta intensità posizionate dietro l'arco per creare un'aura retroilluminata.
- **Accenti Cromatici**: Luci Magenta e Cyan ai lati della poltrona per simulare il riflesso dei neon.
- **Glow Pavimento**: Luci posizionate a `y=0.08` per illuminare morbidamente la base.
- **Hero Spotlight**: Una `spotLight` zenitale focalizzata sulla poltrona con decadimento rapido (`decay=2`).
- **Fill Light**: Un punto luce frontale per morbidezza sui dettagli del materiale.

---

## 4. Shader e Materiali Avanzati

### Arco Neon (`NeonArch.tsx`)
Utilizza un `ShaderMaterial` custom per un gradiente a tre colori (Cyan → Violet → Pink) che segue la curva del torus.
- **Core Glow**: Il fragment shader calcola la distanza dal centro del tubo per rendere il "cuore" del neon bianco/brillante rispetto ai bordi.
- **Haze**: Un piano posteriore con `AdditiveBlending` simula l'umidità dell'aria colpita dalla luce.

### Pavimento Riflettente (`FloorGlow.tsx`)
Combina due tecniche:
1. **`MeshReflectorMaterial`**: Riflessioni dinamiche sfumate (`blur={400}`).
2. **Layer Additivo**: Un piano sovrapposto con colore `#12003a` e blending additivo per aumentare la saturazione del blu/viola senza schiarire troppo i neri.

---

## 5. Asset 3D e Ottimizzazione
- **Modello Hero**: `poltrona-3d.glb` caricato via `useGLTF`.
- **Occupazione a Terra**: Un `circleGeometry` nero sotto la poltrona (`position.y=0.04`) agisce come "contact shadow" finta per dare peso all'oggetto.
- **Performance**:
  - Particelle limitate a 28 per evitare rumore visivo.
  - Nebbia (`fog`) impostata con range stretto (4-14) per nascondere il clipping e aumentare il mistero.

---

## 6. Layout e UI
I testi seguono il design system **Lyra**:
- **Font titoli**: *Orbitron* (estetica futuristica).
- **Font corpo**: *Manrope* (leggibilità).
- **Pannelli**: Glassmorphism con `backdrop-filter: blur(12px)` e bordi cyan semi-trasparenti.

---

> [!TIP]
> Per modificare l'atmosfera cromatica, agisci principalmente sulle `pointLight` della scena in `XRReset.tsx`. Il bilanciamento tra Magenta e Cyan è ciò che definisce il contrasto Cyberpunk.
