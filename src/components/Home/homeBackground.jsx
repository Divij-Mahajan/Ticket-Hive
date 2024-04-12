import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import fragmentShader from "../shaders/homeFragment.glsl"
import vertexShader from "../shaders/homeVertex.glsl"
import floorFragmentShader from "../shaders/floorFragment.glsl"
import floorVertexShader from "../shaders/floorVertex.glsl"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRef } from 'react'
import { extend } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader'

extend({ OrbitControls })


function Controls({ orbitalRef }) {
    const { camera, gl } = useThree()
    useFrame(() => orbitalRef.current.update())
    return <orbitControls ref={orbitalRef} args={[camera, gl.domElement]} autoRotateSpeed={1} enableRotate={true} enablePan={false} autoRotate={false} minDistance={100} maxDistance={300} />
}

function HomeBackground({ aRef }) {
    let r = 30
    let w = 90
    let increment = 0.09
    let canvasRef = useRef()
    let matRef = useRef()
    let step = 0.03
    let inc = -step;
    const [image] = useLoader(TextureLoader, ['/floor.png']);
    const floorUniforms = {
        uTime: { type: 'f', value: Math.random() },
        uShunt: { type: 'f', value: 0 },
        uTexture: { value: image }
    }

    const uniforms = {

        uTime: { type: 'f', value: Math.random() },
        uX: { type: 'f', value: 0 },
        uY: { type: 'f', value: 0 },
        uShunt: { type: 'f', value: 0 }
    }
    function render() {
        uniforms.uTime.value += increment
        floorUniforms.uTime.value += increment
        let k = uniforms.uShunt.value + inc
        if (k <= 1.0 && k >= 0.0) {
            uniforms.uShunt.value = k;
        }
        requestAnimationFrame(render)
    }
    render()
    const sphereRef = useRef()
    addEventListener("mousemove", (e) => {
        if (sphereRef.current) {
            let Y = window.innerHeight / 2
            let X = window.innerWidth / 2
            let mouseX = e.clientX
            let mouseY = e.clientY
            let passX = mouseX - X
            let passY = mouseY - Y
            if (Math.sqrt(passX ** 2 + passY ** 2) < 150) {
                inc = step;
                uniforms.uX.value = passX / 150;
                uniforms.uY.value = passY / 150;
            } else {
                inc = -step;
            }
            let angle = Math.atan2((mouseY - Y), (mouseX - X))
            let distance = Math.sqrt((mouseX - X) ** 2 + (mouseY - Y) ** 2)
            let maxDistance = Math.sqrt((X) ** 2 + (Y) ** 2)
            let amp = 35 * distance / maxDistance
            //sphereRef.current.position.z = -Math.sin(angle) * amp * 2 + 2
            //sphereRef.current.position.x = -Math.cos(angle) * amp
        }

    })
    const orbitalRef = useRef()


    return (
        <Canvas camera={{ position: [0, 90, 0] }} ref={canvasRef} >
            <directionalLight position={[0, 100, 0]} intensity={0.5} />
            <mesh position={[0, -30, 0]} >
                <sphereGeometry args={[2 * r / 3, w / 2, w / 2]} />
                <meshStandardMaterial color={"red"} />
            </mesh>
            <mesh position={[0, 0, 0]} ref={sphereRef}>
                <sphereGeometry args={[r, w, w]} />
                <shaderMaterial uniformsNeedUpdate={true} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} ref={matRef} />
            </mesh>
            <mesh position={[0, 0, r]} >
                <boxGeometry args={[700, 300, 1, 100, 10]} />
                <meshBasicMaterial map={image} />
                <shaderMaterial uniformsNeedUpdate={true} uniforms={floorUniforms} vertexShader={floorVertexShader} fragmentShader={floorFragmentShader} />

            </mesh>
            {/* <points>
                <icosahedronGeometry args={[50, 50]} />
                <pointsMaterial size={0.001} />
            </points> */}


        </Canvas>

    )
}

export default HomeBackground