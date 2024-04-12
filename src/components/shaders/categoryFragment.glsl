uniform sampler2D uTexture;
uniform float uShunt;
uniform float uTime;
varying vec2 vUv;
varying float vDisp;
void main() {
    float pi = 3.14159;
    float glitchIntensity = sin(uTime * 60.0) / 450.0;
    glitchIntensity *= uShunt;
    if(uShunt <= 0.05) {
        glitchIntensity = 0.0;
    }
    vec3 base = texture2D(uTexture, vUv).rgb;
    vec4 red = texture2D(uTexture, vUv + vec2(glitchIntensity * 1.5, 0.0));
    float shift_val = 10.1;
    base.r = mix(base.r, red.r, shift_val);
    vec4 green = texture2D(uTexture, vUv - vec2(glitchIntensity * 1.5, 0.0));
    base.g = mix(base.g, green.g, shift_val);
    gl_FragColor = vec4(base + vec3(vDisp / 15.0), 1.0);
}
