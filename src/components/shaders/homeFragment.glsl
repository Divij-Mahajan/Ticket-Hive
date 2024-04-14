uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

varying float vDisplacment;

void main() {
    float e = 2.71828;
    float pi = 3.14;
    float R = sqrt(pow(vPosition.x, 2.0) + pow(vPosition.y, 2.0) + pow(vPosition.z, 2.0));
    float r = sqrt(pow(vPosition.x, 2.0) + pow(vPosition.z, 2.0));
    float bellCurve = .1 * pow(e, (-0.01 * pow(r, 2.0)));

    gl_FragColor = vec4((vec3(.65, .3, .58) + vec3((R - 30.0) / 12.0)) + vec3(bellCurve) - vec3(r / 160.0), 1.0);
}
