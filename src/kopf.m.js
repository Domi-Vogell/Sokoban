import * as pack from "./playground.m.js";

const THREE = pack.THREE;

const Kopf = function( obj ){    
    const geoKopf = new THREE.SphereGeometry( 2, 32, 32 );
    const matKopf = new THREE.MeshPhongMaterial( { color: 0xAAAAAA } );
    THREE.Mesh.call( this, geoKopf, matKopf );
    this.position.set( obj.x, obj.y, obj.z );
    this.castShadow = true;
    this.receiveShadow = true;
    this.name = "Kopf";

    //Gesicht
    const geoAuge = new THREE.CircleGeometry( 0.1, 32 );
    const matAuge = new THREE.MeshPhongMaterial( { color: 0xDDDDDD } );
    this.auge = new THREE.Mesh( geoAuge, matAuge );
    this.auge.position.set( -0.5, 0.5, 2 );
    this.auge.castShadow = true;
    this.auge.receiveShadow = true;

    this.add( this.auge );

    this.auge2 = new THREE.Mesh( geoAuge, matAuge );
    this.auge2.position.set( 0.5, 0.5, 2 );
    this.auge2.castShadow = true;
    this.auge2.receiveShadow = true;
    this.add( this.auge2 );

    const geonase = new THREE.ConeGeometry( 0.15, 1, 32 );
    const matnase = new THREE.MeshPhongMaterial( { color: 0xff8800 } );
    this.nase = new THREE.Mesh( geonase, matnase );
    this.nase.rotation.x = Math.PI / 2;
    this.nase.position.set( 0, 0, 2.5 );
    this.nase.castShadow = true;
    this.nase.receiveShadow = true;
    this.add( this.nase );

    const geometry = new THREE.BoxGeometry( 1, 0.1, 0.1 );
    const material = new THREE.MeshPhongMaterial( { color: 0xEA899A } );
    this.mund = new THREE.Mesh( geometry, material );
    this.mund.position.set( 0, -0.8, 1.8 );
    this.add( this.mund );
   };
    
Kopf.prototype = Object.assign( Object.create( THREE.Mesh.prototype ), {
    constructor : Kopf,
    kopfDrehen: function( param ) {
        if( param.intersect.object.rotation.y == Math.PI / 2 ) {
            param.intersect.object.rotation.y -= Math.PI / 2;
        } 
        else if ( param.intersect.object.rotation.y == 0 ) {
            
            if( param.intersect.point.x < param.target.position.x )
             param.intersect.object.rotation.y -= Math.PI / 2;
            else
             param.intersect.object.rotation.y += Math.PI / 2;
        } 
        else if( param.intersect.object.rotation.y == -Math.PI / 2 ) {
            param.intersect.object.rotation.y += Math.PI / 2; 
        }
    }
   });


export { Kopf };