import * as THREE from 'three';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export class CurrentTime {
    private geometry: THREE.BufferGeometry;
    private material: THREE.MeshBasicMaterial;
    private timeText: THREE.Mesh;
    private font: THREE.Font | null = null; // フォントを保持する変数

    constructor() {
        this.geometry = new THREE.BufferGeometry();
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        this.timeText = new THREE.Mesh(this.geometry, this.material);
       
        this.timeText.position.set(30, -110, -299);
        this.timeText.scale.x *= -1;
   
        this.loadFont();
    }

    private loadFont() {
        const loader = new FontLoader();
        loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
            this.font = font; // フォントを保存
            this.update(); // フォントが読み込まれたら初期表示を更新
        });
    }

    public getMesh(): THREE.Mesh {
        return this.timeText;
    }

    public update() {
        if (!this.font) return; // フォントが読み込まれていない場合は何もしない

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // 秒を除外
        this.timeText.geometry.dispose(); // 古いジオメトリを破棄

        const geometry = new TextGeometry(`:${timeString}`, {
            font: this.font, // 読み込んだフォントを使用
            size: 40,
            height: 1,
        });
        
        this.timeText.geometry = geometry; // 新しいジオメトリを設定
    }

    public updateTime() {
        this.update(); // 時刻を更新
    }

    public addToScene(scene: THREE.Scene) {
        scene.add(this.timeText);
    }
}