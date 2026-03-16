import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'

export function Effects() {
  return (
    <EffectComposer>
      <Bloom 
        intensity={0.55}
        luminanceThreshold={0.5} 
        mipmapBlur 
      />
      <Noise opacity={0.015} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  )
}
