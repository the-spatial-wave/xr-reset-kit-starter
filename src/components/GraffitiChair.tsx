import { useGLTF } from '@react-three/drei'

export function GraffitiChair() {
  // Il file è servito dalla cartella public/models/
  const { scene } = useGLTF('/models/poltrona-3d.glb')
  
  return (
    <primitive 
      object={scene} 
      position={[0, 0, 0]} 
      scale={1} 
    />
  )
}

useGLTF.preload('/models/poltrona-3d.glb')
