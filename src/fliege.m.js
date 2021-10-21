import * as pack from "./playground.m.js";

const THREE = pack.THREE;

//Prototype
const Fliege = function( obj ) {
    const geoKopf = new THREE.SphereGeometry( 0.3, 32, 32 );
    const matKopf = new THREE.MeshBasicMaterial( { color: 0xAAAAAA } );
    THREE.Mesh.call( this, geoKopf, matKopf );
    this.position.set( 0, 3.3, 0.8 );

    const geometry = new THREE.ConeGeometry( 0.5, 1, 16 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    this.linkerFlügel = new THREE.Mesh( geometry, material );
    this.linkerFlügel.position.set( -0.4, 0, 0 );
    this.linkerFlügel.rotation.z = -Math.PI / 2;
    this.add( this.linkerFlügel );
    
    const linkerFlüger = new THREE.Mesh( geometry, material );

    this.rechterFlüger = new THREE.Mesh( geometry, material );
    this.rechterFlüger.position.set( 0.4, 0, 0 );
    this.rechterFlüger.rotation.z = Math.PI / 2;
    this.add( this.rechterFlüger	);
}



Fliege.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructor : Fliege,
});

export{ Fliege };