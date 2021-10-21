import * as pack from "./playground.m.js";

const THREE = pack.THREE;

const Gelenk = function( object ){
    const geo = new THREE.SphereGeometry( object.radius, 32, 32 );
    const mat1 = new THREE.MeshBasicMaterial( { color: 0xDDDDDD } );
    THREE.Mesh.call( this, geo, mat1 );
   };
    
Gelenk.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructor : Gelenk,
    onClick: function( param ) {
        if( param.target.name == "ElleL" || param.target.name == "ElleR" ){
            this.rotation.z += 0.1;
        }
        else if( param.target.name == "KnieR" || param.target.name == "KnieL" ){
            this.rotation.x += 0.1;
        }
    }
   });

export { Gelenk };