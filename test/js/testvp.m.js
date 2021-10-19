import * as pack from './playground.m.js';
import { Zwerg } from '../../src/zwerg.m.js';
import { Figur } from '../../src/figur.m.js';
import { Spielplatz } from "../../src/raster.m.js";
import { Box } from "../../src/box.m.js";
import { Wand } from '../../src/wand.m.js';
import { Zielfeld } from '../../src/zielfeld.m.js';
import { Textures } from '../../src/textures.m.js';
import { Boden } from '../../src/boden.m.js';
import {UI} from '../../src/ui.m.js';


let url = new URL(window.location.href);
let myStorage = localStorage;
let level;
//SZENEN-INITIALISIERUNG
const ui = new UI();
const THREE = pack.THREE;
const VP = new pack.Playground( { grassground: false }).VP;
VP.camera.position.x = 500;
VP.camera.position.y = 600;
VP.camera.position.z = 1300;
VP.camera.lookAt( 500,150,500 );
VP.scene.background = new THREE.Color( 0xcccccc );
// add a ambient light
VP.scene.add( new THREE.AmbientLight( 0x020202 ) );
// add a light in front
let light = new THREE.DirectionalLight( 'white', 2 );
light.position.set(100, 100, 300);
VP.scene.add( light );
const textures = new Textures();
let toggleTaste = false;

//FIGUR
const mhkzwerg = new Zwerg( { hutfarbe: 0xFF0000, groesse: 0.8, textur: textures.matFigur } );
VP.scene.add( mhkzwerg );

let raster = [];
let alleLevel = [];

//RASTER
let playground = new Spielplatz();

const tweenReset = function(){
    let rotationX = { x: mhkzwerg.oberkoerper.rotation.x };
    let targetRotX = { x: 0 };
    let tweenRotX = new TWEEN.Tween( rotationX )
                    .to( targetRotX, 100 );

    tweenRotX.onUpdate( function(){
        mhkzwerg.oberkoerper.rotation.x = rotationX.x;
    });

    let positionZ = { z: mhkzwerg.oberkoerper.position.z };
    let targetPosZ = { z: mhkzwerg.oberkoerper.position.z - 2.5 };
    let tweenPosZ = new TWEEN.Tween( positionZ )
                    .to( targetPosZ, 100 );

    tweenPosZ.onUpdate( function(){
        mhkzwerg.oberkoerper.position.z = positionZ.z;
    });

    let positionY = { y: mhkzwerg.oberkoerper.position.y };
    let targetPosY = { y: mhkzwerg.oberkoerper.position.y + 1 };
    let tweenPosY = new TWEEN.Tween( positionY )
                    .to( targetPosY, 100 );

    tweenPosY.onUpdate( function(){
        mhkzwerg.oberkoerper.position.y = positionY.y;
    });

    mhkzwerg.rechterArm.rotation.x = 0;
    mhkzwerg.linkerArm.rotation.x = 0;

    tweenRotX.start();
    tweenPosZ.start();
    tweenPosY.start();

    VP.loop.add( TWEEN.update );
}

const tweenBoxRechts = function( box ){
    let zwergKopf = { y: mhkzwerg.kopf.rotation.y };
    let targetKopf = { y: 0 };
    let tweenKopf = new TWEEN.Tween( zwergKopf )
                    .to( targetKopf, 100 );

    tweenKopf.onUpdate( function(){
        mhkzwerg.kopf.rotation.y = zwergKopf.y;
    });
    
    let zwergDrehen = { y: mhkzwerg.rotation.y };
    let targetDrehen = { y: Math.PI / 2 };
    let tweenDrehen = new TWEEN.Tween( zwergDrehen )
                    .to( targetDrehen, 400 );

    tweenDrehen.onUpdate( function(){
        mhkzwerg.rotation.y = zwergDrehen.y;
    });

    let zwergPosition = { x: mhkzwerg.position.x };
    let target = { x: mhkzwerg.position.x + playground.quadrat };
    let tweenSchritte = new TWEEN.Tween( zwergPosition )
                    .to( target, 1000 );

    tweenSchritte.onUpdate( function(){
    mhkzwerg.position.x = zwergPosition.x;
    });

    let rechtesBein = { x: mhkzwerg.rechtesBein.knie.rotation.x };
    let targetrechtesBein = { x: Math.PI / 4 };
    let tweenrechtesBein = new TWEEN.Tween( rechtesBein )
                    .to( targetrechtesBein, 500 );

    tweenrechtesBein.onUpdate( function(){
        mhkzwerg.rechtesBein.knie.rotation.x = rechtesBein.x;
    });
    
    
    let linkesBein = { x: mhkzwerg.linkesBein.knie.rotation.x };
    let targetlinkesBein = { x: Math.PI / 4 };
    let tweenlinkesBein = new TWEEN.Tween( linkesBein )
                        .to( targetlinkesBein, 500 );
    
                        
    tweenlinkesBein.onUpdate( function(){
        mhkzwerg.linkesBein.knie.rotation.x = linkesBein.x;
    });
    
    let linkesBeinBack = { x: Math.PI / 4 };
    let targetlinkesBeinBack = { x: 0 };
    let tweenlinkesBeinBack = new TWEEN.Tween( linkesBeinBack )
                    .to( targetlinkesBeinBack, 500 );
    
    tweenlinkesBeinBack.onUpdate( function(){
        mhkzwerg.linkesBein.knie.rotation.x = linkesBeinBack.x;
    });

    let rechtesBeinBack = { x: Math.PI / 4 };
    let targetrechtesBeinBack = { x: 0 };
    let tweenrechtesBeinBack = new TWEEN.Tween( rechtesBeinBack )
                    .to( targetrechtesBeinBack, 500 );
    
    tweenrechtesBeinBack.onUpdate( function(){
        mhkzwerg.rechtesBein.knie.rotation.x = rechtesBeinBack.x;
    });

    let figRuecken = { x: mhkzwerg.oberkoerper.rotation.x };
    let targetDucken = { x: Math.PI / 4 };
    let tweenDucken = new TWEEN.Tween( figRuecken )
                    .to( targetDucken, 100 );

    tweenDucken.onUpdate( function(){
        mhkzwerg.oberkoerper.rotation.x = figRuecken.x;
    });

    let oberkoerperPosZ = { z: mhkzwerg.oberkoerper.position.z };
    let targetPosZ = { z: mhkzwerg.oberkoerper.position.z + 2.5 };
    let tweenPosZ = new TWEEN.Tween( oberkoerperPosZ )
                    .to( targetPosZ, 100 );

    tweenPosZ.onUpdate( function(){
        mhkzwerg.oberkoerper.position.z = oberkoerperPosZ.z;
    });

    let oberkoerperPosY = { y: mhkzwerg.oberkoerper.position.y };
    let targetPosY = { y: mhkzwerg.oberkoerper.position.y - 1 };
    let tweenPosY = new TWEEN.Tween( oberkoerperPosY )
                    .to( targetPosY, 100 );

    tweenPosY.onUpdate( function(){
        mhkzwerg.oberkoerper.position.y = oberkoerperPosY.y;
    });

    mhkzwerg.rechterArm.rotation.x = -Math.PI / 4;
    mhkzwerg.linkerArm.rotation.x = -Math.PI / 4;

    let boxPos = { x: box.position.x };
    let targetBox = { x: box.position.x + playground.quadrat };
    let tweenBox = new TWEEN.Tween( boxPos )
                    .to( targetBox, 1000 );

    tweenBox.onUpdate( function(){
        box.position.x = boxPos.x;
        mhkzwerg.oberkoerper.rotation.x = figRuecken.x;
    });

    tweenDrehen.start();
    tweenKopf.start();
    tweenDrehen.onComplete( function(){
        tweenSchritte.start();
        tweenrechtesBein.start();
        setTimeout(function() {
            tweenlinkesBein.start();
        }, 500 );
    });
    
    tweenlinkesBein.onComplete( function(){
        tweenlinkesBeinBack.start();
    });
    tweenrechtesBein.onComplete( function(){
        tweenrechtesBeinBack.start();
    });
    
    tweenDucken.start();
    tweenPosZ.start();
    tweenPosY.start();
    setTimeout(function() {
        tweenBox.start();
    }, 500 );

    tweenBox.onComplete( function(){
        tweenReset();
    });
    VP.loop.add( TWEEN.update );

    setTimeout(function() {
        const event = new Event( 'tastenFreigeben' );
        document.dispatchEvent( event );
    }, 1400 );
}

