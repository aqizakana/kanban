
import * as THREE from 'three';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import vertexShader from '../../../glsl/vertex.glsl';
import fragmentShader from '../../../glsl/fragment.glsl';

export class Text {
    private geometry: THREE.BufferGeometry;
    private material: THREE.ShaderMaterial;
    private mesh: THREE.Mesh;

    constructor() {
        // 一時的なジオメトリを作成
        this.geometry = new THREE.BufferGeometry();
        
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                time: { value: 0.0 },
                mouse: { value: new THREE.Vector2() },
                opacity: { value: 1.0 },
                rimOnOff:{value:true},
                displaced:{value:true}
            },
            transparent: true,
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 90, -299);


        this.loadFont();
    }

    private loadFont() {
        const loader = new FontLoader();
        loader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
            const textGeometry = new TextGeometry('W E L C O M E !', {
                font: font,
                size: 40,
                height: 1,
                curveSegments: 8,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 1,
                bevelOffset:0,
                bevelSegments: 1
            });

            textGeometry.computeBoundingBox();
            textGeometry.center();

            this.mesh.geometry = textGeometry;
            this.mesh.scale.x *= -1;
        });
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

    public update(deltaTime: number) {
        this.updateTime(deltaTime);
    }

    public updateTime(time: number) {
        this.material.uniforms.time.value += 0.01;
       
    }

    public setMousePosition(x: number, y: number) {
        this.material.uniforms.mouse.value.set(x, y);
    }
}