import { pack, Zwerg, Spielplatz, Box, Wand, Zielfeld, Textures, Boden, myTween, UI, Audio } from "../../src/import.m.js"

//Parameter-Einlesung
let url = new URL( window.location.href );
let myStorage = localStorage;
let level;

//SZENEN-INITIALISIERUNG
const ui = new UI();
const THREE = pack.THREE;
const VP = new pack.Playground({ grassground: false }).VP;
let audio;
VP.control.enabled = true;
VP.control.target.set( 500, 0, 250 );


let light = new THREE.DirectionalLight( 0xffffff, 0.4 );
light.position.set( 500, 500, 500 );
light.castShadow = true;
light.shadow.camera.near = 0;
light.shadow.camera.far = 1000;
light.shadow.camera.right = 700;
light.shadow.camera.left = - 700;
light.shadow.camera.top	= 700;
light.shadow.camera.bottom = - 700;
light.target.position.set( 250, 0, 0 );
VP.scene.add( light );
VP.scene.add( new THREE.AmbientLight( 0xffffff, 0.6 ));
VP.scene.background.set( 0x404040 );

const textures = new Textures();
let toggleTaste = false;

//FIGUR
const mhkzwerg = new Zwerg({ hutfarbe: 0xFF0000, groesse: 0.8, textur: textures.matFigur });
VP.scene.add( mhkzwerg );

//RASTER
let playground = new Spielplatz();
const tween = new myTween( VP, playground );
let raster = [];
let alleLevel = [];

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
            boden.material.side = THREE.DoubleSide;
            boden.receiveShadow = true;
            VP.scene.add( boden );
            
            if( raster[i][k] == 1 ){
                const wall = new Wand({ height: 35 });
                wall.position.set( k * playground.quadrat + playground.quadrat / 2, 17, i * playground.quadrat + playground.quadrat / 2 );
                wall.receiveShadow = true;
                wall.castShadow = true;
                playground.wand.push( wall );
                VP.scene.add( wall );
            }
            else if( raster[i][k] == 2 ){
                mhkzwerg.position.set( k * playground.quadrat + playground.quadrat / 2, 130, i * playground.quadrat + playground.quadrat / 2 );
                mhkzwerg.rotation.z = 0;
                playground.position = new THREE.Vector3( k * playground.quadrat + playground.quadrat / 2, 130, i * playground.quadrat + playground.quadrat / 2 );
                mhkzwerg.receiveShadow = true;
                mhkzwerg.castShadow = true;
                raster[i][k] = 0;
            }
            else if( raster[i][k] == 3 ){
                const b = new Box({ width: 80, height: 80, depth: 80 });
                b.rasterPosition.set( i, k );
                playground.boxen.push( b );
                b.position.set( k * playground.quadrat + playground.quadrat / 2, 40.5, i * playground.quadrat + playground.quadrat / 2 );
                b.castShadow = true;
                b.receiveShadow = true;
                VP.scene.add( b );
            }
            else if( raster[i][k] == 4 ){
                const ziel = new Zielfeld();
                playground.zielfeld.push( ziel );
                ziel.position.set( k * playground.quadrat + playground.quadrat / 2, 0, i * playground.quadrat + playground.quadrat / 2 );
                ziel.receiveShadow = true;
                VP.scene.add( ziel );
            }
            else if( raster[i][k] == 5 ){
                const ziel2 = new Zielfeld();
                playground.zielfeld.push( ziel2 );
                ziel2.position.set( k * playground.quadrat + playground.quadrat / 2, 0, i * playground.quadrat + playground.quadrat / 2 );
                ziel2.receiveShadow = true;
                VP.scene.add( ziel2 );
                
                const box = new Box({ width: 80, height: 80, depth: 80 });
                box.rasterPosition.set( i, k );
                box.position.set( k * playground.quadrat + playground.quadrat / 2, 40.5, i * playground.quadrat + playground.quadrat / 2 );
                box.receiveShadow = true;
                box.castShadow = true;
                box.material = textures.donematerial;
                raster[i][k] = 3;
                playground.boxen.push( box );
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

    setTimeout( function() {
        levelErfolgreich();
    }, 2000 );
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
    myStorage.removeItem( 'highestLevel' );
    myStorage.removeItem( 'hideAnleitung' );
    level = 1;
}

