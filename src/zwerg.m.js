import { Hut } from "./hut.m.js";
import { Figur } from "./figur.m.js";

//Prototype
const Zwerg = function( obj ) {

//Körper
Figur.call( this, obj );
this.name = "Zwerge";

//Hut
this.hut = new Hut({ hutfarbe: obj.hutfarbe });
this.kopf.add( this.hut );
}



Zwerg.prototype = Object.assign( Object.create( Figur.prototype ), {
    constructor : Zwerg
});

export{ Zwerg };