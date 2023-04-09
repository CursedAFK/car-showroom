import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { Vector3 } from 'three'

const Box = ({ color }) => {
  const [scale, setScale] = useState(
    () => Math.pow(Math.random(), 2.0) * 0.5 + 0.05
  )
  const [xRotSpeed, setXRotSpeed] = useState(() => Math.random())
  const [yRotSpeed, setYRotSpeed] = useState(() => Math.random())
  const [position, setPosition] = useState(() => {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    )
    if (v.x < 0) v.x -= 1.75
    if (v.x > 0) v.x += 1.75

    return v
  })

  const boxRef = useRef(null)
  const timeRef = useRef(0)

  const resetPosition = () => {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      Math.random() * 10 + 10
    )
    if (v.x < 0) v.x -= 1.75
    if (v.x > 0) v.x += 1.75

    setPosition(v)
  }

  useFrame(
    (state, delta) => {
      timeRef.current += delta * 1.2
      let newZ = position.z - timeRef.current

      if (newZ < -10) {
        resetPosition()
        timeRef.current = 0
      }

      boxRef.current.position.set(position.x, position.y, position.z)
      boxRef.current.rotation.x += delta * xRotSpeed
      boxRef.current.rotation.y += delta * yRotSpeed
    },
    [xRotSpeed, yRotSpeed, position]
  )

  return (
    <mesh ref={boxRef} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  )
}

const Boxes = () => {
  return (
    <>
      {new Array(100).fill(0).map((item, index) => (
        <Box
          key={index}
          color={index % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </>
  )
}

export default Boxes