const tweenBoxLinks = function( box ){

    let zwergKopf = { y: mhkzwerg.kopf.rotation.y };
    let targetKopf = { y: 0 };
    let tweenKopf = new TWEEN.Tween( zwergKopf )
                    .to( targetKopf, 100 );

    tweenKopf.onUpdate( function(){
        mhkzwerg.kopf.rotation.y = zwergKopf.y;
        });
    
    let zwergDrehen = { y: mhkzwerg.rotation.y };
    let targetDrehen = { y: -Math.PI / 2 };
    let tweenDrehen = new TWEEN.Tween( zwergDrehen )
                    .to( targetDrehen, 400 );

    tweenDrehen.onUpdate( function(){
        mhkzwerg.rotation.y = zwergDrehen.y;
    });

    let zwergPosition = { x: mhkzwerg.position.x };
    let target = { x: mhkzwerg.position.x - playground.quadrat };
    let tweenSchritte = new TWEEN.Tween( zwergPosition )
                    .to( target, 1000 );

    tweenSchritte.onUpdate( function(){
    mhkzwerg.position.x = zwergPosition.x;
    });

    let rechtesBein = { x: mhkzwerg.rechtesBein.knie.rotation.x };
    let targetrechtesBein = { x: Math.PI / 4 };
    let tweenrechtesBein = new TWEEN.Tween( rechtesBein )
                    .to( targetrechtesBein, 500 );

    tweenrechtesBein.onUpdate( function(){
        mhkzwerg.rechtesBein.knie.rotation.x = rechtesBein.x;
    });
    
    
    let linkesBein = { x: mhkzwerg.linkesBein.knie.rotation.x };
    let targetlinkesBein = { x: Math.PI / 4 };
    let tweenlinkesBein = new TWEEN.Tween( linkesBein )
                        .to( targetlinkesBein, 500 );
    
                        
    tweenlinkesBein.onUpdate( function(){
        mhkzwerg.linkesBein.knie.rotation.x = linkesBein.x;
    });
    
    let linkesBeinBack = { x: Math.PI / 4 };
    let targetlinkesBeinBack = { x: 0 };
    let tweenlinkesBeinBack = new TWEEN.Tween( linkesBeinBack )
                    .to( targetlinkesBeinBack, 500 );
    
    tweenlinkesBeinBack.onUpdate( function(){
        mhkzwerg.linkesBein.knie.rotation.x = linkesBeinBack.x;
    });

    let rechtesBeinBack = { x: Math.PI / 4 };
    let targetrechtesBeinBack = { x: 0 };
    let tweenrechtesBeinBack = new TWEEN.Tween( rechtesBeinBack )
                    .to( targetrechtesBeinBack, 500 );
    
    tweenrechtesBeinBack.onUpdate( function(){
        mhkzwerg.rechtesBein.knie.rotation.x = rechtesBeinBack.x;
    });

    let figRuecken = { x: mhkzwerg.oberkoerper.rotation.x };
    let targetDucken = { x: Math.PI / 4 };
    let tweenDucken = new TWEEN.Tween( figRuecken )
                    .to( targetDucken, 100 );

    tweenDucken.onUpdate( function(){
        mhkzwerg.oberkoerper.rotation.x = figRuecken.x;
    });

    let oberkoerperPosZ = { z: mhkzwerg.oberkoerper.position.z };
    let targetPosZ = { z: mhkzwerg.oberkoerper.position.z + 2.5 };
    let tweenPosZ = new TWEEN.Tween( oberkoerperPosZ )
                    .to( targetPosZ, 100 );

    tweenPosZ.onUpdate( function(){
        mhkzwerg.oberkoerper.position.z = oberkoerperPosZ.z;
    });

    let oberkoerperPosY = { y: mhkzwerg.oberkoerper.position.y };
    let targetPosY = { y: mhkzwerg.oberkoerper.position.y - 1 };
    let tweenPosY = new TWEEN.Tween( oberkoerperPosY )
                    .to( targetPosY, 100 );

    tweenPosY.onUpdate( function(){
        mhkzwerg.oberkoerper.position.y = oberkoerperPosY.y;
    });

    mhkzwerg.rechterArm.rotation.x = -Math.PI / 4;
    mhkzwerg.linkerArm.rotation.x = -Math.PI / 4;

    let boxPos = { x: box.position.x };
    let targetBox = { x: box.position.x - playground.quadrat };
    let tweenBox = new TWEEN.Tween( boxPos )
                    .to( targetBox, 1000 );

    tweenBox.onUpdate( function(){
        box.position.x = boxPos.x;
        mhkzwerg.oberkoerper.rotation.x = figRuecken.x;
    });

    tweenDrehen.start();
    tweenKopf.start();
    tweenDrehen.onComplete( function(){
        tweenSchritte.start();
        tweenrechtesBein.start();
        setTimeout(function() {
            tweenlinkesBein.start();
        }, 500 );
    });
    
    tweenlinkesBein.onComplete( function(){
        tweenlinkesBeinBack.start();
    });
    tweenrechtesBein.onComplete( function(){
        tweenrechtesBeinBack.start();
    });
    
    tweenDucken.start();
    tweenPosY.start();
    tweenPosZ.start();
    setTimeout(function() {
        tweenBox.start();
    }, 500 );

    tweenBox.onComplete( function(){
        tweenReset();
    });
    VP.loop.add( TWEEN.update );

    setTimeout(function() {
        const event = new Event( 'tastenFreigeben' );
        document.dispatchEvent( event );
    }, 1400 );
}

