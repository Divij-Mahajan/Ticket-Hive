import { Canvas, useLoader } from '@react-three/fiber'
import categoryFragmentShader from "../shaders/categoryFragment.glsl"
import categoryVertexShader from "../shaders/categoryVertex.glsl"
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export default function CategoryImage({ categories }) {
    const n = categories.length
    let images = []
    for (let i = 0; i < n; i++) {
        const [image] = useLoader(TextureLoader, [`category/${categories[i]}.png`]);
        let d = {
            category: categories[i],
            image: image,
        }
        images.push(d)
    }
    let increment = 0.003
    let inc = true
    let w = 1
    let shuntStep = 0.05
    const uniforms = {
        uTime: { type: 'f', value: 0.0 },
        uShunt: { value: 0.0 },
    }
    uniforms + { uTextur: { value: image } }
    function render() {
        uniforms.uTime.value += increment
        requestAnimationFrame(render)
        if (uniforms.uShunt.value >= 1) {
            shuntStep *= -1
        }
        let k = uniforms.uShunt.value + shuntStep
        if (k > 0.0) {
            uniforms.uShunt.value = k;
        }
    }
    render()
    return (<Canvas camera={{ position: [0, 35, 0] }}  >
        <ambientLight />
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.6 * 30, 30, w, w]} />
            <shaderMaterial uniformsNeedUpdate={true} uniforms={uniforms} vertexShader={categoryVertexShader} fragmentShader={categoryFragmentShader} />
        </mesh>
        <mesh position={[45, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.6 * 20, 20, w, w]} />
            <shaderMaterial uniformsNeedUpdate={true} uniforms={uniforms} vertexShader={categoryVertexShader} fragmentShader={categoryFragmentShader} />
        </mesh>
    </Canvas>)
}