import * as pack from "./playground.m.js";

const THREE = pack.THREE;

const Hut = function( object ){
    const geoHut = new THREE.ConeGeometry( 2, 3, 16 );
    const matHut = new THREE.MeshPhongMaterial( { color: object.hutfarbe } );
    THREE.Mesh.call( this, geoHut, matHut );
    this.position.set( 0, 3, 0 );
    this.castShadow = true;
    this.receiveShadow = true;
};

Hut.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructor : Hut,
    hutAb: function(){
        this.position.y += 1;
    },
    hutAufsetzen: function(){
        this.position.y -= 1;
    }
   });

export { Hut };