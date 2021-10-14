import * as THREE from "../node_modules/three/build/three.module.js";
import { Gelenk } from "./gelenk.m.js";

const Bein = function( obj ){
    const geoOberschenkel = new THREE.BoxGeometry(1, 2);
    const matOberschenkel = new THREE.MeshBasicMaterial( { color: 0xAAAAAA } );
    THREE.Mesh.call( this, geoOberschenkel, matOberschenkel );
    this.position.set( obj.x, obj.y, obj.z );
    this.rotation.x = -Math.PI / 8;
    this.castShadow = true;
    this.receiveShadow = true;
    
    this.knie = new Gelenk( { radius: 0.6 } );
    this.knie.name = "Knie";
    this.knie.position.set( 0, -1.2, 0 );
    this.add( this.knie );
    
    const geoUnterschenkel = new THREE.BoxGeometry(1, 2.5);
    const matUnterschenkel = new THREE.MeshBasicMaterial( { color: 0xAAAAAA } );
    this.unterschenkel = new THREE.Mesh( geoUnterschenkel, matUnterschenkel );
    this.unterschenkel.position.set( 0, -1.2, -0.4 );
    this.unterschenkel.rotation.x = Math.PI / 8;
    this.unterschenkel.castShadow = true;
    this.unterschenkel.receiveShadow = true;
    this.knie.add( this.unterschenkel );
}

Bein.prototype = Object.assign ( Object.create( THREE.Mesh.prototype ), {
    constructor: Bein,
    Bewegen: function(){
        const scope = this;
        scope.string = 0;

        const add = function() {
            scope.knie.rotation.x += 0.1;
            if( scope.knie.rotation.x < Math.PI / 2 && scope.string != 3 ){
                setTimeout(() => {
                    add();
                }, 50);
            }
            else if( scope.knie.rotation.x >= Math.PI / 2 && scope.string != 3 ){
                sub();
            }
            else {
                scope.knie.rotation.x = 0;
            }
        }

        const sub = function(){
            scope.knie.rotation.x -= 0.1;
            if( scope.knie.rotation.x >= 0 && scope.string != 3 ){
                setTimeout(() => {
                    sub();
                }, 50);
            }
            else if( scope.knie.rotation.x <= 0 && scope.string != 3 ){
                add();
            }
            else {
                scope.knie.rotation.x = 0;
            }
        }
        add();
    },
    stehen: function(){
        this.string = 3;
        this.knie.rotation.x = 0;
    }
});

export { Bein };