const tweenBoxUnten = function( box ){
    let zwergKopf = { y: mhkzwerg.kopf.rotation.y };
    let targetKopf = { y: 0 };
    let tweenKopf = new TWEEN.Tween( zwergKopf )
                    .to( targetKopf, 100 );

    tweenKopf.onUpdate( function(){
        mhkzwerg.kopf.rotation.y = zwergKopf.y;
        });
    
    let zwergDrehen = { y: mhkzwerg.rotation.y };
    let targetDrehen = { y: 0 };
    let tweenDrehen = new TWEEN.Tween( zwergDrehen )
                    .to( targetDrehen, 400 );

    tweenDrehen.onUpdate( function(){
        mhkzwerg.rotation.y = zwergDrehen.y;
    });

    let zwergPosition = { z: mhkzwerg.position.z };
    let target = { z: mhkzwerg.position.z + playground.quadrat };
    let tweenSchritte = new TWEEN.Tween( zwergPosition )
                    .to( target, 1000 );

    tweenSchritte.onUpdate( function(){
    mhkzwerg.position.z = zwergPosition.z;
    });

    let rechtesBein = { x: mhkzwerg.rechtesBein.knie.rotation.x };
    let targetrechtesBein = { x: Math.PI / 4 };
    let tweenrechtesBein = new TWEEN.Tween( rechtesBein )
                    .to( targetrechtesBein, 500 );

    tweenrechtesBein.onUpdate( function(){
        mhkzwerg.rechtesBein.knie.rotation.x = rechtesBein.x;
    });
    
    
    let linkesBein = { x: mhkzwerg.linkesBein.knie.rotation.x };
    let targetlinkesBein = { x: Math.PI / 4 };
    let tweenlinkesBein = new TWEEN.Tween( linkesBein )
                        .to( targetlinkesBein, 500 );
    
                        
    tweenlinkesBein.onUpdate( function(){
        mhkzwerg.linkesBein.knie.rotation.x = linkesBein.x;
    });
    
    let linkesBeinBack = { x: Math.PI / 4 };
    let targetlinkesBeinBack = { x: 0 };
    let tweenlinkesBeinBack = new TWEEN.Tween( linkesBeinBack )
                    .to( targetlinkesBeinBack, 500 );
    
    tweenlinkesBeinBack.onUpdate( function(){
        mhkzwerg.linkesBein.knie.rotation.x = linkesBeinBack.x;
    });

    let rechtesBeinBack = { x: Math.PI / 4 };
    let targetrechtesBeinBack = { x: 0 };
    let tweenrechtesBeinBack = new TWEEN.Tween( rechtesBeinBack )
                    .to( targetrechtesBeinBack, 500 );
    
    tweenrechtesBeinBack.onUpdate( function(){
        mhkzwerg.rechtesBein.knie.rotation.x = rechtesBeinBack.x;
    });

    let figRuecken = { x: mhkzwerg.oberkoerper.rotation.x };
    let targetDucken = { x: Math.PI / 4 };
    let tweenDucken = new TWEEN.Tween( figRuecken )
                    .to( targetDucken, 100 );

    tweenDucken.onUpdate( function(){
        mhkzwerg.oberkoerper.rotation.x = figRuecken.x;
    });

    let oberkoerperPosZ = { z: mhkzwerg.oberkoerper.position.z };
    let targetPosZ = { z: mhkzwerg.oberkoerper.position.z + 2.5 };
    let tweenPosZ = new TWEEN.Tween( oberkoerperPosZ )
                    .to( targetPosZ, 100 );

    tweenPosZ.onUpdate( function(){
        mhkzwerg.oberkoerper.position.z = oberkoerperPosZ.z;
    });

    let oberkoerperPosY = { y: mhkzwerg.oberkoerper.position.y };
    let targetPosY = { y: mhkzwerg.oberkoerper.position.y - 1 };
    let tweenPosY = new TWEEN.Tween( oberkoerperPosY )
                    .to( targetPosY, 100 );

    tweenPosY.onUpdate( function(){
        mhkzwerg.oberkoerper.position.y = oberkoerperPosY.y;
    });

    mhkzwerg.rechterArm.rotation.x = -Math.PI / 4;
    mhkzwerg.linkerArm.rotation.x = -Math.PI / 4;

    let boxPos = { z: box.position.z };
    let targetBox = { z: box.position.z + playground.quadrat };
    let tweenBox = new TWEEN.Tween( boxPos )
                    .to( targetBox, 1000 );

    tweenBox.onUpdate( function(){
        box.position.z = boxPos.z;
        mhkzwerg.oberkoerper.rotation.x = figRuecken.x;
    });

    tweenDrehen.start();
    tweenKopf.start();
    tweenDrehen.onComplete( function(){
        tweenSchritte.start();
        tweenrechtesBein.start();
        setTimeout(function() {
            tweenlinkesBein.start();
        }, 500 );
    });
    
    tweenlinkesBein.onComplete( function(){
        tweenlinkesBeinBack.start();
    });
    tweenrechtesBein.onComplete( function(){
        tweenrechtesBeinBack.start();
    });
    
    tweenDucken.start();
    tweenPosZ.start();
    tweenPosY.start();
    setTimeout(function() {
        tweenBox.start();
    }, 500 );

    tweenBox.onComplete( function(){
        tweenReset();
    });
    VP.loop.add( TWEEN.update );

    setTimeout(function() {
        const event = new Event( 'tastenFreigeben' );
        document.dispatchEvent( event );
    }, 1400 );
}

