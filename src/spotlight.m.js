import * as THREE from "../node_modules/three/build/three.module.js";

let spotLight = new THREE.SpotLight( 0xffffff, 2 );
spotLight.position.set( 15, 50, 20 );
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.1;
spotLight.decay = 2;
spotLight.distance = 200;

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 512;
spotLight.shadow.mapSize.height = 512;
spotLight.shadow.camera.near = 5;
spotLight.shadow.camera.far = 200;
spotLight.shadow.focus = 1;

export{ spotLight };