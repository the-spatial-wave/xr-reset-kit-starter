import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { XRReset } from './scenes/XRReset'
import { SplashScreen } from './components/SplashScreen'

export default function App() {
  const [entered, setEntered] = useState(false)

  return (
    <>
      {/* Font Orbitron da Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');`}</style>

      {!entered && <SplashScreen onEnter={() => setEntered(true)} />}

      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          background: '#04000d',
        }}
      >
        <Canvas
          camera={{ position: [0, 1.5, 4], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          shadows={false}
        >
          <OrbitControls
            target={[0, 1, 0]}
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
    </>
  )
}
