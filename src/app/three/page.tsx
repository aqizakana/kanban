"use client"
//おまじない
import type { NextPage } from 'next'
import * as THREE from 'three'
import { useEffect, useRef ,useState } from 'react'
import styles from './Home.module.css'; // CSSモジュールをインポート


//背景
import initializeScene from './objects/initializeScene'




import Plane from './objects/Shape/Plane';

import { Text } from './objects/Shape/Welcome';

import {To} from './objects/Shape/to';
import { networkstudio } from './objects/Shape/NetworkDesign';
import { CurrentTime } from './objects/Shape/CurrentTime';
import {C_ZIKOKU} from './objects/Shape/C_ZIKOKU';

import vertexShader from '../glsl/vertex.glsl';
import fragmentShader from '../glsl/fragment.glsl';

//カメラコントロール
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Sphere2 from './objects/Shape/Sphere2';


const Home: NextPage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    
    
    interface CustomMesh extends THREE.Mesh {
        objectName: string;
        creationTime: number;
      }

    const [objectList, setObjectList] = useState<CustomMesh[]>([]); 

    //動的シーンセッティング


    const shaderMaterial = new THREE.ShaderMaterial({
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
      
    //シーンカメラレンダラー
    useEffect(() => {
        if (canvasRef.current) {
          const { scene, camera, renderer, controls,animate,animateForGroup } = initializeScene(canvasRef.current)


    
         
          
          const sphere = new Sphere2(1.0);
          scene.add(sphere.getMesh());


          const plane = new Plane();
          scene.add(plane.getMesh());

            const welcome = new Text();
            const to = new To();
            const networkDesign = new networkstudio();

            const group = new THREE.Group();
            group.add(welcome.getMesh());
            group.add(to.getMesh());
            scene.add(networkDesign.getMesh());
            const time = new CurrentTime();
            time.addToScene(scene);
            time.update();

            // 1分ごとに時刻を更新
        const intervalId = setInterval(() => {
            time.updateTime();
        }, 60000); // 60000ミリ秒 = 1分

            const zikoku = new C_ZIKOKU();
            zikoku.addToScene(scene);

          // グループ全体にシェーダーマテリアルを適用
            group.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                child.material = shaderMaterial;
                }
            });
            
            // グループをシーンに追加
            scene.add(group);

          animate(sphere,plane,networkDesign);
          animateForGroup(group);
          
        
         
          // クリーンアップ関数
        return () => clearInterval(intervalId);
        }
      }, [])

    // addObject関数をコンポーネントのトップレベルで定義
   


    return (
        <div className={styles.container}>
            <canvas ref={canvasRef} className={styles.canvas} id="canvas"></canvas>
        </div>
    )
}

export default Home
