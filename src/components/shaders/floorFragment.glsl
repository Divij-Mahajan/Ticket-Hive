uniform sampler2D uTexture;
uniform float uTime;
varying vec2 vUv;
void main() {
    vec3 base = texture2D(uTexture, vUv - vec2(0.0, mod((uTime * 0.004), 0.0625))).rgb;
    gl_FragColor = vec4(base, 1.0);
}
