// CameraRig.tsx
// Gestisce la transizione camera tra chair view e portal view con supporto mobile

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const CHAIR_POS_DESKTOP = new THREE.Vector3(0, 1.5, 4)
const CHAIR_POS_MOBILE  = new THREE.Vector3(0, 1.8, 6.2) // Più lontano e alto su mobile
const CHAIR_TARGET      = new THREE.Vector3(0, 1.0, 0)

const PORTAL_POS_DESKTOP = new THREE.Vector3(0, 1.5, -5)
const PORTAL_POS_MOBILE  = new THREE.Vector3(0, 1.8, -7.5) // Più lontano su mobile
const PORTAL_TARGET      = new THREE.Vector3(0, 1.15, -1.18)

const LERP_SPEED = 0.045
const ARRIVAL    = 0.06

interface CameraRigProps {
  mode: 'DEFAULT' | 'VIDEO'
}

export function CameraRig({ mode }: CameraRigProps) {
  const { camera, size } = useThree()
  const active      = useRef(true) // Inizia subito attivo per allinearsi al dispositivo
  const prevMode    = useRef(mode)
  const currentLook = useRef(new THREE.Vector3(0, 1.0, 0))

  useFrame(() => {
    const isPortrait = size.height > size.width
    const isVideo    = mode === 'VIDEO'
    
    // Avvia transizione al cambio di modalità
    if (mode !== prevMode.current) {
      prevMode.current = mode
      active.current = true
    }

    if (!active.current) return

    // Calcolo target basato su orientamento
    let targetPos: THREE.Vector3
    if (isVideo) {
      targetPos = isPortrait ? PORTAL_POS_MOBILE : PORTAL_POS_DESKTOP
    } else {
      targetPos = isPortrait ? CHAIR_POS_MOBILE : CHAIR_POS_DESKTOP
    }

    const targetLook = isVideo ? PORTAL_TARGET : CHAIR_TARGET

    camera.position.lerp(targetPos, LERP_SPEED)
    currentLook.current.lerp(targetLook, LERP_SPEED)
    camera.lookAt(currentLook.current)

    // Arrivati a destinazione (o quasi, per non stoppare il lerp bruscamente)
    if (camera.position.distanceTo(targetPos) < ARRIVAL) {
      camera.position.copy(targetPos)
      camera.lookAt(targetLook)
      currentLook.current.copy(targetLook)
      active.current = false
    }
  })

  return null
}
