import * as pack from "./playground.m.js";

const THREE = pack.THREE;

const Zielfeld = function(){
    const geometry = new THREE.PlaneGeometry( 100, 100 );
    const material = new THREE.MeshBasicMaterial( {color: 0x0000FF } );
    THREE.Mesh.call( this, geometry, material );
    this.rotation.x = -Math.PI / 2;
};

Zielfeld.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructur: Zielfeld,
});

export { Zielfeld };

