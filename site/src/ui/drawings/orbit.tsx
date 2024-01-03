'use client'
import * as React from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { styleSheet } from '../util'
import { mix, useScroll, useTime, useTransform } from 'framer-motion'

const meshColor = '#222'

const Icosahedron = () => {
  return (
    <mesh rotation-x={0.35}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={meshColor} wireframe={true} />
    </mesh>
  )
}

const Star = ({ p }: { p: number }) => {
  const ref = React.useRef<THREE.Mesh>(null)

  React.useLayoutEffect(() => {
    const distance = mix(2, 3.5, Math.random())
    const yAngle = mix(Math.PI / 2 - 0.3, Math.PI / 2 + 0.3, Math.random())
    const xAngle = 2 * Math.PI * p
    ref.current!.position.setFromSphericalCoords(distance, yAngle, xAngle)
  })

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.05, 0.05, 0.05]} />
      <meshBasicMaterial color={meshColor} wireframe />
    </mesh>
  )
}

type SceneProps = {
  numStars?: number
  container: React.RefObject<HTMLDivElement>
}
const Scene = ({ numStars = 100, container }: SceneProps) => {
  const gl = useThree(({ gl }) => gl)
  const { scrollYProgress } = useScroll({ container })
  const yAngle = useTransform(scrollYProgress, [0, 1], [0.001, Math.PI])
  const distance = useTransform(scrollYProgress, [0, 1], [7, 2])
  const time = useTime()

  useFrame(({ camera }) => {
    camera.position.setFromSphericalCoords(
      distance.get(),
      yAngle.get(),
      time.get() * 0.0005,
    )
    camera.updateProjectionMatrix()
    camera.lookAt(0, 0, 0)
  })

  React.useLayoutEffect(() => {
    gl.setClearColor('#ffbb00')
    gl.setPixelRatio(0.3)
  })

  const stars = []
  for (let i = 0; i < numStars; i++) {
    stars.push(<Star key={i} p={i / numStars} />)
  }

  return (
    <>
      <Icosahedron />
      {stars}
    </>
  )
}

export const Orbit = () => {
  const scrollContainer = React.useRef<HTMLDivElement>(null)
  return (
    <div style={styles.container} ref={scrollContainer}>
      <div style={styles.inner}>
        <div style={styles.canvas}>
          <Canvas
            gl={{ antialias: false }}
            style={{
              width: 'var(--content-width)',
              height: 'var(--content-width)',
            }}
          >
            <Scene container={scrollContainer} />
          </Canvas>
        </div>
      </div>
      <style jsx global>{`
        canvas {
          image-rendering: -moz-crisp-edges;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: pixelated;
          image-rendering: optimize-contrast;
        }
      `}</style>
    </div>
  )
}

const styles = styleSheet({
  canvas: {
    position: 'sticky',
    inset: 0,
  },
  container: {
    position: 'relative',
    height: 'var(--content-width)',
    width: 'var(--content-width)',
    overflowY: 'scroll',
    borderRadius: '4px',
  },
  inner: {
    height: '500%',
  },
})
