#define PI 3.1415926535

uniform float time;
uniform vec2 mouse;


varying vec2 vUv;
varying vec3 vPosition;
varying float vNoise;
varying float vOpacity;


attribute float vertexIndex;  // 頂点インデックスを追加
//インスタンス行列
attribute mat4 instanceMatrix;

// ランダム関数の定義
float random(vec3 scale, float seed) {
    return fract(sin(dot(scale + seed, vec3(seed))) * 43758.5453);
}

// 簡単なノイズ関数（必要に応じて改良可能）
float noise(vec3 position) {
    return random(position, time);
}

float smoothMod(float axis, float amp, float rad) {
    float top = cos(PI * (axis / amp)) * sin(PI * (axis / amp));
    float bottom = pow(sin(PI * (axis / amp)), 2.0) + pow(rad, 2.0);
    float at = atan(top / bottom);
    return amp * (1.0 / 2.0) - (1.0 / PI) * at;
}

void main() {
    vUv = uv;
    vPosition = position;

    // インスタンス固有の変換を適用
    vec4 instancePosition = instanceMatrix * vec4(position, 0.5);

    
    
    // ノイズ値の計算
    float noiseValue = noise(position * 0.1 + time * 0.5);
    vNoise = noiseValue;

    // 新しい位置の計算
    vec3 newPosition = position + normal * noiseValue;
    float distanceToMouse = distance(newPosition.xy, mouse * 2.0 - 1.0);
    float influence = smoothMod(0.2, 0.0, vUv.x);

    // 動的な値の計算（ポイントサイズに使用）
        float interval = 60.0; // 20秒の間隔
    float elapsedTime = mod(time, interval); // 経過時間を取得
    float dynamicValue = sin(elapsedTime / 1000.0) *0.5 + 0.5;

    float cutoffX = tan(time * 0.01) * 0.5 + 0.5; 
    float cutoffZ = sin(time * 0.01) * 0.5 + 0.5;

    vOpacity = 1.0 - smoothMod(cutoffX - 0.5, cutoffZ, newPosition.z);

   /*  if(mod(vertexIndex,10.0) == 0.0){
            newPosition.x += sin(time  + newPosition.y * 0.05) * 1.0;
            newPosition.y += cos(time  + newPosition.x * 0.05) * 1.0 ;
            newPosition.z += sin(time + newPosition.x * 0.05) * 1.0;
    } */
    
    // ポイントサイズの設定（動的な値を使用）
    gl_PointSize = 5.0 + dynamicValue * 10.0;
    
    // 最終的な頂点位置の設定
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}

