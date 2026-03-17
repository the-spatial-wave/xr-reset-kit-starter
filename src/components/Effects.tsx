import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'

interface EffectsProps {
  mobile?: boolean
}

export function Effects({ mobile }: EffectsProps) {
  return (
    <EffectComposer>
      <Bloom
        intensity={mobile ? 0.35 : 0.55}
        luminanceThreshold={mobile ? 0.6 : 0.5}
        mipmapBlur={!mobile}
      />
      <Noise opacity={0.015} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  )
}
