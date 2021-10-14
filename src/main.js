const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color( 0xff0ff0 );
//renderer.setClearColor( 0xAF14D2, 1);

//Uhrmittelpunkt
pivotPoint = new THREE.Object3D();
pivotPoint.position.set( 0, 0, 0 );

//Uhrkreis
const geometry7 = new THREE.CircleGeometry( 2, 32 );
const material7 = new THREE.MeshBasicMaterial( { color: 0xfffff } );
const circle = new THREE.Mesh( geometry7, material7 );
circle.position.set( 0, 3.5, 0 );
scene.add( circle );
circle.add( pivotPoint );

//Cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.set( 2.5,0,0 );
scene.add( cube );

//Cube 2
const geometry6 = new THREE.BoxGeometry( 1, 0.01, 0.05 );
const material6 = new THREE.MeshBasicMaterial( { color: 0xff00ff } );
const cube2 = new THREE.Mesh( geometry6, material6 );
cube2.position.set( 1, 0, 0.5 );
pivotPoint.add( cube2 );

//Zylinder
const geometry2 = new THREE.CylinderGeometry(0.5, 0.5, 1);
const material2 = new THREE.MeshBasicMaterial( { color: 0x000ff0 } );
const cylinder = new THREE.Mesh( geometry2, material2 );
cylinder.position.set(-3,0,0);
scene.add( cylinder );

//Boden
const geometry3 = new THREE.PlaneGeometry( 15, 11.5 );
const material3 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry3, material3 );
plane.rotation.x += Math.PI/2;
plane.position.set(0, -0.5, 0);
scene.add( plane );

//Ring
const geometry4 = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material4 = new THREE.MeshBasicMaterial( { color: 0xDDDDDD } );
const torus = new THREE.Mesh( geometry4, material4 );
scene.add( torus );

//Knoten
const geometry5 = new THREE.TorusKnotGeometry( 0.5, 0.1, 64, 8, 3, 4 );
const material5 = new THREE.MeshBasicMaterial( { color: 0xAAAAAA } );
const torusKnot = new THREE.Mesh( geometry5, material5 );
torusKnot.position.set(0, 0.3, 0)
scene.add( torusKnot );

camera.position.y = 1;
camera.position.z = 8;

let a = 0;

function animate() {
    //plane.rotation.z -= 0.01;
    pivotPoint.rotation.z -= 0.03;
    cylinder.rotation.y += 0.03;
    //scene.rotation.y += 0.01;
    //scene.rotation.z += 0.01;
    torusKnot.rotation.y += 0.03;

    if( a < 100 ) {
        cube.geometry.scale( 1.01, 1.01, 1.01 );
        a++;
    }
    else if( a >= 100 && a < 199 ) {
        cube.geometry.scale( 0.99, 0.99, 0.99 );
        a++;
    }
    else {
            a = 0;
    }


	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();