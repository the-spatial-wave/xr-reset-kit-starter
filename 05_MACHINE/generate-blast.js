#!/usr/bin/env node
// ============================================================================
// TSW XR SCENE MACHINE — BLAST Generator
// The Spatial Wave · xr-immersive-web-v1
// Metodo: Jack Robert BLAST
//
// USAGE:
//   node generate-blast.js --name "SceneName" --desc "brief description"
//                          --objects "chair,ring,particles"
//                          --lights "magenta,cyan" --texts "TITOLO,Sottotitolo"
//
// EXAMPLE:
//   node generate-blast.js \
//     --name "SceneGallery" \
//     --desc "Galleria artistica XR con opere fluttuanti e avatar Lyra come guida" \
//     --objects "floating-frames,lyra-avatar,particles,floor-glow" \
//     --lights "cyan,teal" \
//     --texts "XR GALLERY,Explore the collection"
//
// OUTPUT:
//   Stampa il BLAST completo nel terminale — copialo in Antigravity
//   Opzionale: --output blast-scenename.md  salva su file
// ============================================================================

const args = process.argv.slice(2);

function getArg(flag) {
  var i = args.indexOf(flag);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
}

var sceneName  = getArg('--name')    || 'SceneNew';
var desc       = getArg('--desc')    || 'Nuova scena XR per The Spatial Wave';
var objects    = getArg('--objects') || 'floor,particles,overlay';
var lights     = getArg('--lights')  || 'cyan,magenta';
var texts      = getArg('--texts')   || 'XR SCENE,subtitle text';
var outputFile = getArg('--output')  || null;

// ─── Derive component name ──────────────────────────────────────────────────
var componentName = 'Scene' + sceneName.replace(/[^a-zA-Z0-9]/g, '');
var fileName      = componentName + '.tsx';

// ─── Parse arrays ────────────────────────────────────────────────────────────
var objectList = objects.split(',').map(function(s) { return s.trim(); });
var lightList  = lights.split(',').map(function(s) { return s.trim(); });
var textList   = texts.split(',').map(function(s) { return s.trim(); });

var mainTitle    = textList[0] || 'XR SCENE';
var subTitle     = textList[1] || 'subtitle';
var brandLabel   = textList[2] || 'THE SPATIAL WAVE';

// ─── Light presets ────────────────────────────────────────────────────────────
var lightPresets = {
  cyan:    '<pointLight position={[4, 3, -0.5]}   color="#00E5FF" intensity={4} distance={9} decay={2} />',
  magenta: '<pointLight position={[-4, 3, -0.5]}  color="#FF2FD6" intensity={4} distance={9} decay={2} />',
  violet:  '<pointLight position={[0, 0.3, 1]}    color="#7A6CFF" intensity={1.2} distance={4} decay={2} />',
  teal:    '<pointLight position={[2, 4, 2]}      color="#2EF2C9" intensity={2} distance={7} decay={2} />',
  warm:    '<pointLight position={[0, 5, 3]}      color="#FFB060" intensity={1.5} distance={8} decay={2} />',
  white:   '<directionalLight position={[5, 8, 5]} intensity={0.6} />'
};

var lightsCode = [
  '<ambientLight intensity={0.06} />',
  '<directionalLight position={[2, 8, 4]} intensity={0.25} color="#9090ff" />'
];
lightList.forEach(function(l) {
  if (lightPresets[l]) lightsCode.push(lightPresets[l]);
});

// ─── Object descriptions ─────────────────────────────────────────────────────
var objectDescriptions = {
  'particles':      '~220 punti argento sparsi  | Particles (useRef<THREE.Points>, useFrame rotation.y)',
  'floor-glow':     'Piani emissivi pavimento   | FloorGlow (plane cyan dx, magenta sx, circle violet)',
  'neon-arch':      'Arco neon circolare        | NeonArch (torus bianco emissivo + glow, pos [0,2.8,-1.2])',
  'chair':          'Poltrona placeholder       | ChairPlaceholder (box geometries) -> GraffitiChair GLTF',
  'lyra-avatar':    'Avatar Lyra                | useGLTF("/models/lyra.glb") + useAnimations',
  'floating-frames':'Frame fluttuanti           | mesh plane + texture + useFrame oscillazione',
  'floor':          'Pavimento dark             | planeGeometry [28,28] color #080C12',
  'overlay':        'HTML text overlay          | SceneTexts (Html drei, solo desktop)',
  'fog':            'Nebbia atmosferica         | fog attach="fog" #0a0818 near=10 far=22',
  'cta-panel':      'Pannello CTA glassmorphism | Html drei, glassmorphism dark, CTA gradient button'
};

// ─── Generate BLAST ────────────────────────────────────────────────────────────
var now = new Date();
var dateStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');

