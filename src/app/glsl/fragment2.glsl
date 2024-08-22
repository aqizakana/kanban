uniform float time;
uniform vec2 mouse;

varying vec2 vUv;
varying vec3 vPosition;
varying float vNoise;
varying float   vOpacity;   



void main() {
    // 時間に基づく動的な値（0.0から1.0の間で変動）
        // 時間に基づいた色の変化
    float interval = 60.0; // 20秒の間隔
    float elapsedTime = mod(time, interval); // 経過時間を取得
    float dynamicValue = sin(elapsedTime) *0.5 + 0.5;

    // 動的な値を使って色を変化させる
    vec3 color = vec3(1.0, dynamicValue, dynamicValue);
    vec3 color2 = vec3(1.0,vNoise,0.0);

    // 透明度を0.5に設定
    gl_FragColor = vec4(color, vOpacity);
}

