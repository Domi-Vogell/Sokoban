import * as THREE from "../node_modules/three/build/three.module.js";
import { Textures } from '../../src/textures.m.js';



const Box = function( opts ){
    const defaults = {
        width : 100,
        height: 100,
        depth : 100
    };
    
    const o = this.options = Object.assign({}, defaults, opts );
    const textures = new Textures();
    const geometry = new THREE.BoxGeometry( o.width, o.height, o.depth );
    THREE.Mesh.call( this, geometry, textures.matcrate );

    this.rasterPosition = new THREE.Vector2();
    
}

Box.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructor: Box
});

export { Box };