var divider = '━'.repeat(70);
var header  = '╔' + '═'.repeat(70) + '╗';
var footer  = '╚' + '═'.repeat(70) + '╝';

var blast = [
  '',
  header,
  '║  BLAST — ' + componentName.toUpperCase() + ' '.repeat(Math.max(0, 59 - componentName.length)) + '║',
  '║  The Spatial Wave · xr-immersive-web-v1 · Jack Robert BLAST' + ' '.repeat(9) + '║',
  '║  Generato il: ' + dateStr + ' '.repeat(53) + '║',
  footer,
  '',
  divider,
  'B — BACKGROUND',
  divider,
  desc,
  '',
  'Progetto: xr-immersive-web-v1 · The Spatial Wave',
  'Stack:    React 18 + TypeScript + Vite + Three.js r128 + R3F + drei',
  'Deploy:   Vercel via GitHub push',
  '',
  'Componente: ' + componentName,
  'File:       src/scenes/' + fileName,
  '',
  divider,
  'L — LAYOUT',
  divider,
  '[ ELEMENTI 3D ]'
].concat(
  objectList.map(function(obj) {
    var d = objectDescriptions[obj] || (obj + ' (elemento personalizzato)');
    return '  ' + obj.padEnd(22) + '| ' + d;
  })
).concat([
  '',
  '[ LUCI ]'
]).concat(
  lightsCode.map(function(l) { return '  ' + l; })
).concat([
  '',
  '[ HTML OVERLAY — solo desktop >= 768px ]',
  '  TOP:    "' + mainTitle + '" — Orbitron bold bianco, textShadow viola',
  '  SUB:    "' + subTitle + '" — Manrope 17px #00E5FF',
  '  BOTTOM: "' + brandLabel + '" — Orbitron 11px #C8CCD6 ls:6px',
  '',
  '[ PALETTE ]',
  '  --void:    #080C12   sfondo',
  '  --cyan:    #00E5FF   accent / luce dx',
  '  --magenta: #FF2FD6   luce sx / CTA',
  '  --violet:  #7A6CFF   fill ombre',
  '  --silver:  #C8CCD6   testo secondario',
  '',
  divider,
  'A — ACTIONS',
  divider,
  'STEP 1 — Leggi il progetto (obbligatorio)',
  '  cat src/store/useAppStore.ts',
  '  cat App.tsx',
  '  ls src/scenes/',
  '  ls public/models/',
  '',
  'STEP 2 — Crea src/scenes/' + fileName,
  '  a) Componenti per ogni elemento in L',
  '  b) export function ' + componentName,
  '     con fog + luci + tutti i componenti',
  '',
  'STEP 3 — Aggiorna App.tsx',
  '  SOLO se manca import/rotta per ' + componentName,
  '',
  'STEP 4 — npm run build',
  'STEP 5 — Output: "' + componentName + ' — build OK"',
  '',
  divider,
  'S — SAFEGUARDS',
  divider,
  'LIGHT:    ambientLight intensity MAX 0.06',
  'FILES:    NON toccare scene esistenti ne App.tsx (salvo rotta)',
  'CODE:     CylinderGeometry heightSegments=1 | Html occlude=false zIndexRange=[1,10]',
  'MOBILE:   Html NON renderizzare se width < 768',
  'NAV:      leggere useAppStore.ts — NON inventare metodi',
  'GLTF:     se modello assente usa placeholder + lascia blocco useGLTF commentato',
  'COMMENTS: solo ASCII, zero emoji nel codice',
  '',
  divider,
  'T — TESTS',
  divider,
  'BUILD:',
  '  [ ] npm run build -> exit code 0',
  '  [ ] dist/index.html > 50.000 bytes',
  '  [ ] 0 TypeScript errors',
  '',
  'VISUAL (npm run dev -> localhost:5173):',
  '  [ ] Sfondo dark visibile con fog',
  '  [ ] Elementi 3D visibili: ' + objectList.join(', '),
  '  [ ] Luci colorate: ' + lightList.join(', '),
  '  [ ] Testo "' + mainTitle + '" in overlay in alto',
  '  [ ] "' + brandLabel + '" in basso',
  '',
  'ISOLAMENTO:',
  '  [ ] Scene esistenti non modificate',
  '  [ ] App.tsx: solo import+rotta ' + componentName,
  '  [ ] Nessun file eliminato o rinominato',
  ''
]);

var output = blast.join('\n');

// ─── Output ──────────────────────────────────────────────────────────────────
console.log(output);

if (outputFile) {
  var fs = require('fs');
  fs.writeFileSync(outputFile, output);
  console.log('\n> Salvato in: ' + outputFile);
}