const tweenBoxOben = function( box ){
    let zwergKopf = { y: mhkzwerg.kopf.rotation.y };
    let targetKopf = { y: Math.PI / 4 };
    let tweenKopf = new TWEEN.Tween( zwergKopf )
                    .to( targetKopf, 100 );

    tweenKopf.onUpdate( function(){
        mhkzwerg.kopf.rotation.y = zwergKopf.y;
        });
    
    let zwergDrehen = { y: mhkzwerg.rotation.y };
    let targetDrehen = { y: 0 };
    let tweenDrehen = new TWEEN.Tween( zwergDrehen )
                    .to( targetDrehen, 400 );

    tweenDrehen.onUpdate( function(){
        mhkzwerg.rotation.y = zwergDrehen.y;
    });

    let zwergPosition = { z: mhkzwerg.position.z };
    let target = { z: mhkzwerg.position.z - playground.quadrat };
    let tweenSchritte = new TWEEN.Tween( zwergPosition )
                    .to( target, 1000 );

    tweenSchritte.onUpdate( function(){
        mhkzwerg.position.z = zwergPosition.z;
    });

    let rechtesBein = { x: mhkzwerg.rechtesBein.knie.rotation.x };
    let targetrechtesBein = { x: Math.PI / 4 };
    let tweenrechtesBein = new TWEEN.Tween( rechtesBein )
                    .to( targetrechtesBein, 500 );

    tweenrechtesBein.onUpdate( function(){
        mhkzwerg.rechtesBein.knie.rotation.x = rechtesBein.x;
    });
    
    
    let linkesBein = { x: mhkzwerg.linkesBein.knie.rotation.x };
    let targetlinkesBein = { x: Math.PI / 4 };
    let tweenlinkesBein = new TWEEN.Tween( linkesBein )
                        .to( targetlinkesBein, 500 );
    
                        
    tweenlinkesBein.onUpdate( function(){
        mhkzwerg.linkesBein.knie.rotation.x = linkesBein.x;
    });
    
    let linkesBeinBack = { x: Math.PI / 4 };
    let targetlinkesBeinBack = { x: 0 };
    let tweenlinkesBeinBack = new TWEEN.Tween( linkesBeinBack )
                    .to( targetlinkesBeinBack, 500 );
    
    tweenlinkesBeinBack.onUpdate( function(){
        mhkzwerg.linkesBein.knie.rotation.x = linkesBeinBack.x;
    });

    let rechtesBeinBack = { x: Math.PI / 4 };
    let targetrechtesBeinBack = { x: 0 };
    let tweenrechtesBeinBack = new TWEEN.Tween( rechtesBeinBack )
                    .to( targetrechtesBeinBack, 500 );
    
    tweenrechtesBeinBack.onUpdate( function(){
        mhkzwerg.rechtesBein.knie.rotation.x = rechtesBeinBack.x;
    });

    let figRuecken = { x: mhkzwerg.oberkoerper.rotation.x };
    let targetDucken = { x: Math.PI / 4 };
    let tweenDucken = new TWEEN.Tween( figRuecken )
                    .to( targetDucken, 100 );

    tweenDucken.onUpdate( function(){
        mhkzwerg.oberkoerper.rotation.x = figRuecken.x;
    });

    let oberkoerperPosZ = { z: mhkzwerg.oberkoerper.position.z };
    let targetPosZ = { z: mhkzwerg.oberkoerper.position.z + 2.5 };
    let tweenPosZ = new TWEEN.Tween( oberkoerperPosZ )
                    .to( targetPosZ, 100 );

    tweenPosZ.onUpdate( function(){
        mhkzwerg.oberkoerper.position.z = oberkoerperPosZ.z;
    });

    let oberkoerperPosY = { y: mhkzwerg.oberkoerper.position.y };
    let targetPosY = { y: mhkzwerg.oberkoerper.position.y - 1 };
    let tweenPosY = new TWEEN.Tween( oberkoerperPosY )
                    .to( targetPosY, 100 );

    tweenPosY.onUpdate( function(){
        mhkzwerg.oberkoerper.position.y = oberkoerperPosY.y;
    });

    mhkzwerg.rechterArm.rotation.x = -Math.PI / 4;
    mhkzwerg.linkerArm.rotation.x = -Math.PI / 4;

    let boxPos = { z: box.position.z };
    let targetBox = { z: box.position.z - playground.quadrat };
    let tweenBox = new TWEEN.Tween( boxPos )
                    .to( targetBox, 1000 );

    tweenBox.onUpdate( function(){
        box.position.z = boxPos.z;
        mhkzwerg.oberkoerper.rotation.x = figRuecken.x;
    });

    tweenDrehen.start();
    tweenKopf.start();
    tweenDrehen.onComplete( function(){
        tweenSchritte.start();
        tweenrechtesBein.start();
        setTimeout(function() {
            tweenlinkesBein.start();
        }, 500 );
    });
    
    tweenlinkesBein.onComplete( function(){
        tweenlinkesBeinBack.start();
    });
    tweenrechtesBein.onComplete( function(){
        tweenrechtesBeinBack.start();
    });
    
    tweenDucken.start();
    tweenPosZ.start();
    tweenPosY.start();
    setTimeout(function() {
        tweenBox.start();
    }, 500 );

    tweenBox.onComplete( function(){
        tweenReset();
        mhkzwerg.kopf.rotation.y = 0;
    });
    VP.loop.add( TWEEN.update );

    setTimeout(function() {
        const event = new Event( 'tastenFreigeben' );
        document.dispatchEvent( event );
    }, 1400 );
}

const tweenJubeln = function(){
    let rechterArm = { x: mhkzwerg.rechterArm.rotation.x };
    let targetrechterArm = { x: -Math.PI };
    let tweenArm = new TWEEN.Tween( rechterArm )
                    .to( targetrechterArm, 250 );

    tweenArm.onUpdate( function(){
        mhkzwerg.rechterArm.rotation.x = rechterArm.x;
    });

    let linkerArm = { x: mhkzwerg.linkerArm.rotation.x };
    let targetlinkerArm = { x: -Math.PI };
    let tweenlinkerArm = new TWEEN.Tween( linkerArm )
                        .to( targetlinkerArm, 250 );
         
    tweenlinkerArm.onUpdate( function(){
        mhkzwerg.linkerArm.rotation.x = linkerArm.x;
    });

    tweenArm.start();
    tweenlinkerArm.start();
    VP.loop.add( TWEEN.update );

}

const tweenGehen = function(){
    let rechterArm = { x: mhkzwerg.rechterArm.rotation.x };
    let targetrechterArm = { x: -Math.PI / 2 };
    let tweenArm = new TWEEN.Tween( rechterArm )
                    .to( targetrechterArm, 500 );

    tweenArm.onUpdate( function(){
        mhkzwerg.rechterArm.rotation.x = rechterArm.x;
    });
    
    
    let linkerArm = { x: mhkzwerg.linkerArm.rotation.x };
    let targetlinkerArm = { x: -Math.PI / 2 };
    let tweenlinkerArm = new TWEEN.Tween( linkerArm )
                        .to( targetlinkerArm, 500 );
    
                        
    tweenlinkerArm.onUpdate( function(){
        mhkzwerg.linkerArm.rotation.x = linkerArm.x;
    });
    
    let linkerArmBack = { x: -Math.PI / 2 };
    let targetlinkerArmBack = { x: 0 };
    let tweenArmback = new TWEEN.Tween( linkerArmBack )
                    .to( targetlinkerArmBack, 500 );
    
    tweenArmback.onUpdate( function(){
        mhkzwerg.linkerArm.rotation.x = linkerArmBack.x;
    });

    let rechterArmBack = { x: -Math.PI / 2 };
    let targetrechterArmBack = { x: 0 };
    let tweenrechterArmBack = new TWEEN.Tween( rechterArmBack )
                    .to( targetrechterArmBack, 500 );
    
    tweenrechterArmBack.onUpdate( function(){
        mhkzwerg.rechterArm.rotation.x = rechterArmBack.x;
    });

    let rechtesBein = { x: mhkzwerg.rechtesBein.knie.rotation.x };
    let targetrechtesBein = { x: Math.PI / 4 };
    let tweenrechtesBein = new TWEEN.Tween( rechtesBein )
                    .to( targetrechtesBein, 500 );

    tweenrechtesBein.onUpdate( function(){
        mhkzwerg.rechtesBein.knie.rotation.x = rechtesBein.x;
    });
    
    
    let linkesBein = { x: mhkzwerg.linkesBein.knie.rotation.x };
    let targetlinkesBein = { x: Math.PI / 4 };
    let tweenlinkesBein = new TWEEN.Tween( linkesBein )
                        .to( targetlinkesBein, 500 );
    
                        
    tweenlinkesBein.onUpdate( function(){
        mhkzwerg.linkesBein.knie.rotation.x = linkesBein.x;
    });
    
    let linkesBeinBack = { x: Math.PI / 4 };
    let targetlinkesBeinBack = { x: 0 };
    let tweenlinkesBeinBack = new TWEEN.Tween( linkesBeinBack )
                    .to( targetlinkesBeinBack, 500 );
    
    tweenlinkesBeinBack.onUpdate( function(){
        mhkzwerg.linkesBein.knie.rotation.x = linkesBeinBack.x;
    });

    let rechtesBeinBack = { x: Math.PI / 4 };
    let targetrechtesBeinBack = { x: 0 };
    let tweenrechtesBeinBack = new TWEEN.Tween( rechtesBeinBack )
                    .to( targetrechtesBeinBack, 500 );
    
    tweenrechtesBeinBack.onUpdate( function(){
        mhkzwerg.rechtesBein.knie.rotation.x = rechtesBeinBack.x;
    });

    tweenArm.start();
    tweenrechtesBein.start();
    setTimeout(function() {
        tweenlinkerArm.start();
        tweenlinkesBein.start();
    }, 500 );

    tweenlinkerArm.onComplete( function(){
        tweenArmback.start();
    });
    tweenArm.onComplete( function(){
        tweenrechterArmBack.start();
    });
    tweenlinkesBein.onComplete( function(){
        tweenlinkesBeinBack.start();
    });
    tweenrechtesBein.onComplete( function(){
        tweenrechtesBeinBack.start();
    });
    VP.loop.add( TWEEN.update );
}


