// theme.ts — Lyra Palette
// The Spatial Wave · xr-reset-kit-starter

export const LYRA = {
  void:     '#080C12',
  deep:     '#0F1C2E',
  cyan:     '#00E5FF',
  magenta:  '#FF2FD6',
  teal:     '#2EF2C9',
  violet:   '#7A6CFF',
  silver:   '#C8CCD6',
  fog:      'rgba(183, 192, 204, 0.4)',
  gradMain: 'linear-gradient(135deg, #00E5FF, #FF2FD6)',
} as const

export const FONTS = {
  title: "'Orbitron', 'Arial Black', Arial, sans-serif",
  body:  "'Manrope', Arial, sans-serif",
} as const

export const GLASS = {
  background:    'rgba(11, 15, 20, 0.75)',
  border:        '1px solid rgba(0, 229, 255, 0.2)',
  borderRadius:  '12px',
  backdropFilter:'blur(12px)',
} as const
