import * as THREE from 'three';
import vertexShader from '../../../glsl/vertex.glsl';
import fragmentShader from '../../../glsl/fragment.glsl';

export class Plane {
    private geometry: THREE.PlaneGeometry;
    private material: THREE.ShaderMaterial;
    private mesh: THREE.Mesh;
    private camera: THREE.Camera;

    constructor() {
        this.camera = new THREE.Camera();
        this.camera.position.set(0,0,-550);

        this.geometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                time: { value: 0.0 },
                mouse: { value: new THREE.Vector2() },
                opacity:{value:0.5},
                cameraPosition: { value: this.camera.position },
                rimOnOff:{value:false},
                displaced:{value:false}
            },
            side: THREE.DoubleSide, // 両面を表示
            transparent:true
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.mesh.position.set(0,0,-350);
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

    public update(deltaTime: number): void {
        // deltaTime を使用して時間を更新
        this.updateTime(deltaTime);
    }

    public updateTime(time: number): void {
        this.material.uniforms.time.value += 0.1 ;
    }

    public setMousePosition(x: number, y: number): void {
        this.material.uniforms.mouse.value.set(x, y);
    }
}

export default Plane;