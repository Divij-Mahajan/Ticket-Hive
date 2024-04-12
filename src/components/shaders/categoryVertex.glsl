varying vec2 vUv;
varying float vDisp;
uniform sampler2D uTexture;
uniform float uTime;

void main() {
    vUv = uv;
    vec3 pos = position;
    //pos.z += pos.y * sin(pos.x / 2.0 + uTime * 10.0) / 45.0;
    vDisp = pos.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}