import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color } from 'three'

function Ring({ index }) {
  const meshRef = useRef()

  useFrame(function (state) {
    if (!meshRef.current) return

    const z = (index - 7) * 3.5
    meshRef.current.position.set(0, 0, -z)

    const dist = Math.abs(z)
    meshRef.current.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04)

    let colorScale = 1
    if (dist > 2) {
      colorScale = 1 - (Math.min(dist, 12) - 2) / 10
    }
    colorScale *= 0.5

    if (index % 2 === 1) {
      meshRef.current.material.emissive = new Color(
        6,
        0.15,
        0.7
      ).multiplyScalar(colorScale)
    } else {
      meshRef.current.material.emissive = new Color(0.1, 0.7, 3).multiplyScalar(
        colorScale
      )
    }
  })

  return (
    <mesh castShadow receiveShadow position={[0, 0, 0]} ref={meshRef}>
      <torusGeometry args={[3.35, 0.05, 16, 100]} />
      <meshStandardMaterial emissive={[0.5, 0.5, 0.5]} color={[0, 0, 0]} />
    </mesh>
  )
}

export default function Rings() {
  return (
    <>
      {new Array(14).fill(0).map(function (item, index) {
        return <Ring key={index} index={index} />
      })}
    </>
  )
}
