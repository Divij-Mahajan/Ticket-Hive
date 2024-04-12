uniform float uTime;
uniform float uX;
uniform float uY;
uniform float uShunt;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacment;

bool checkCord(float x, float uX) {
    if(uX > x - 3.0 && uX < x + 3.0) {
        return true;
    }
    return false;

}

void main() {
    vPosition = position;
    vNormal = normal;
    vUv = uv;
    vDisplacment = 0.0;
    float e = 2.71828;
    float pi = 3.14;
    // if(checkCord(vPosition.z, 2.0) && checkCord(vPosition.x, 2.0)) {
    //     vDisplacment = 5.0;
    // }

    float r = sqrt(pow(vPosition.x - 30.0 * uX, 2.0) + pow(vPosition.z - 30.0 * uY, 2.0));
    float bellCurve = pow(e, (-0.001 * pow(r, 2.0)));
    float theta = r / 2.0 - uTime;
    vPosition -= normal * (cos(theta)  /*+ fract(theta)*/) * uShunt * bellCurve;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}