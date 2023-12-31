'use client'
import * as React from 'react'
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { styleSheet } from '../util'
import { BoxGeometry, Spherical } from 'three';
import { OrbitControls, PerspectiveCamera, Sky, Stars, Stats } from '@react-three/drei';
import { mix } from 'framer-motion';
import { ImprovedNoise } from 'three/examples/jsm/Addons.js';

const noise = new ImprovedNoise().noise

const pickRandom = <T extends unknown>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

const grassColors = [
    '#136d15',
    '#117c13',
    '#138510',
    '#268b07',
    '#41980a'
]

type SegmentProps = {
    p?: number,
    size: number,
    posX: number,
    posY: number,
    posZ: number,
    height: number,
    color: string,
}
const BoxSegment = ({ p, size = .1, posX, posY, posZ, height, color }: SegmentProps) => {
    return <group>
        <mesh position={[posX, posY + height / 2, posZ]}>
            <boxGeometry args={[size, height, size]} />
            <meshBasicMaterial color={color} />
        </mesh>
    </group>
}

const Landscape = () => {
    const minX = -1, maxX = 1, minZ = -1, maxZ = 1, minY = -1, maxY = 1

    const baseSize = .2
    const boxes = []

    const genHeight = (ix: number, iz: number) => {
        const spatialScale = 3
        const x = ix / (maxX - minX) * spatialScale, z = iz / (maxZ - minZ) * spatialScale
        const h = noise(x, 0, z) / 4 + 1
        return h
    }

    let p = 0
    for (let ix = minX; ix <= maxX; ix += baseSize) {
        for (let iz = minZ; iz <= maxZ; iz += baseSize) {
            boxes.push(<BoxSegment key={p} size={baseSize} posX={ix} posY={minY} posZ={iz} height={genHeight(ix, iz)} color={pickRandom(grassColors)} />)
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
    const gl = useThree(({ gl }) => gl)

    useFrame(({ camera }) => {
        const prev = new Spherical().setFromCartesianCoords(camera.position.x, camera.position.y, camera.position.z)
        camera.position.setFromSphericalCoords(prev.radius, prev.phi, prev.theta + .003)
    })

    React.useLayoutEffect(() => {
        gl.setClearColor('#00bbff')
        gl.setPixelRatio(.5)
    })

    return <>
        <Landscape />
        <PerspectiveCamera makeDefault={true} position={[5, 0, 0]} />
        <OrbitControls target={[0, 0, 0]} enablePan={false} enableRotate={true} enabled minDistance={3} maxDistance={12} />
        <Sky sunPosition={[0, 0, 2]} rayleigh={7} turbidity={100} />
        <Stars radius={900} factor={15} count={500} />
    </>
}

export const Diorama = () => {
    const scrollContainer = React.useRef<HTMLDivElement>(null)
    return <div style={styles.container} ref={scrollContainer}>
        <div style={styles.canvas}>
            <Canvas gl={{ antialias: false }} style={{ width: 'var(--content-width)', height: 'var(--content-width)' }}>
                <Scene container={scrollContainer} />
                <Stats parent={scrollContainer} />
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