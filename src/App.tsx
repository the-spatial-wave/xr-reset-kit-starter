import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { XRReset } from './scenes/XRReset'

export default function App() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#080C12',
      }}
    >
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        shadows={false}
      >
        <color attach="background" args={['#080C12']} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.4}
        />

        <XRReset />
      </Canvas>
    </div>
  )
}
