# Progress Log - 2026-03-17

## Task: Evoluzione V2 (Dynamic Portal)
**Stato**: Completato (Build OK)

### Accomplishments:
- [x] Cleanup Global: Rimosso ogni riferimento a "Jack Robert" e varianti.
- [x] Branding: Metodo ora referenziato semplicemente come "BLAST".
- [x] Dynamic Portal: Implementato stato `videoUrl` in `App.tsx` con supporto per link esterni.
- [x] UI/UX: Aggiunto campo di input `SplashScreen` con design neon/glassmorphism.
- [x] UI/UX: Implementato Pannello Dinamico interno con doppia opzione (Link o File Locale).
- [x] Logic: Gestione Blob URL per l'anteprima istantanea di file video locali.
- [x] CORS: Abilitato `crossOrigin="anonymous"` nel `VideoPanel` per supportare video da URL esterni.
- [x] Build: Validazione `npm run build` eseguita con successo.

### Tech Notes:
- L'input URL accetta file `.mp4` diretti; se vuoto, carica `video-welcome.mp4`.
- Aggiunta protezione `decodeURI` e gestione `crossOrigin` per evitare errori di sicurezza Three.js.
- Pannello dinamico posizionato sopra i controlli principali per discrezione.

### Next Steps:
- [ ] Test di caricamento da link esterno (CORS) in ambiente live.
- [ ] Push su GitHub branch `main`.

---

# Progress Log - 2026-03-16

## Task: Sincronizzazione Repository Architetturale
**Stato**: Completato

### Accomplishments:
- [x] Sincronizzazione cartelle `01`, `02`, `03`, `04`, `05` dalla root al repo `06_REPO/xr-reset-kit-starter`.
- [x] Build di produzione verificata post-sincronizzazione.
- [x] Commit e Push su branch `main`.
- [x] Fix Mobile: la camera ora rileva l'orientamento portrait e si allontana per evitare tagli sui lati.
- [x] Build di produzione verificata (40s) e deploy su Vercel aggiornato.

## Task: Riproduzione Effetto Neon Cyberpunk
**Stato**: Completato (Build OK)

### Accomplishments:
- [x] Creazione componente `Effects.tsx` (Bloom).
- [x] Shader Gradient avanzato in `NeonArch.tsx` (Cyan-Violet-Pink + Core Glow).
- [x] Integrazione definitiva `poltrona-3d.glb` con posizionamento e scala hero (1.28).
