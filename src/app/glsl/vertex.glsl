#define PI 3.1415926535

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform float time;
uniform vec2 mouse;
uniform bool displaced;

float smoothMod(float axis, float amp, float rad) {
    float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
    float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / PI) * at;
}

void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normal;


    float interval = 60.0; // 60秒の間隔
    float elapsedTime = mod(time, interval); // 経過時間を取得
    float phase = elapsedTime / interval; // 時間に基づくフェーズを計算
    float effectStrength = smoothMod(position.y/2.0, 5.0, 1.0*sin(phase/2.0)); // 形状変化の強さを計算

    // 形を変えるための変形を法線に基づいて行う
    vec3 displacedPosition = position + normal * effectStrength ; // 法線方向に10.0の強さで変形

    if(displaced) {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
    } else {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
}