const tweenMoveRight = function(){

    let zwergKopf = { y: mhkzwerg.kopf.rotation.y };
    let targetKopf = { y: 0 };
    let tweenKopf = new TWEEN.Tween( zwergKopf )
                    .to( targetKopf, 100 );

    tweenKopf.onUpdate( function(){
        mhkzwerg.kopf.rotation.y = zwergKopf.y;
        });
    

    let zwergDrehen = { y: mhkzwerg.rotation.y };
    let targetDrehen = { y: Math.PI / 2 };
    let tweenDrehen = new TWEEN.Tween( zwergDrehen )
                    .to( targetDrehen, 400 );

    tweenDrehen.onUpdate( function(){
        mhkzwerg.rotation.y = zwergDrehen.y;
    });
    
    let zwergPosition = { x: mhkzwerg.position.x };
    let target = { x: mhkzwerg.position.x + playground.quadrat };
    let tweenSchritte = new TWEEN.Tween( zwergPosition )
                    .to( target, 1000 );

    tweenSchritte.onUpdate( function(){
        mhkzwerg.position.x = zwergPosition.x;
    });

    tweenDrehen.start();
    tweenKopf.start();
    tweenDrehen.onComplete( function(){
        tweenGehen();
        tweenSchritte.start();
    });
    VP.loop.add( TWEEN.update );

    setTimeout(function() {
        const event = new Event( 'tastenFreigeben' );
        document.dispatchEvent( event );
    }, 1400 );
}

const tweenMoveLeft = function(){
    let zwergKopf = { y: mhkzwerg.kopf.rotation.y };
    let targetKopf = { y: 0 };
    let tweenKopf = new TWEEN.Tween( zwergKopf )
                    .to( targetKopf, 100 );

    tweenKopf.onUpdate( function(){
        mhkzwerg.kopf.rotation.y = zwergKopf.y;
        });
    
    let zwergDrehen = { y: mhkzwerg.rotation.y };
    let targetDrehen = { y: -Math.PI / 2 };
    let tweenDrehen = new TWEEN.Tween( zwergDrehen )
                    .to( targetDrehen, 400 );

    tweenDrehen.onUpdate( function(){
        mhkzwerg.rotation.y = zwergDrehen.y;
    });

    let zwergPosition = { x: mhkzwerg.position.x };
    let target = { x: mhkzwerg.position.x - playground.quadrat };
    let tweenSchritte = new TWEEN.Tween( zwergPosition )
                    .to( target, 1000 );

    tweenSchritte.onUpdate( function(){
    mhkzwerg.position.x = zwergPosition.x;
    });

    tweenDrehen.start();
    tweenKopf.start();
    tweenDrehen.onComplete( function(){
        tweenGehen();
        tweenSchritte.start();
    });
    VP.loop.add( TWEEN.update );

    setTimeout(function() {
        const event = new Event( 'tastenFreigeben' );
        document.dispatchEvent( event );
    }, 1400 );
}

const tweenMoveUp = function(){
    let zwergKopf = { y: mhkzwerg.kopf.rotation.y };
    let targetKopf = { y: Math.PI / 4 };
    let tweenKopf = new TWEEN.Tween( zwergKopf )
                    .to( targetKopf, 100 );

    tweenKopf.onUpdate( function(){
        mhkzwerg.kopf.rotation.y = zwergKopf.y;
        });
    
    let zwergDrehen = { y: mhkzwerg.rotation.y };
    let targetDrehen = { y: 0 };
    let tweenDrehen = new TWEEN.Tween( zwergDrehen )
                    .to( targetDrehen, 400 );

    tweenDrehen.onUpdate( function(){
        mhkzwerg.rotation.y = zwergDrehen.y;
    });
    
    let zwergPosition = { z: mhkzwerg.position.z };
    let target = { z: mhkzwerg.position.z - playground.quadrat };
    let tweenSchritte = new TWEEN.Tween( zwergPosition )
                    .to( target, 1000 );

    tweenSchritte.onUpdate( function(){
    mhkzwerg.position.z = zwergPosition.z;
    });

    tweenDrehen.start();
    tweenKopf.start();
    tweenDrehen.onComplete( function(){
        tweenGehen();
        tweenSchritte.start();
    });
    VP.loop.add( TWEEN.update );

    setTimeout(function() {
        const event = new Event( 'tastenFreigeben' );
        document.dispatchEvent( event );
    }, 1400 );
}

const tweenMoveDown = function(){
    let zwergKopf = { y: mhkzwerg.kopf.rotation.y };
    let targetKopf = { y: 0 };
    let tweenKopf = new TWEEN.Tween( zwergKopf )
                    .to( targetKopf, 100 );

    tweenKopf.onUpdate( function(){
        mhkzwerg.kopf.rotation.y = zwergKopf.y;
        });
    
    let zwergDrehen = { y: mhkzwerg.rotation.y };
    let targetDrehen = { y: 0 };
    let tweenDrehen = new TWEEN.Tween( zwergDrehen )
                    .to( targetDrehen, 400 );

    tweenDrehen.onUpdate( function(){
        mhkzwerg.rotation.y = zwergDrehen.y;
    });

    let zwergPosition = { z: mhkzwerg.position.z };
    let target = { z: mhkzwerg.position.z + playground.quadrat };
    let tweenSchritte = new TWEEN.Tween( zwergPosition )
                    .to( target, 1000 );

    tweenSchritte.onUpdate( function(){
    mhkzwerg.position.z = zwergPosition.z;
    });

    tweenDrehen.start();
    tweenKopf.start();
    tweenDrehen.onComplete( function(){
        tweenGehen();
        tweenSchritte.start();
    });
    VP.loop.add( TWEEN.update );

    setTimeout(function() {
        const event = new Event( 'tastenFreigeben' );
        document.dispatchEvent( event );
    }, 1400 );
}


