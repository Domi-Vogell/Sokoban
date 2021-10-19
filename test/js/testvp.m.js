import * as pack from './playground.m.js';
import { Zwerg } from '../../src/zwerg.m.js';
import { Figur } from '../../src/figur.m.js';
import { Spielplatz } from "../../src/raster.m.js";
import { Box } from "../../src/box.m.js";
import { Wand } from '../../src/wand.m.js';
import { Zielfeld } from '../../src/zielfeld.m.js';
import { Textures } from '../../src/textures.m.js';
import { Boden } from '../../src/boden.m.js';
import { myTween } from '../../src/tweens.m.js';
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
const tween = new myTween( VP, playground );



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
    VP.scene.addEventListener( 'click', onclick );
    VP.scene.addEventListener( 'mouseup', onMouseup );
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
    tween.tweenJubeln( mhkzwerg );

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
                        tween.tweenBoxLinks( moveBox, mhkzwerg );
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
            tween.tweenMoveLeft( mhkzwerg );
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
                        tween.tweenBoxRechts( moveBox, mhkzwerg );
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
            tween.tweenMoveRight( mhkzwerg );
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
                        tween.tweenBoxOben( moveBox, mhkzwerg );
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
            tween.tweenMoveUp( mhkzwerg );

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
                        tween.tweenBoxUnten( moveBox, mhkzwerg );
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
            tween.tweenMoveDown( mhkzwerg );
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