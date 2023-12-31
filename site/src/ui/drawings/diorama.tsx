'use client'
import * as React from 'react'
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { styleSheet } from '../util'
import { mix, useScroll, useTime, useTransform } from 'framer-motion';
import { BoxGeometry, BufferAttribute, Euler, Spherical } from 'three';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

type SegmentProps = {
    p?: number,
    size: number,
    posX: number,
    posY: number,
    posZ: number,
    height: number,
}
const BoxSegment = ({ p, size = .1, posX, posY, posZ, height }: SegmentProps) => {
    const geometryRef = React.useRef<BoxGeometry>(null)
    return <mesh position={[posX, posY + height / 2, posZ]}>
        <boxGeometry args={[size, height, size]} ref={geometryRef} />
        <meshBasicMaterial color={"green"} />
        <lineSegments>
            <edgesGeometry attach="geometry" args={[geometryRef.current]} />
            <lineBasicMaterial color={"black"} />
        </lineSegments>
    </mesh>
}

const Landscape = () => {
    const minX = -1, maxX = 1, minZ = -1, maxZ = 1, minY = -1, maxY = 1

    const baseSize = .1
    const boxes = []
    let p = 0
    for (let ix = minX; ix < maxX; ix += baseSize) {
        for (let iz = minZ; iz < maxZ; iz += baseSize) {
            boxes.push(<BoxSegment size={baseSize} posX={ix} posY={minY} posZ={iz} height={1 + Math.abs(ix) + Math.abs(iz)} />)
            p++
        }
    }

    return <>
        {boxes}
    </>
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
        camera.position.setFromSphericalCoords(prev.radius, prev.phi, prev.theta + .003)
    })

    React.useLayoutEffect(() => {
        gl.setClearColor('#00bbff')
        gl.setPixelRatio(.3)
    })

    return <>
        <Landscape />
        <PerspectiveCamera makeDefault={true} position={[5, 0, 0]} />
        <OrbitControls target={[0, 0, 0]} enablePan={false} enableRotate={true} enabled minDistance={3} maxDistance={12} />
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