const rasterBauen = function(){
    for( let i = 0; i < playground.zeilen; i++ ){
        let kMax = raster[i].length;
        for( let k = 0; k < kMax; k++ ){
            if( raster[i][k] === undefined ){
                continue;
            } 
            const boden = new Boden();
            playground.boden.push( boden );
            boden.position.set( k * playground.quadrat + playground.quadrat / 2, 0, i * playground.quadrat + playground.quadrat / 2 );
            VP.scene.add( boden );
            
            if( raster[i][k] == 1 ){
                const wall = new Wand({ height: 30 });
                wall.position.set( k * playground.quadrat + playground.quadrat / 2, 17, i * playground.quadrat + playground.quadrat / 2 );
                playground.wand.push( wall );
                
                VP.scene.add( wall );
            }
            else if( raster[i][k] == 2 ){
                mhkzwerg.position.set( k * playground.quadrat + playground.quadrat / 2, 130, i * playground.quadrat + playground.quadrat / 2 );
                mhkzwerg.rotation.z = 0;
                playground.position = new THREE.Vector3( k * playground.quadrat + playground.quadrat / 2, 130, i * playground.quadrat + playground.quadrat / 2 );
                raster[i][k] = 0;
            }
            else if( raster[i][k] == 3 ){
                const b = new Box( { width: 80, height: 80, depth: 80 } );
                b.rasterPosition.set( i, k );
                playground.boxen.push( b );
                b.position.set( k * playground.quadrat + playground.quadrat / 2, 40, i * playground.quadrat + playground.quadrat / 2 );
                VP.scene.add( b );
            }
            else if( raster[i][k] == 4 ){
                const ziel = new Zielfeld();
                playground.zielfeld.push( ziel );
                ziel.position.set( k * playground.quadrat + playground.quadrat / 2, 0.5, i * playground.quadrat + playground.quadrat / 2 );
                VP.scene.add( ziel );
            }
            else if( raster[i][k] == 5 ){
                const ziel2 = new Zielfeld();
                playground.zielfeld.push( ziel2 );
                ziel2.position.set( k * playground.quadrat + playground.quadrat / 2, 0.5, i * playground.quadrat + playground.quadrat / 2 );
                VP.scene.add( ziel2 );
                
                const box = new Box( { width: 80, height: 80, depth: 80 } );
                box.rasterPosition.set( i, k );
                playground.boxen.push( box );
                box.position.set( k * playground.quadrat + playground.quadrat / 2, 40, i * playground.quadrat + playground.quadrat / 2 );
                box.material = textures.donematerial;
                raster[i][k] = 3;
                VP.scene.add( box );
            }
        }
    }
}

const holdirRaster = function( ev ) {
    alleLevel = ev.detail.raster;
    ui.addButton( alleLevel.length );
    ui.initialisierung();
    ui.setInactive();
    ui.registerEvents();
    ui.levelComplete();
}


const setZwergStandort = function(){
    let target = new THREE.Vector3();
    mhkzwerg.getWorldPosition( target );
    playground.position = target;
    playground.searchStandort();

    for( let i = 0; i < playground.boxen.length; i++ ){
        if( playground.boxen[i].material == textures.donematerial ){
            continue;
        }
        else{
            toggleTasten();
            return;
        }
    }

    setTimeout(function() {
        levelErfolgreich();
    }, 2000);
}


const toggleTasten = function() {
    if( toggleTaste ){
        toggleTaste = false;
    } else {
        toggleTaste = true;
    }
}

const loadLevelClicked = function(ev){
    document.getElementById( "start" ).style.visibility = 'hidden';
    level = ev.detail.levelClicked;
    nextLevel();
    ui.registerEvents();
}

const startGame = function(){
    level = 1;
    nextLevel();
}

const continueGame = function(){
    level = myStorage.getItem( 'highestLevel' );
    nextLevel();
}


const weiterClicked = function(){
    level = parseInt( level ) + 1;
    nextLevel();
}

const resetGame = function(){
    myStorage.clear();
    level = 1;
}

const initialisierung = function(){
    document.addEventListener( 'rasterReady', holdirRaster );
    document.addEventListener( 'levelErfolgreich', afterLevel );
    document.addEventListener( 'tastenFreigeben', setZwergStandort );
    document.addEventListener( 'buttonClicked', loadLevelClicked );
    document.addEventListener( 'weiterClicked', weiterClicked );
    document.addEventListener( 'startClicked', startGame );
    document.addEventListener( 'fortsetzenClicked', continueGame );
    document.addEventListener( 'resetClicked', resetGame );
    VP.scene.addEventListener( "click", onclick, true );
    VP.scene.addEventListener( "mouseup", onMouseup, true );
    window.addEventListener( 'keydown', onkeydown );

    level = parseInt( url.searchParams.get("level") || 1 );
    if( level > myStorage.getItem( 'highestLevel' ) ){
        level = 1;
    }

    if( myStorage.getItem( 'highestLevel' )){
        ui.highestLevel = myStorage.getItem( 'highestLevel' );
    } else {
        ui.highestLevel = level;
        myStorage.setItem( 'highestLevel', ui.highestLevel );
    }

    ui.Startseite();    
}

function onMouseup( ev ){
    //Platzhalter
}

