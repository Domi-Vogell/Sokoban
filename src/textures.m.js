import * as pack from "./playground.m.js";

const THREE = pack.THREE;

const Textures = function() {
    THREE.Object3D.call( this );
    const loader = new THREE.TextureLoader();
    const textureCrate = loader.load( '../test/textures/crate.gif' );
    this.matcrate = new THREE.MeshBasicMaterial( {
    map: textureCrate
    });

    const textureBackstein = loader.load( '../test/textures/backstein.jpg' );
    this.matbackstein = new THREE.MeshBasicMaterial( {
    map: textureBackstein
    });

    const textureWood = loader.load( '../test/textures/holz.jpg' );
    this.matFigur = new THREE.MeshBasicMaterial( {
    map: textureWood
    });

    const textureBoden = loader.load( '../test/textures/boden.jpg' );
    textureBoden.wrapS = THREE.RepeatWrapping;
    textureBoden.wrapT = THREE.RepeatWrapping;
    textureBoden.repeat.set( 100, 100 );
    this.matBoden = new THREE.MeshBasicMaterial( {
    map: textureBoden
    });

    this.donematerial = new THREE.MeshBasicMaterial({color: 0x0088FF }); 

}

Textures.prototype = Object.assign( Object.create ( THREE.Object3D.prototype ), {
    constructor: Textures
});

export { Textures };