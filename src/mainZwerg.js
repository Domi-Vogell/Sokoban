import * as THREE from "../node_modules/three/build/three.module.js";
import { spotLight } from "./spotlight.m.js";
import { oberkoerper } from "./zwerg.m.js";
import * as raumwerkzeug from "./initial.m.js"

//Boden
const geoBoden = new THREE.PlaneGeometry( 120, 120 );
//geoBoden.rotateX( -Math.PI / 2 );

const loader = new THREE.TextureLoader();
const texture = loader.load( './textures/holz.jpg' );
let mat = new THREE.MeshStandardMaterial( {
	map: texture,
	roughness: 0.1,
	color: 0xffffff,
	metalness: 0.05,
});


const Boden = new THREE.Mesh( geoBoden, mat );
Boden.receiveShadow = true;

//Licht
const ambient = new THREE.AmbientLight( 0xffffff, 0.3 );
//let lightHelper = new THREE.SpotLightHelper( spotLight );
//scene.add( lightHelper );
//let shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
//scene.add( shadowCameraHelper );

//Szene füllen
raumwerkzeug.scene.add( Boden );
raumwerkzeug.scene.add( oberkoerper );
raumwerkzeug.scene.add( spotLight );
raumwerkzeug.scene.add( ambient );

console.log( mat );

function animate() {
	const time = Date.now() * 0.001;
	spotLight.position.y = Math.cos( time ) * 5 + 30;
	
	requestAnimationFrame( animate );
	raumwerkzeug.renderer.render( raumwerkzeug.scene, raumwerkzeug.camera );
}
animate();