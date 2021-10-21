import * as pack from "./playground.m.js";
import { Gelenk } from "./gelenk.m.js";

const THREE = pack.THREE;

const Arm = function( obj ) {
    const geoArm = new THREE.BoxGeometry( 2, 0.5 );
    const matArm = new THREE.MeshBasicMaterial( { color: 0xBBBBBB } );
    THREE.Mesh.call( this, geoArm, matArm );
    this.position.set( obj.x, obj.y, obj.z );
    this.rotation.z = -Math.PI / 4;

    if( obj.arm == "right" ) {
        this.rotation.y = -Math.PI;
    }

    this.castShadow = true;
    this.receiveShadow = true;

    this.elle = new Gelenk( { radius: 0.5 } );
    this.elle.position.set( 1.25, 0, 0 );
    this.elle.name = "ElleR";

    this.add( this.elle );

    const geoArmU = new THREE.BoxGeometry( 2, 0.5 );
    const matArmU = new THREE.MeshBasicMaterial( { color: 0xBBBBBB } );
    this.Unterarm = new THREE.Mesh( geoArmU, matArmU );
    this.Unterarm.position.set( 1, -0.5, 0 );
    this.Unterarm.rotation.z = -Math.PI / 8;
    this.Unterarm.castShadow = true;
    this.Unterarm.receiveShadow = true;
    this.elle.add( this.Unterarm );
};

Arm.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructor : Arm,
    Bewegen: function(){
        const scope = this;
        scope.string = 0;

        const add = function() {
            scope.rotation.x += 0.1;
            if( scope.rotation.x < 0 && scope.string != 3 ){
                setTimeout(() => {
                add();
                }, 50);
            }
            else if( scope.rotation.x >= 0 && scope.string != 3 ){
                sub();
            }
            else {
                scope.rotation.x = 0;
            }
        }

        const sub = function(){
            scope.rotation.x -= 0.1;
            if( scope.rotation.x > (-Math.PI / 2) && scope.string != 3 ){
                setTimeout(() => {
                    sub();
                }, 50);
            }
            else if( scope.rotation.x <= (-Math.PI / 2) && scope.string != 3 ){
                add();
            }
            else {
                scope.rotation.x = 0;
            }
        }
        sub();
    },
    stehen: function(){
        this.string = 3;
        this.rotation.x = 0;
    }
   });

export { Arm };