import * as THREE from "../node_modules/three/build/three.module.js";
import { Kopf } from "./kopf.m.js";
import { Arm } from "./arm.m.js";
import { Bein } from "./bein.m.js"
import { Oberkoerper } from "./oberkoerper.m.js";


//Prototype
const Figur = function( obj ) {
    this.bSelected = false;
    this.bLaufen = false;
    const scope = this;
    document.addEventListener( 'deselect', function() {
        scope.deselect.call( scope );
    });

    //Körper
    THREE.Object3D.call( this );
    this.becken = new THREE.Object3D();
    this.becken.position.y = 1.9;
    this.oberkoerper = new Oberkoerper({groesse: obj.groesse, material: obj.textur } );
    this.oberkoerper.castShadow = true;
    this.oberkoerper.receiveShadow = true;

    this.oberkoerper.position.y -= obj.groesse * 2;
    this.becken.add( this.oberkoerper );

    //Kopf
    this.kopf = new Kopf({ x: 0, y: 6, z: 0 });
    this.kopf.castShadow = true;
    this.kopf.receiveShadow = true;
    this.oberkoerper.add( this.kopf );

    //Beine
    this.rechtesBein = new Bein({ x: 1.3, y: -4.7, z: 0.4, bein: "right" });
    this.rechtesBein.castShadow = true;
    this.rechtesBein.receiveShadow = true;
    this.becken.add( this.rechtesBein );
    this.linkesBein = new Bein({ x: -1.3, y: -4.7, z: 0.4, bein: "left" });
    this.linkesBein.castShadow = true;
    this.linkesBein.receiveShadow = true;
    this.becken.add( this.linkesBein );

    //Arme
    this.rechterArm = new Arm({ x: -3, y: 2, z: 0, arm: "right" });
    this.linkerArm = new Arm({ x: 3, y: 2, z: 0, arm: "left" });
    this.rechterArm.castShadow = true;
    this.rechterArm.receiveShadow = true;
    this.linkerArm.castShadow = true;
    this.linkerArm.receiveShadow = true;
    this.oberkoerper.add( this.rechterArm );
    this.oberkoerper.add( this.linkerArm );

    this.scale.set( 20, 20, 20 );
    this.position.y = obj.groesse * 155;

    this.add( this.becken );
}



Figur.prototype = Object.assign( Object.create( THREE.Object3D.prototype ), {
    constructor : Figur
});

export{ Figur };