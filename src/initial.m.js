import * as THREE from "../node_modules/three/build/three.module.js";
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.set( 0, 50, 50 );
const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = true;
controls.enableZoom = true;
controls.target.set( 0, 0, 0 );
controls.update();
scene.background = new THREE.Color( 0x111333 );

export { scene, camera, renderer, controls };