const cameraOne = function(){
    VP.camera.position.x = 500;
    VP.camera.position.y = 600;
    VP.camera.position.z = 1200;
    VP.camera.lookAt( 500, 0, 250 );
    VP.control.target.set( 500, 0, 250 );
    myStorage.setItem( 'cameraPosition', 1 );
}

const cameraTwo = function(){
    VP.camera.position.x = 500;
    VP.camera.position.y = 1000;
    VP.camera.position.z = 350;
    VP.camera.lookAt( 500, 0, 350 );
    VP.control.target.set( 500, 0, 350 );
    myStorage.setItem( 'cameraPosition', 2 );
}

const initialisierung = function(){
    audio = new Audio( VP );

    document.addEventListener( 'rasterReady'        , holdirRaster      );
    document.addEventListener( 'levelErfolgreich'   , afterLevel        );
    document.addEventListener( 'tastenFreigeben'    , setZwergStandort  );
    document.addEventListener( 'buttonClicked'      , loadLevelClicked  );
    document.addEventListener( 'weiterClicked'      , weiterClicked     );
    document.addEventListener( 'startClicked'       , startGame         );
    document.addEventListener( 'fortsetzenClicked'  , continueGame      );
    document.addEventListener( 'resetClicked'       , resetGame         );
    document.addEventListener( 'cameraOne'          , cameraOne         );
    document.addEventListener( 'cameraTwo'          , cameraTwo         );
    VP.scene.addEventListener( 'click'              , onclick           );
    window.addEventListener  ( 'keydown'            , onkeydown         );

    level = parseInt( url.searchParams.get( "level" ) || 1 );
    if( level > myStorage.getItem( 'highestLevel' ) ){
        level = 1;
    }

    if( myStorage.getItem( 'highestLevel' )){
        ui.highestLevel = myStorage.getItem( 'highestLevel' );
    } else {
        ui.highestLevel = level;
        myStorage.setItem( 'highestLevel', ui.highestLevel );
    }

    if( myStorage.getItem( 'cameraPosition' )){
        if( myStorage.getItem( 'cameraPosition' ) == 1 ){
            cameraOne();
        } else {
            cameraTwo();
        }
    } else {
        myStorage.setItem( 'cameraPosition', 1 );
        cameraOne();
    }
    ui.Startseite();

    ui.anleitungAnzeige();
    ui.Startseite();
    ui.lastLevelCompleted();
}

const initialStart = function(){
    if( myStorage.getItem( 'hideAnleitung' ) == 0 || myStorage.getItem( 'hideAnleitung' ) === null ){
        document.getElementById( "anleitung" ).style.visibility = 'visible';
    } else {
        document.getElementById( "start" ).style.visibility = 'visible';
    }
};


