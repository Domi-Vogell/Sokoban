import * as THREE from "../node_modules/three/build/three.module.js";

const Spielplatz = function( object ){

    let scope = this;
    scope.quadrat = 100;
    scope.raster = [];
    scope.jsonDatei;

    let holeRaster = function( param ){
        for( let k = 0; k < scope.jsonDatei.levels.length ; k++ ){
            let level = [];
            for( let i = 0; i < 20; i++ ){
                if( scope.jsonDatei.levels[k].raster[i] ){
                    level.push( scope.jsonDatei.levels[k].raster[i].split( "," ));
                }
                else{
                    break;
                }
            }
            scope.raster.push( level );
        }
    }

    this.einlesen( holeRaster );
    
    this.zeilen;
    this.spalten;

    this.boxen = [];
    this.zielfeld = [];
    this.wand = [];
    this.boden = [];
    this.position = new THREE.Vector3();
};

Spielplatz.prototype = Object.assign( Object.create( Object.prototype ), {
    constructor : Spielplatz,
    searchStandort: function(){
        for( let i = 0; i < this.zeilen; i++ ){
            for( let k = 0; k < this.spalten; k++ ){
                let br = new THREE.Vector3( this.quadrat * ( k + 1 ) + this.quadrat / 2, 0, this.quadrat * ( i + 1 ) + this.quadrat / 2 );
                let tl = new THREE.Vector3( this.quadrat * k, 0, this.quadrat * i );
                if( this.position.x > tl.x && this.position.x < br.x && this.position.z > tl.z && this.position.z < br.z ){
                    this.standortInRasterZeile = i;
                    this.standortInRasterSpalte = k;
                }
            }
        }
    },
    searchStandortCheck: function(){
        for( let i = 0; i < this.zeilen; i++ ){
            for( let k = 0; k < this.spalten; k++ ){
                let br = new THREE.Vector3( this.quadrat * ( k + 1 ) + this.quadrat / 2, 0, this.quadrat * ( i + 1 ) + this.quadrat / 2 );
                let tl = new THREE.Vector3( this.quadrat * k, 0, this.quadrat * i );
                if( this.position.x > tl.x && this.position.x < br.x && this.position.z > tl.z && this.position.z < br.z ){
                    this.clickedStandortZeile = i;
                    this.clickedStandortSpalte = k;
                }
            }
        }
    },

    einlesen: function( callback ){
        let scope = this;
        fetch( "../JSON/test.json" )
        .then( response => response.json() )
        .then( function( level ){
                scope.jsonDatei = level;    
                
                if( callback && typeof callback == "function" ){
                    callback( scope.JSON );
                }

                const event = new CustomEvent( 'rasterReady', {
                    detail: {
                        raster: scope.raster
                      }
                });
                document.dispatchEvent( event );
            }
        );
    },
});

export { Spielplatz };