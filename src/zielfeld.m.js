import * as pack from "./playground.m.js";
import { Textures } from '../../src/textures.m.js';

const THREE = pack.THREE;

const Zielfeld = function(){
    const geometry = new THREE.PlaneGeometry( 100, 100 );
    const textures = new Textures();
    THREE.Mesh.call( this, geometry, textures.bodenZiel );
    this.rotation.x = -Math.PI / 2;
};

Zielfeld.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructur: Zielfeld,
});

export { Zielfeld };