function onclick( ev ){
    let StartpunktZeile = playground.standortInRasterZeile;
    let StartpunktSpalte = playground.standortInRasterSpalte;

    playground.position = new THREE.Vector3( ev.intersect.point.x, 130, ev.intersect.point.z  );
    playground.searchStandortCheck();

    if(( StartpunktZeile - playground.clickedStandortZeile ) == -1 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 0 ){
        window.dispatchEvent( new KeyboardEvent('keyup', {
            'key': 'ArrowDown'
        }));
    } else if(( StartpunktZeile - playground.clickedStandortZeile ) == 1 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 0 ){
        window.dispatchEvent( new KeyboardEvent('keyup', {
            'key': 'ArrowUp'
        }));
    } else if(( StartpunktZeile - playground.clickedStandortZeile ) == 0 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == 1 ){
        window.dispatchEvent( new KeyboardEvent('keyup', {
            'key': 'ArrowLeft'
        }));
    } else if(( StartpunktZeile - playground.clickedStandortZeile ) == 0 && ( StartpunktSpalte - playground.clickedStandortSpalte ) == -1 ){
        window.dispatchEvent( new KeyboardEvent('keyup', {
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
    raster = JSON.parse( JSON.stringify( alleLevel[level - 1] ));
}


const nextLevel = function(){
    document.getElementById( "start" ).style.visibility = 'hidden'; 
    document.getElementById( "Levelanzeige" ).innerHTML = "Level " + level;
    mhkzwerg.rechterArm.rotation.x = 0;
    mhkzwerg.linkerArm.rotation.x = 0;
    mhkzwerg.rotation.y = 0;

    if( playground.raster.length >= level ){
        if( ui.highestLevel < level && playground.raster.length > ui.highestLevel ){
            ui.highestLevel = level;
            myStorage.setItem( 'highestLevel', ui.highestLevel );
        }
        levelAufbau();
    } else {
        document.getElementById( "completed" ).style.visibility = 'visible';
        document.getElementById( "Seitenleiste" ).style.visibility = 'hidden';
        level = 1;
        ui.highestLevel = playground.raster.length;
        myStorage.setItem( 'highestLevel', ui.highestLevel );
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
    audio.sound.play();
}


const levelErfolgreich = function(){
    tween.tweenJubeln( mhkzwerg );

    setTimeout(function() {
        const event = new Event( 'levelErfolgreich' );
        document.dispatchEvent( event );
    }, 800);
}


initialisierung();
initialStart();



onkeyup = function( event ){
    if( toggleTaste ){
        return;
    }

    if( event.key == "ArrowLeft" || event.key == "a" || event.key == "A" )
    {
        toggleTaste = true;
        if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 1] == 1 ){
            toggleTaste = false;
            return;
        }
        else if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 1] == 3 ){
            if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 2] == 1 || raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 2] == 3 ){
                toggleTaste = false;
                return;
            }
            else {
                const vec = new THREE.Vector2( playground.standortInRasterZeile, playground.standortInRasterSpalte - 1 );
                
                for( let i = 0; i < playground.boxen.length; i++ ){
                    if( playground.boxen[i].rasterPosition.x == vec.x && playground.boxen[i].rasterPosition.y == vec.y ){
                        let moveBox = playground.boxen[i];
                        if( moveBox.material == textures.donematerial ){
                            moveBox.material = textures.matcrate;
                            raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 1] = 4;
                        }
                        if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte - 2] == 4 ){
                            setTimeout( function() {
                                moveBox.material = textures.donematerial;
                            }, 1600 );
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
    else if( event.key == "ArrowRight" || event.key == "d" || event.key == "D" )
    {
        toggleTaste = true;
        if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 1] == 1 ){
            toggleTaste = false;
            return;
        }
        else if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 1] == 3 ){
            if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 2] == 1 || raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 2] == 3 ){
                toggleTaste = false;
                return;
            }
            else {
                const vec = new THREE.Vector2( playground.standortInRasterZeile, playground.standortInRasterSpalte + 1 );
                
                for( let i = 0; i < playground.boxen.length; i++ ) {
                    if( playground.boxen[i].rasterPosition.x == vec.x && playground.boxen[i].rasterPosition.y == vec.y ){
                        const moveBox = playground.boxen[i];
                        if( moveBox.material == textures.donematerial ){
                            moveBox.material = textures.matcrate;
                            raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 1] = 4;
                        }
                        if( raster[playground.standortInRasterZeile][playground.standortInRasterSpalte + 2] == 4 ){
                            setTimeout( function() {
                                moveBox.material = textures.donematerial;
                            }, 1600 );
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
    else if( event.key == "ArrowUp" || event.key == "w" || event.key == "W" )
    {
        toggleTaste = true;
        if( raster[playground.standortInRasterZeile - 1][playground.standortInRasterSpalte] == 1 ){
            toggleTaste = false;
            return;
        }
        else if( raster[playground.standortInRasterZeile - 1][playground.standortInRasterSpalte] == 3 ){
            if( raster[playground.standortInRasterZeile - 2][playground.standortInRasterSpalte] == 1 || raster[playground.standortInRasterZeile - 2][playground.standortInRasterSpalte] == 3 ){
                toggleTaste = false;
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
                            setTimeout( function() {
                                moveBox.material = textures.donematerial;
                            }, 1600 );
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
    else if( event.key == "ArrowDown" || event.key == "s" || event.key == "S" )
    {
        toggleTaste = true;
        if( raster[playground.standortInRasterZeile + 1][playground.standortInRasterSpalte] == 1 ){
            toggleTaste = false;
            return;
        }
        else if( raster[playground.standortInRasterZeile + 1][playground.standortInRasterSpalte] == 3 ){
            if( raster[playground.standortInRasterZeile + 2][playground.standortInRasterSpalte] == 1 || raster[playground.standortInRasterZeile + 2][playground.standortInRasterSpalte] == 3 ){
                toggleTaste = false;
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
                            setTimeout( function() {
                                moveBox.material = textures.donematerial;
                            }, 1600 );
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