varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;

void main() {
    vUv = uv;
    vec3 pos = position;//+ vec3(-uTime, 0.0, 0.0);
    float r = sqrt(pow(pos.x, 2.0) + pow(pos.y, 2.0));
    pos.z += sin(r + uTime / 10.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}