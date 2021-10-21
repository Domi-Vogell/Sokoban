import * as pack from "./playground.m.js";
import { Textures } from '../../src/textures.m.js';

const THREE = pack.THREE;

const Boden = function( opts ){
    const defaults = {
        width : 100,
        height: 100,
        depth : 100
    };
    const textures = new Textures();
    const o = this.options = Object.assign({}, defaults, opts );

    const geometry = new THREE.PlaneGeometry( 100, 100 );
    const material = new THREE.MeshBasicMaterial( {color: 0x0000FF } );
    THREE.Mesh.call( this, geometry, textures.matBoden );
    this.rotation.x = -Math.PI / 2;
};

Boden.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructur: Boden,
});

export { Boden };

