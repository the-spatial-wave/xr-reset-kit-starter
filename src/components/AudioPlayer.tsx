// AudioPlayer.tsx
// Audio ambient per la scena — si avvia dopo il click su "Enter Experience"

import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface AudioPlayerProps {
  url: string
  volume?: number
  loop?: boolean
  paused?: boolean
}

export function AudioPlayer({ url, volume = 0.45, loop = true, paused = false }: AudioPlayerProps) {
  const { camera } = useThree()
  const listenerRef = useRef<THREE.AudioListener | null>(null)
  const soundRef = useRef<THREE.Audio | null>(null)

  useEffect(() => {
    const listener = new THREE.AudioListener()
    camera.add(listener)
    listenerRef.current = listener

    const sound = new THREE.Audio(listener)
    const loader = new THREE.AudioLoader()

    loader.load(url, (buffer) => {
      sound.setBuffer(buffer)
      sound.setLoop(loop)
      sound.setVolume(volume)
      if (!paused) sound.play()
    })

    soundRef.current = sound

    return () => {
      if (soundRef.current?.isPlaying) soundRef.current.stop()
      soundRef.current?.disconnect()
      camera.remove(listener)
    }
  }, [url])

  // Stop / resume in base alla prop paused
  useEffect(() => {
    const sound = soundRef.current
    if (!sound) return
    if (paused) {
      if (sound.isPlaying) sound.stop()
    } else {
      // Riprende solo se il buffer è già caricato
      if (!sound.isPlaying && sound.buffer) sound.play()
    }
  }, [paused])

  return null
}