function onclick( ev ){
    //while( playground.standortInRasterSpalte != StartpunktSpalte && playground.standortInRasterZeile != StartpunktZeile ){
    //     if( zeilenAbstand < 0 ){
    //         for( let i = StartpunktZeile; i > playground.standortInRasterZeile; i-- ){
    //             if( raster[i][StartpunktSpalte] == 0 ){
    //                 AktuellerStandortZeile = i;
    //                 continue;
    //             } else {
    //                 break;
    //             }
    //        }
    //        if( spaltenAbstand < 0 ){
    //            for( let k = StartpunktSpalte; k > playground.standortInRasterSpalte; k-- ){ 
    //                if( raster[AktuellerStandortZeile][k] == 0 ){
    //                    AktuellerStandortSpalte = k;
    //                    continue;
    //                } else {
    //                    AktuellerStandortZeile += 1;
    //                    k += 1;
    //                }
    //            }
    //        }
    //    }
    //}   

    let StartpunktZeile = playground.standortInRasterZeile;
    let StartpunktSpalte = playground.standortInRasterSpalte;

    playground.position = new THREE.Vector3( ev.intersect.point.x, 130, ev.intersect.point.z  );
    playground.searchStandortCheck();

    if(( StartpunktZeile - playground.clickedStandortZeile ) == -1 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 0 ){
        window.dispatchEvent( new KeyboardEvent('keydown', {
            'key': 'ArrowDown'
        }));
    } else if(( StartpunktZeile - playground.clickedStandortZeile ) == 1 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 0 ){
        window.dispatchEvent( new KeyboardEvent('keydown', {
            'key': 'ArrowUp'
        }));
    } else if(( StartpunktZeile - playground.clickedStandortZeile ) == 0 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 1 ){
        window.dispatchEvent( new KeyboardEvent('keydown', {
            'key': 'ArrowLeft'
        }));
    } else if(( StartpunktZeile - playground.clickedStandortZeile ) == 0 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == -1 ){
        window.dispatchEvent( new KeyboardEvent('keydown', {
            'key': 'ArrowRight'
        }));
    }
   
    //console.log( StartpunktZeile, playground.clickedStandortZeile );
    //console.log( StartpunktSpalte, playground.clickedStandortSpalte );
    //if( raster[playground.clickedStandortZeile][playground.clickedStandortSpalte] == 0 || raster[playground.clickedStandortZeile][playground.clickedStandortSpalte] == 4 ){
    //    if( (( StartpunktZeile - playground.clickedStandortZeile ) == -1 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 0 ) || (( StartpunktZeile - playground.clickedStandortZeile ) == 1 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 0 )){
    //        mhkzwerg.position.set( playground.clickedStandortSpalte * playground.quadrat + 50, 130, playground.clickedStandortZeile * playground.quadrat + 50 );
    //        StartpunktZeile = playground.clickedStandortZeile;
    //        StartpunktSpalte = playground.clickedStandortSpalte;
    //        playground.searchStandort();
    //    } else if( (( StartpunktZeile - playground.clickedStandortZeile ) == 0 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == -1 ) || (( StartpunktZeile - playground.clickedStandortZeile ) == 0 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 1 )){
    //        mhkzwerg.position.set( playground.clickedStandortSpalte * playground.quadrat + 50, 130, playground.clickedStandortZeile * playground.quadrat + 50 );
    //        StartpunktZeile = playground.clickedStandortZeile;
    //        StartpunktSpalte = playground.clickedStandortSpalte;
    //        playground.searchStandort();
    //    }
    //} else if( raster[playground.clickedStandortZeile][playground.clickedStandortSpalte] == 3 ){
    //    //Box einen weiter (größere Differenz von Ausgangsposition und Endposition von x oder y als Richtung der Box-Verschiebung nutzen)
    //    //wenn Box donematerial hat, Position auf 4 ändern
    //    if( (( StartpunktZeile - playground.clickedStandortZeile ) == -1 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 0 ) || (( StartpunktZeile - playground.clickedStandortZeile ) == 1 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 0 )){
    //       for( let i = 0; i < playground.boxen.length; i++ ) {
    //           console.log( playground.boxen[i].rasterPosition.x, playground.boxen[i].rasterPosition.y );
    //            if( playground.boxen[i].rasterPosition.x == playground.clickedStandortZeile && playground.boxen[i].rasterPosition.y == playground.clickedStandortSpalte ){
    //                let moveBox = playground.boxen[i];
    //                if( moveBox.material == textures.donematerial ){
    //                    moveBox.material = textures.matcrate;
    //                    raster[playground.clickedStandortZeile][playground.clickedStandortSpalte] = 4;
    //                }
//
    //                console.log( StartpunktZeile - playground.clickedStandortZeile );
    //                    //In beliebige Richtung verschieben + im Raster ändern
    //                if(( StartpunktZeile - playground.clickedStandortZeile ) < 0 ){
    //                    moveBox.position.z += playground.quadrat;
    //                    moveBox.rasterPosition.x += 1;
//
    //                    if( raster[playground.clickedStandortZeile + 1][playground.clickedStandortSpalte] == 4 ){
    //                        moveBox.material = textures.donematerial;
    //                    }
    //                    raster[playground.clickedStandortZeile][playground.clickedStandortSpalte] = 0;
    //                    raster[playground.clickedStandortZeile + 1][playground.clickedStandortSpalte] = 3;
    //                }
//
    //                if(( StartpunktZeile - playground.clickedStandortZeile ) > 0 ){
    //                    console.log( StartpunktZeile - playground.clickedStandortZeile );
    //                    moveBox.position.z -= playground.quadrat;
    //                    moveBox.rasterPosition.x -= 1;
    //                    raster[playground.clickedStandortZeile - 1][playground.clickedStandortSpalte] = 3;
//
    //                    if( raster[playground.clickedStandortZeile - 1][playground.clickedStandortSpalte] == 4 ){
    //                        moveBox.material = textures.donematerial;
    //                    }
//
    //                    raster[playground.clickedStandortZeile - 1][playground.clickedStandortSpalte] = 3;
    //                }
//
    //                break;
    //            }
    //        }
    //        
    //        mhkzwerg.position.set( playground.clickedStandortSpalte * playground.quadrat + 50, 130, playground.clickedStandortZeile * playground.quadrat + 50 );
    //        StartpunktZeile = playground.clickedStandortZeile;
    //        StartpunktSpalte = playground.clickedStandortSpalte;
    //        playground.searchStandort();
    //    } else if( (( StartpunktZeile - playground.clickedStandortZeile ) == 0 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == -1 ) || (( StartpunktZeile - playground.clickedStandortZeile ) == 0 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 1 )){
    //        mhkzwerg.position.set( playground.clickedStandortSpalte * playground.quadrat + 50, 130, playground.clickedStandortZeile * playground.quadrat + 50 );
    //        StartpunktZeile = playground.clickedStandortZeile;
    //        StartpunktSpalte = playground.clickedStandortSpalte;
    //        playground.searchStandort();
    //    }
    //}
}

const levelAufbau = function(){
    ladeLevel();
    playground.zeilen = raster.length;
    playground.spalten = raster[0].length;
    removeBoxes();
    rasterBauen();
    playground.searchStandort();
    toggleTaste = false;
}

const ladeLevel = function() {
    raster = JSON.parse(JSON.stringify(alleLevel[level - 1]));
}

const nextLevel = function(){
    document.getElementById( "target" ).style.visibility = 'hidden'; 
    document.getElementById("Levelanzeige").innerHTML = "Level " + level;
    mhkzwerg.rechterArm.rotation.x = 0;
    mhkzwerg.linkerArm.rotation.x = 0;
    mhkzwerg.rotation.y = 0;

    if( playground.raster.length >= level ){
        if( ui.highestLevel < level ){
            ui.highestLevel = level;
            myStorage.setItem( 'highestLevel', ui.highestLevel );
        }
        levelAufbau();
    } else {
        alert( "Weitere Level einlesen, lade Level 1 erneut..." );
        level = 1;
        levelAufbau();
    }
    ui.registerEvents();
}

const removeBoxes = function(){ 
    playground.wand.forEach( wand => {
        let dieWand = VP.scene.getObjectByProperty( 'uuid', wand.uuid );
        VP.scene.remove( dieWand );
    });

    playground.boxen.forEach( box => {
        let dieBox = VP.scene.getObjectByProperty( 'uuid', box.uuid );
        VP.scene.remove( dieBox );
    });
    
    playground.zielfeld.forEach( zielfeld => {
        let dasZielfeld = VP.scene.getObjectByProperty( 'uuid', zielfeld.uuid );
        VP.scene.remove( dasZielfeld );
    });

    playground.boden.forEach( boden => {
        let derBoden = VP.scene.getObjectByProperty( 'uuid', boden.uuid );
        VP.scene.remove( derBoden );
    });

    playground.boden = [];
    playground.boxen = [];
    playground.zielfeld = []; 
    playground.wand = []; 

    const event = new Event( 'boxenRemoved' );
    document.dispatchEvent( event );
}

const afterLevel = function(){
    document.getElementById( "target" ).style.visibility = 'visible';
}


const levelErfolgreich = function(){
    tweenJubeln();

    setTimeout(function() {
        const event = new Event( 'levelErfolgreich' );
        document.dispatchEvent( event );
    }, 800);
}

initialisierung();

