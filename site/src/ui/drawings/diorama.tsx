'use client'
import * as React from 'react'
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { styleSheet } from '../util'
import { mix, useScroll, useTime, useTransform } from 'framer-motion';
import { BufferAttribute, Spherical } from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const Landscape = () => {
    return <mesh rotation-x={0.35}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={"green"} wireframe />
    </mesh>
}

type SceneProps = {
    numStars?: number,
    container: React.RefObject<HTMLDivElement>
}
const Scene = ({ numStars = 100, container }: SceneProps) => {
    const { gl, viewport } = useThree(({ gl, viewport }) => ({ gl, viewport }))
    const time = useTime()

    useFrame(({ camera }) => {
        const prev = new Spherical().setFromCartesianCoords(camera.position.x, camera.position.y, camera.position.z)
        camera.position.setFromSphericalCoords(prev.radius, prev.phi, prev.theta + .005)
    })

    React.useLayoutEffect(() => {
        gl.setClearColor('#00bbff')
        gl.setPixelRatio(.3)
    })

    return <>
        <Landscape />
        <PerspectiveCamera makeDefault={true} position={[3, 0, 0]} />
        <OrbitControls target={[0, 0, 0]} enablePan={false} enableRotate={true} enabled minDistance={2} maxDistance={10} />
    </>
}

export const Diorama = () => {
    const scrollContainer = React.useRef<HTMLDivElement>(null)
    return <div style={styles.container} ref={scrollContainer}>
        <div style={styles.canvas}>
            <Canvas gl={{ antialias: false }} style={{ width: 'var(--content-width)', height: 'var(--content-width)' }}>
                <Scene container={scrollContainer} />
            </Canvas>
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
}


const styles = styleSheet({
    canvas: {
        position: 'sticky',
        inset: 0
    },
    container: {
        position: 'relative',
        height: 'var(--content-width)',
        width: 'var(--content-width)',
        overflowY: 'scroll',
        borderRadius: '4px',
    }
})