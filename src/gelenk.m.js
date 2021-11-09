import * as pack from "./playground.m.js";

const THREE = pack.THREE;

const Gelenk = function( object ){
    const geo = new THREE.SphereGeometry( object.radius, 32, 32 );
    const mat1 = new THREE.MeshPhongMaterial( { color: 0xDDDDDD } );
    THREE.Mesh.call( this, geo, mat1 );
   };
    
Gelenk.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructor : Gelenk
   });

export { Gelenk };