onkeydown = function( event ){
    if( toggleTaste ){
        return;
    }

    if( event.key == "w" )
    {
        mhkzwerg.position.z += 2;
        mhkzwerg.kopf.rotation.y = 0;
        mhkzwerg.rotation.y = 0;
        mhkzwerg.laufen();
    }
    else if( event.key == "s" )
    {
        mhkzwerg.position.z -= 2;
        mhkzwerg.kopf.rotation.y = Math.PI / 4;
        mhkzwerg.rotation.y = 0;
        mhkzwerg.laufen();
    }
    else if( event.key == "d" )
    {
        mhkzwerg.position.x -= 2;
        mhkzwerg.rotation.y = -Math.PI / 2;
        mhkzwerg.kopf.rotation.y = 0;
        mhkzwerg.laufen();
    }
    else if( event.key == "a" )
    {
        mhkzwerg.position.x += playground.quadrat;
        mhkzwerg.kopf.rotation.y = 0;
        mhkzwerg.rotation.y = Math.PI / 2;
        mhkzwerg.laufen();
    }
    else if( event.key == "ArrowLeft" )
    {
        toggleTaste = true;
        if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 1] == 1 ){
            toggleTaste = false;
            return;
        }
        else if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 1] == 3 ){
            if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 2] == 1 || raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 2] == 3 ){
                return;
            }
            else {
                const vec = new THREE.Vector2( playground.standortInRasterZeile, playground.standortInRasterSpalte - 1);
                
                for( let i = 0; i < playground.boxen.length; i++ ) {
                    if( playground.boxen[i].rasterPosition.x == vec.x && playground.boxen[i].rasterPosition.y == vec.y ){
                        let moveBox = playground.boxen[i];
                        if( moveBox.material == textures.donematerial ){
                            moveBox.material = textures.matcrate;
                            raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 1] = 4;
                        }
                        if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 2] == 4 ){
                            moveBox.material = textures.donematerial;
                        }
                        tweenBoxLinks( moveBox );
                        moveBox.rasterPosition.y -= 1;
                        break;
                    }
                }

                if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte] != 4 ){
                    raster[playground.standortInRasterZeile][playground.standortInRasterSpalte] = 0;
                }

                if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 1] != 4 ){
                    raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 1] = 0;
                }
                raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 2] = 3;
            }
        }
        else{
            tweenMoveLeft();
        }
    }
    else if( event.key == "ArrowRight" )
    {
        toggleTaste = true;
        if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 1] == 1 ){
            toggleTaste = false;
            return;
        }
        else if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 1] == 3 ){
            if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 2] == 1 || raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 2] == 3 ){
                return;
            }
            else {
                const vec = new THREE.Vector2( playground.standortInRasterZeile, playground.standortInRasterSpalte + 1);
                
                for( let i = 0; i < playground.boxen.length; i++ ) {
                    if( playground.boxen[i].rasterPosition.x == vec.x && playground.boxen[i].rasterPosition.y == vec.y ){
                        const moveBox = playground.boxen[i];
                        if( moveBox.material == textures.donematerial ){
                            moveBox.material = textures.matcrate;
                            raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 1] = 4;
                        }
                        if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 2] == 4 ){
                            moveBox.material = textures.donematerial;
                        }
                        tweenBoxRechts( moveBox );
                        moveBox.rasterPosition.y += 1;
                        break;
                    }
                }
                 
                if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte] != 4 ){
                    raster[playground.standortInRasterZeile][playground.standortInRasterSpalte] = 0;
                }
    
                if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 1] != 4 ){
                    raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 1] = 0;
                }
                raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 2] = 3;
            }
        }
        else {
            tweenMoveRight();
        }
    }
    else if( event.key == "ArrowUp" )
    {
        toggleTaste = true;
        if( raster[playground.standortInRasterZeile - 1][playground.standortInRasterSpalte] == 1 ){
            toggleTaste = false;
            return;
        }
        else if( raster[playground.standortInRasterZeile - 1][playground.standortInRasterSpalte] == 3 ){
            if( raster[playground.standortInRasterZeile - 2][playground.standortInRasterSpalte] == 1 || raster[playground.standortInRasterZeile - 2][playground.standortInRasterSpalte] == 3 ){
                return;
            }
            else {
                const vec = new THREE.Vector2( playground.standortInRasterZeile - 1, playground.standortInRasterSpalte );
                
                for( let i = 0; i < playground.boxen.length; i++ ) {
                    if( playground.boxen[i].rasterPosition.x == vec.x && playground.boxen[i].rasterPosition.y == vec.y ){
                        const moveBox = playground.boxen[i];
                        if( moveBox.material == textures.donematerial ){
                            moveBox.material = textures.matcrate;
                            raster[playground.standortInRasterZeile - 1][playground.standortInRasterSpalte] = 4;
                        }
                        if( raster[playground.standortInRasterZeile - 2][playground.standortInRasterSpalte] == 4 ){
                            moveBox.material = textures.donematerial;
                        }
                        tweenBoxOben( moveBox );
                        moveBox.rasterPosition.x -= 1;
                        break;
                    }
                }
        
                if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte] != 4 ){
                    raster[playground.standortInRasterZeile][playground.standortInRasterSpalte] = 0;
                }
    
                if( raster[playground.standortInRasterZeile - 1][playground.standortInRasterSpalte] != 4 ){
                    raster[playground.standortInRasterZeile - 1][playground.standortInRasterSpalte] = 0;
                }
                raster[playground.standortInRasterZeile - 2][playground.standortInRasterSpalte] = 3;
            }
        }
        else{
            tweenMoveUp();

        }
    }
    else if( event.key == "ArrowDown" )
    {
        toggleTaste = true;
        if( raster[playground.standortInRasterZeile + 1][playground.standortInRasterSpalte] == 1 ){
            toggleTaste = false;
            return;
        }
        else if( raster[playground.standortInRasterZeile + 1][playground.standortInRasterSpalte] == 3 ){
            if( raster[playground.standortInRasterZeile + 2][playground.standortInRasterSpalte] == 1 || raster[playground.standortInRasterZeile + 2][playground.standortInRasterSpalte] == 3 ){
                return;
            }
            else {
                const vec = new THREE.Vector2( playground.standortInRasterZeile + 1, playground.standortInRasterSpalte );
                
                for( let i = 0; i < playground.boxen.length; i++ ) {
                    if( playground.boxen[i].rasterPosition.x == vec.x && playground.boxen[i].rasterPosition.y == vec.y ){
                        const moveBox = playground.boxen[i];

                        if( moveBox.material == textures.donematerial ){
                            moveBox.material = textures.matcrate;
                            raster[playground.standortInRasterZeile + 1][playground.standortInRasterSpalte] = 4;
                        }
                        if( raster[playground.standortInRasterZeile + 2][playground.standortInRasterSpalte] == 4 ){
                            moveBox.material = textures.donematerial;
                        }
                        tweenBoxUnten( moveBox );
                        moveBox.rasterPosition.x += 1;
                        break;
                    }
                }

                if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte] != 4 ){
                    raster[playground.standortInRasterZeile][playground.standortInRasterSpalte] = 0;
                }
    
                if( raster[playground.standortInRasterZeile + 1][playground.standortInRasterSpalte] != 4 ){
                    raster[playground.standortInRasterZeile + 1][playground.standortInRasterSpalte] = 0;
                }
            raster[playground.standortInRasterZeile + 2][playground.standortInRasterSpalte] = 3;
            }
        }
        else {
            tweenMoveDown();
        }
    }
}


onkeyup = function( event ){
    if( event.key == "w" || event.key == "w" )
    {
        mhkzwerg.stehen();
    }
    else if( event.key == "s" || event.key == "s" )
    {
        mhkzwerg.stehen();
    }
    else if( event.key == "d" || event.key == "d" )
    {
        mhkzwerg.stehen();
    }
    else if( event.key == "a" || event.key == "a" )
    {
        mhkzwerg.stehen();
    }
}