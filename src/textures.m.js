import * as pack from "./playground.m.js";

const THREE = pack.THREE;

const Textures = function() {
    THREE.Object3D.call( this );
    const loader = new THREE.TextureLoader();
    const textureCrate = loader.load( '../test/textures/crate.gif' );
    this.matcrate = new THREE.MeshPhongMaterial( {
        map: textureCrate
    });

    const textureBackstein = loader.load( '../test/textures/backstein.jpg' );
    this.matbackstein = new THREE.MeshPhongMaterial( {
        map: textureBackstein
    });

    const textureWood = loader.load( '../test/textures/holz.jpg' );
    this.matFigur = new THREE.MeshPhongMaterial( {
        map: textureWood
    });

    const textureBoden = loader.load( '../test/textures/boden.jpg' );
    this.matBoden = new THREE.MeshPhongMaterial( {
        map: textureBoden
    });

    this.donematerial = new THREE.MeshPhongMaterial({
        map: textureCrate,
        color: 0x0088FF 
    }); 

    this.bodenZiel = new THREE.MeshPhongMaterial({
        map: textureBoden,
        color: 0x0088FF 
    }); 

}

Textures.prototype = Object.assign( Object.create ( THREE.Object3D.prototype ), {
    constructor: Textures
});

export { Textures };