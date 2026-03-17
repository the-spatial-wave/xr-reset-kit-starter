// CameraRig.tsx
// Gestisce la transizione camera tra chair view e portal view
// Basato sul setup xr-my-scenes - The Spatial Wave

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CHAIR_POS    = new THREE.Vector3(0, 1.5,  4)
const CHAIR_TARGET = new THREE.Vector3(0, 1.0,  0)
const PORTAL_POS   = new THREE.Vector3(0, 1.5, -5)
const PORTAL_TARGET = new THREE.Vector3(0, 0.97, -1.18)

const LERP_SPEED = 0.04
const ARRIVAL    = 0.06

interface CameraRigProps {
  mode: 'DEFAULT' | 'VIDEO'
}

export function CameraRig({ mode }: CameraRigProps) {
  const { camera } = useThree()
  const active      = useRef(false)
  const prevMode    = useRef(mode)
  const currentLook = useRef(new THREE.Vector3(0, 1.0, 0))

  useFrame(() => {
    const isVideo = mode === 'VIDEO'
    
    // Avvia transizione al cambio di modalità
    if (mode !== prevMode.current) {
      prevMode.current = mode
      active.current = true
    }

    if (!active.current) return

    const targetPos  = isVideo ? PORTAL_POS  : CHAIR_POS
    const targetLook = isVideo ? PORTAL_TARGET : CHAIR_TARGET

    camera.position.lerp(targetPos, LERP_SPEED)
    currentLook.current.lerp(targetLook, LERP_SPEED)
    camera.lookAt(currentLook.current)

    // Arrivati a destinazione
    if (camera.position.distanceTo(targetPos) < ARRIVAL) {
      camera.position.copy(targetPos)
      camera.lookAt(targetLook)
      currentLook.current.copy(targetLook)
      active.current = false
    }
  })

  return null
}
