import * as THREE from 'three';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
//https://gero3.github.io/facetype.js/

export class C_ZIKOKU {

    private chara:THREE.BufferGeometry;
    private material: THREE.MeshBasicMaterial;

    private charaMesh: THREE.Mesh;
    private font: any = null; // フォントを保持する変数（型をanyに変更）


    constructor() {

        this.chara = new THREE.BufferGeometry();
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        this.charaMesh = new THREE.Mesh(this.chara,this.material);

        this.charaMesh.scale.x *= -1;
        this.loadFont();
    }

    private loadFont() {
        const loader = new FontLoader();
        loader.load('/fonts/zikoku_Regular.json', (font) => {
            this.font = font; // フォントを保存
            this.update(); // フォントが読み込まれたら初期表示を更新
        });

    }

    public getMesh(): THREE.Mesh {
        return this.charaMesh;
    }

    public update() {
        if (!this.font) return; // フォントが読み込まれていない場合は何もしない


        const chara = new TextGeometry(`現在時刻`, {
            font: this.font, // 読み込んだフォントを使用
            size: 20,
            height: 1,
        });
    
        this.charaMesh.geometry = chara;
        this.charaMesh.position.set(150, -110, -299);
        
    }

    public addToScene(scene: THREE.Scene) {
   
        scene.add(this.charaMesh);
    }
}