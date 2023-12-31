'use client'
import * as React from 'react'
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { styleSheet } from '../util'
import { Spherical, Vector3 } from 'three';
import { OrbitControls, PerspectiveCamera, Sky, Stars, Stats, useGLTF } from '@react-three/drei';
import { ImprovedNoise } from 'three/examples/jsm/Addons.js';
import { dims } from './dimensions'

const models = {
    limeTree: '/models/limetree.gltf',
    lampPost: '/models/lamppost.gltf'
}
Object.values(models).forEach((url) => useGLTF.preload(url))

export const dim = dims.diorama

const noiseSeed = Math.random()
const _noise = new ImprovedNoise().noise
const noise = (x: number, y: number, z: number) => _noise(x + noiseSeed, y + noiseSeed, z + noiseSeed)

const pickRandom = <T extends unknown>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
const grassColors = [
    '#136d15',
    '#117c13',
    '#138510',
    '#268b07',
    '#41980a'
]

function Model({ url, ...props }: { url: string, [key: string]: any }) {
    const { scene } = useGLTF(url)
    return <primitive object={scene} {...props} />
}

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
            <meshToonMaterial color={color} />
        </mesh>
    </group>
}

const Landscape = () => {
    const minX = -1, maxX = 1, minZ = -1, maxZ = 1, minY = -1, maxY = 1

    const baseSize = .2
    const boxes = []

    const genHeight = (ix: number, iz: number) => {
        const spatialScale = 1
        const x = ix / (maxX - minX) * spatialScale, z = iz / (maxZ - minZ) * spatialScale
        const h = noise(x, 0, z) / 4 + 1
        return h
    }

    const maxHeightPosition = new Vector3(0, 0, 0)
    const positions = []

    let p = 0
    for (let ix = minX; ix <= maxX; ix += baseSize) {
        for (let iz = minZ; iz <= maxZ; iz += baseSize) {
            const height = genHeight(ix, iz)
            boxes.push(<BoxSegment key={p} size={baseSize} posX={ix} posY={minY} posZ={iz} height={height} color={pickRandom(grassColors)} />)
            positions.push(new Vector3(ix, minY + height, iz))
            if ((minY + height) > maxHeightPosition.y) {
                maxHeightPosition.set(ix, minY + height, iz)
            }
            p++
        }
    }

    let lampPostPosition = maxHeightPosition.clone()
    while (lampPostPosition.distanceTo(maxHeightPosition) <= (baseSize * 4) || lampPostPosition.distanceTo(maxHeightPosition) >= (baseSize * 6)) {
        lampPostPosition = pickRandom(positions)
    }
    const lampLightPosition = lampPostPosition.clone().add(new Vector3(0, .8, 0))

    return <>
        {boxes}
        <Model url={models.limeTree} scale={.1} position={maxHeightPosition} />
        <Model url={models.lampPost} scale={.3} position={lampPostPosition} />
        <pointLight position={lampLightPosition} color={'yellow'} intensity={1} />
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
        <hemisphereLight color="white" groundColor={pickRandom(grassColors)} intensity={1} />
        <spotLight position={[0, 0, 2]} angle={Math.PI} penumbra={1} intensity={.1} />
        <Landscape />
        <PerspectiveCamera makeDefault={true} position={[5, 0, 0]} />
        <OrbitControls target={[0, 0, 0]} enablePan={false} enableRotate={true} enabled minDistance={3} maxDistance={12} />
        <Sky sunPosition={[0, 0, 2]} rayleigh={10} turbidity={10} />
        <Stars radius={900} factor={15} count={500} />
    </>
}

export const Diorama = () => {
    const scrollContainer = React.useRef<HTMLDivElement>(null)
    return <div style={styles.container} ref={scrollContainer}>
        <Canvas gl={{ antialias: false }}>
            <Scene container={scrollContainer} />
        </Canvas>
        <style jsx global>{`
        canvas {
            image-rendering: -moz-crisp-edges;
            image-rendering: -webkit-optimize-contrast;
            image-rendering: pixelated;
            image-rendering: optimize-contrast;
            border-radius: 4px;
            position: relative;
            z-index: -1;
        }
        `}</style>
    </div>
}


const styles = styleSheet({
    container: {
        position: 'relative',
        width: dim.width,
        borderRadius: '4px',
        aspectRatio: '1 / 1',
    }
})