import React, { useContext, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { ThemeContext } from 'styled-components'

interface PlaneProps {
  args?: [
    width?: number | undefined,
    height?: number | undefined,
    widthSegments?: number | undefined,
    heightSegments?: number | undefined
  ]
  color?: string
  position?: number[]
  rotation?: number[]
}

interface CubeProps {
  position?: number[]
  color?: string
  castShadow?: boolean
}
interface Props {
  children: React.ReactNode
}

const Plane = ({ args, color, position, rotation }: PlaneProps) => {
  const [ref] = usePlane(() => ({
    rotation: rotation || [-Math.PI / 2, 0, 0],
    position: position || [0, 0, 0],
  }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={args || [10, 10]} />
      <shadowMaterial attach="material" color={color || 'transparent'} />
    </mesh>
  )
}

const Cube = ({ color, position }: CubeProps) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: position || [0, 5, 0],
    rotation: [Math.random(), Math.random(), Math.random()],
  }))

  useEffect(() => {
    api.applyImpulse([15, 0, 0], [0, 0, 0])
  }, [])

  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color={color || 'red'} />
    </mesh>
  )
}

const DiceScene = (props: Props) => {
  const theme = useContext(ThemeContext)
  console.log(theme, 'diceScene')
  return (
    <Canvas shadows camera={{ position: [0, 20, 0], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight angle={0.3} position={[0, 50, 0]} intensity={2} castShadow />
      <Physics gravity={[0, -30, 0]}>
        <Plane />
        {/* <Plane position={[-6, 0, 0]} rotation={[0, 1.5, 0]} color="red" /> */}
        {/* <Plane
          args={[window.innerHeight, 100]}
          // color="blue"
          position={[5, 0, 0]}
          rotation={[0, -Math.PI / 2, 1]}
        />
        <Plane
          args={[window.innerWidth, 100]}
          position={[0, 0, 5]}
          rotation={[1, -Math.PI, 0]}
          // color="yellow"
        />
        <Plane
          args={[window.innerWidth, 100]}
          position={[0, 0, -5]}
          rotation={[-1, 0, 0]}
          // color="green"
        /> */}

        {/* <Plane
          args={[window.innerHeight, 1]}
          color="red"
          position={[-5, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        /> */}
        <Cube position={[-10, 5, 0]} />
        <Cube position={[-10, 5, 1]} />
        <Cube position={[-10, 5, 2]} />
        <Cube position={[-10, 5, -1]} />
        <Cube position={[-10, 5, -2]} />
        <Cube position={[-10, 5, -3]} />
      </Physics>
    </Canvas>
  )
}

export default DiceScene
