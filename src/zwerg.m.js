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
    constructor : Zwerg,
    onClick: function( param ){
        Figur.prototype.onClick.call( this, param );
        if( this.hut.position.y == 3 ){
            this.hut.hutAb();
        }
    },

    deselect: function( param ) {
        if( this.hut.position.y == 4 )
            this.hut.hutAufsetzen();

        Figur.prototype.deselect.call( this, param );  
    }
});

export{ Zwerg };