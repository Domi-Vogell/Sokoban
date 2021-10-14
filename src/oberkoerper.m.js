import * as THREE from "../node_modules/three/build/three.module.js";

const Oberkoerper = function( obj ){
    const geoKoerper = new THREE.BoxGeometry(5, 8);
    THREE.Mesh.call( this, geoKoerper, obj.material );
    this.position.set( 0, 1, 0 );
    this.castShadow = true;
    this.receiveShadow = true;
    this.name = "Oberkoerper";
    this.scale.set( obj.groesse, obj.groesse, obj.groesse );
}

Oberkoerper.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructor : Oberkoerper
});

export { Oberkoerper };