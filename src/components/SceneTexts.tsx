import { Text } from '@react-three/drei'

const ORBITRON_BOLD = 'https://cdn.jsdelivr.net/npm/@fontsource/orbitron/files/orbitron-latin-700-normal.woff'
const ORBITRON_REGULAR = 'https://cdn.jsdelivr.net/npm/@fontsource/orbitron/files/orbitron-latin-400-normal.woff'

export function SceneTexts() {
  return (
    <>
      {/* XR RESET */}
      <Text
        font={ORBITRON_BOLD}
        position={[0, 1.6, -0.45]}
        fontSize={0.38}
        letterSpacing={0.02}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color="#ffffff"
        outlineWidth={0.01}
        outlineColor="#ffffff"
      >
        XR RESET
      </Text>

      {/* Subtitle */}
      <Text
        font={ORBITRON_REGULAR}
        position={[0, 1.28, -0.45]}
        fontSize={0.17}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color="#9feaff"
      >
        Build your first XR space
      </Text>

      {/* Branding */}
      <Text
        font={ORBITRON_REGULAR}
        position={[0, -1.05, -0.35]}
        fontSize={0.12}
        letterSpacing={0.08}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color="#ffffff"
      >
        THE SPATIAL WAVE
      </Text>
    </>
  )
}
