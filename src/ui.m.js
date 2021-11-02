import { readText } from "./readText.m.js";

const UI = function(){
    const myStorage = localStorage;
    const scope = this;
    this.initialisierung = function(){
        this.allLevels = document.querySelectorAll(".Level");
        scope.highestLevel;
    }

    this.setInactive = function(){
        for( let i = 0; i < this.allLevels.length; i++ ){
            this.allLevels[i].classList.remove( "levelActive" );
            this.allLevels[i].classList.add( "levelInactive" );
            this.allLevels[i].disabled = true;
        }
    };

    this.setActive = function(){
        for( let i = 0; i < this.allLevels.length; i++ ){
            this.allLevels[i].classList.remove( "levelInactive" );
            this.allLevels[i].classList.add( "levelActive" );

        }
    };

    this.registerEvents = function(){
        for( let i = 0; i < scope.highestLevel; i++ ){
            this.allLevels[i].classList.remove( "levelInactive" );
            this.allLevels[i].classList.add( "levelActive" );
            this.allLevels[i].disabled = false;
            this.allLevels[i].onpointerup = this.lvlHandler;
    };

    this.lvlHandler = function( ev ){
        if( this.classList[1] == "levelInactive" ){
            return;
        }

        document.dispatchEvent( new CustomEvent( "buttonClicked", {
            detail: {
                    levelClicked: ev.target.dataset.level
                }
            }));
        }
    };

    this.resetHandler = function( ev ){
        if( document.getElementById( "resetBtn" ).classList[1] == "btnDeaktiv" ){
            return;
        }

        scope.highestLevel = 1;
        scope.setInactive();
        scope.registerEvents();
        document.getElementById( "anleitung" ).style.visibility = 'visible'; 
        document.getElementById( "Seitenleiste" ).style.visibility = 'hidden'; 
        document.getElementById("btnFortsetzen").disabled = true; 
        document.getElementById("btnFortsetzen").classList.remove( "btnAktiv" ); 
        document.getElementById("btnFortsetzen").classList.add( "btnDeaktiv" ); 

        document.getElementById( "resetBtn" ).classList.remove( "btnAktiv" ); 
        document.getElementById( "resetBtn" ).classList.add( "btnDeaktiv" ); 
        document.getElementById( "resetBtn" ).disabled = true; 

        document.getElementById( 'btnHide' ).classList.remove( "btnDeaktiv" );
        document.getElementById( 'btnHide' ).classList.add( "btnAktiv" );
    

        const event = new Event( 'resetClicked' );
        document.dispatchEvent( event );
    };

    this.continueHandler = function( ev ){
        document.getElementById( "resetBtn" ).classList.remove( "btnDeaktiv" ); 
        document.getElementById( "resetBtn" ).classList.add( "btnAktiv" );
        document.getElementById( "target" ).style.visibility = 'hidden';
        document.getElementById( "resetBtn" ).disabled = false; 

        const event = new Event( 'weiterClicked' );
        document.dispatchEvent( event );
    };

    this.levelComplete = function(){
        let newDiv = document.createElement("div");
        newDiv.id = "target";
        let newParagraph = document.createElement("p");
        newParagraph.id = "completePara";
        let newContent = document.createTextNode("Level geschafft!");
        let newWeiterButton = document.createElement("button");
        newWeiterButton.textContent = "Weiter";
        newWeiterButton.id = "weiter";
        newWeiterButton.classList.add( "btnAktiv" );
        newWeiterButton.onpointerup = this.continueHandler;

        newParagraph.appendChild(newContent);
        newDiv.appendChild(newParagraph);
        newDiv.appendChild(newWeiterButton);
        var style = document.createElement('style');
        style.innerHTML = `
        #target {
            color: white;
            width: 40vw;
            height: 40vh;
            border: solid grey;
            text-align: center;
            background-color: #333333;
            left: 18%;
            top: 25%;
            position: absolute;
        }
        #completePara{
            font-size: 40px;
            margin-top: 20%;
        }
        `;
        document.head.appendChild(style);

        // füge das neu erstellte Element und seinen Inhalt ins DOM ein
        var currentDiv = document.getElementById("Seitenleiste");
        document.body.insertBefore(newDiv, currentDiv);
        document.getElementById( "target" ).style.visibility = 'hidden';
    };

    this.startHandler = function( ev ){
        document.getElementById( "start" ).style.visibility = 'hidden'; 
        document.getElementById( "Seitenleiste" ).style.visibility = 'visible'; 
        document.getElementById( "menuBtn" ).classList.add( "btnAktiv" ); 

        if( scope.highestLevel > 1){
            document.getElementById( "resetBtn" ).classList.remove( "btnDeaktiv" ); 
            document.getElementById( "resetBtn" ).classList.add( "btnAktiv" ); 
            document.getElementById( "resetBtn" ).disabled = false; 
        } else {
            document.getElementById( "resetBtn" ).classList.remove( "btnAktiv" ); 
            document.getElementById( "resetBtn" ).classList.add( "btnDeaktiv" ); 
            document.getElementById( "resetBtn" ).disabled = true; 
        }

        const event = new Event( 'startClicked' );
        document.dispatchEvent( event );
    };


    this.fortsetzenHandler = function( ev ){
        if( document.getElementById( "btnFortsetzen" ).classList == "btnDeaktiv" ){
            return;
        }

        console.log( document.getElementById( "start" ));

        document.getElementById( "start" ).style.visibility = 'hidden'; 
        document.getElementById( "Seitenleiste" ).style.visibility = 'visible'; 
        document.getElementById( "menuBtn" ).classList.add( "btnAktiv" ); 

        if( scope.highestLevel > 1){
            document.getElementById( "resetBtn" ).classList.remove( "btnDeaktiv" ); 
            document.getElementById( "resetBtn" ).classList.add( "btnAktiv" ); 
            document.getElementById( "resetBtn" ).disabled = false; 
        }

        const event = new Event( 'fortsetzenClicked' );
        document.dispatchEvent( event );
    };

    this.anleitungClicked = function(){
        document.getElementById( "anleitung" ).style.visibility = 'visible';
        if( myStorage.getItem( 'hideAnleitung' ) == 1 ){
            document.getElementById( 'btnHide' ).classList.add( "btnDeaktiv" );
            document.getElementById( 'btnHide' ).classList.remove( "btnAktiv" );
        } else {
            document.getElementById( 'btnHide' ).classList.remove( "btnDeaktiv" );
            document.getElementById( 'btnHide' ).classList.add( "btnAktiv" );
        }
        document.getElementById( "start" ).style.visibility = 'hidden';

    };

    this.Startseite = function(){
        let newDiv = document.createElement("div");
        newDiv.id = "start";
        let newParagraph = document.createElement("p");
        newParagraph.id = "startText";
        let buttonDiv = document.createElement("div");
        buttonDiv.id = "btnDiv";
        let newContent = document.createTextNode("Herzlich willkommen!");
        let newbtnFortsetzen = document.createElement("button");
        newbtnFortsetzen.textContent = "Fortsetzen";
        newbtnFortsetzen.id = "btnFortsetzen";
        newbtnFortsetzen.classList.add( "btnAktiv" );
        newbtnFortsetzen.onpointerup = this.fortsetzenHandler;

        let newWeiterButton = document.createElement("button");
        newWeiterButton.textContent = "Start";
        newWeiterButton.id = "btnStart";
        newWeiterButton.classList.add( "btnAktiv" );
        newWeiterButton.onpointerup = this.startHandler;

        let anleitungStart = document.createElement("button");
        anleitungStart.textContent = "Anleitung";
        anleitungStart.id = "btnAnleitungStart";
        anleitungStart.classList.add( "btnAktiv" );
        anleitungStart.onpointerup = this.anleitungClicked;

        newParagraph.appendChild(newContent);
        newDiv.appendChild(newParagraph); // füge den Textknoten zum neu erstellten div hinzu.
        buttonDiv.appendChild(newWeiterButton);
        buttonDiv.appendChild(newbtnFortsetzen);
        buttonDiv.appendChild(anleitungStart);
        newDiv.appendChild(buttonDiv);
        var style = document.createElement('style');
        style.innerHTML = `
        #start {
            color: white;
            width: 99.9%;
            height: 99.8%;
            border: solid grey 1px;
            text-align: center;
            background-color: #333333;
            position: absolute;
        }
        #startText{
            font-size: 40px;
            margin-top: 20%;
        }
        `;
        document.head.appendChild(style);

        // füge das neu erstellte Element und seinen Inhalt ins DOM ein
        let currentDiv = document.getElementById("Seitenleiste");
        document.body.insertBefore(newDiv, currentDiv);
        currentDiv.style.visibility = 'hidden';
        newDiv.style.visibility = 'hidden';

        if( scope.highestLevel < 2 ){
            newbtnFortsetzen.disabled = true;
            newbtnFortsetzen.classList.remove( "btnAktiv" ); 
            newbtnFortsetzen.classList.add( "btnDeaktiv" ); 
        }
    };

    this.startseiteHandler = function(){
        document.getElementById("completed").style.visibility = "hidden";
        document.getElementById("start").style.visibility = "visible";
        console.log( "jetzt" );
    };

    this.lastLevelCompleted = function(){
        document.getElementById("Seitenleiste").style.visibility = "hidden";
        let startDiv = document.createElement("div");
        startDiv.id = "completed";
        let startParagraph = document.createElement("p");
        startParagraph.id = "completeText";
        let buttonStartDiv = document.createElement("div");
        buttonStartDiv.id = "btnConDiv";
        let newStartContent = document.createTextNode("Alle Level geschafft!");
        let newbtnStart = document.createElement("button");
        newbtnStart.textContent = "Startseite";
        newbtnStart.id = "btnStartseite";
        newbtnStart.classList.add( "btnAktiv" );
        newbtnStart.onpointerup = this.startseiteHandler;

        startParagraph.appendChild(newStartContent);
        startDiv.appendChild(startParagraph); // füge den Textknoten zum neu erstellten div hinzu.
        buttonStartDiv.appendChild(newbtnStart);
        startDiv.appendChild(buttonStartDiv);
        var style = document.createElement('style');
        style.innerHTML = `
        #completed {
            color: white;
            width: 99.9%;
            height: 99.8%;
            border: solid grey 1px;
            text-align: center;
            background-color: #333333;
            position: absolute;
        }
        #completeText{
            font-size: 40px;
            margin-top: 20%;
        }
        `;
        document.head.appendChild(style);

        // füge das neu erstellte Element und seinen Inhalt ins DOM ein
        let currentDiv = document.getElementById("Seitenleiste");
        document.body.insertBefore(startDiv, currentDiv);
        startDiv.style.visibility = 'hidden';
    };

    this.menuHandler = function( ev ){
        document.getElementById("completed").style.visibility = "hidden";
        document.getElementById( "start" ).style.visibility = 'visible'; 
        document.getElementById( "Seitenleiste" ).style.visibility = 'hidden';

        if( scope.highestLevel > 1 ){
            document.getElementById("btnFortsetzen").disabled = false;
            document.getElementById("btnFortsetzen").classList.remove( "btnDeaktiv" ); 
            document.getElementById("btnFortsetzen").classList.add( "btnAktiv" );
        }   
    };

    this.anleitungHandler = function(){
        document.getElementById( "start" ).style.visibility = 'visible';
        document.getElementById( "anleitung" ).style.visibility = 'hidden';
    };

    this.hideHandler = function(){
        if( myStorage.getItem( 'hideAnleitung' ) == 1 ){
            return;
        }

        if( !myStorage.getItem( 'hideAnleitung' ) ){
            myStorage.setItem( 'hideAnleitung', 1 );
            scope.anleitungHandler();
        } else if( myStorage.getItem( 'hideAnleitung' ) == 0 ){
            myStorage.setItem( 'hideAnleitung', 1 );
            scope.anleitungHandler();
        }
    }

    this.anleitungAnzeige = function(){
        document.getElementById("Seitenleiste").style.visibility = "hidden";
        let startDiv = document.createElement("div");
        startDiv.id = "anleitung";
        let ueberschriftAnleitung = document.createElement("h1");
        ueberschriftAnleitung.innerHTML = "Willkommen zu Sokoban";
        ueberschriftAnleitung.id = "ueberschrift";
        let startParagraph = document.createElement("div");
        startParagraph.id = "anleitungText";
        readText( "../test/Texte/anleitung.txt", startParagraph );

        let buttonStartDiv = document.createElement("div");
        let btnHide = document.createElement("button");
        btnHide.textContent = "Nicht mehr anzeigen";
        btnHide.id = "btnHide";
        btnHide.classList.add( "btnAktiv" );
        btnHide.onpointerup = this.hideHandler;

        if( myStorage.getItem( 'hideAnleitung' ) == 1 ){
            btnHide.disabled = true;
            btnHide.classList.add( "btnDeaktiv" );
            btnHide.classList.remove( "btnAktiv" );
        }

        let newbtnStart = document.createElement("button");
        newbtnStart.textContent = "Los geht's!";
        newbtnStart.id = "btnLos";
        newbtnStart.classList.add( "btnAktiv" );
        newbtnStart.onpointerup = this.anleitungHandler;
        buttonStartDiv.appendChild( newbtnStart );
        buttonStartDiv.appendChild( btnHide );

        startDiv.appendChild(ueberschriftAnleitung);
        startDiv.appendChild(startParagraph);
        startDiv.appendChild( buttonStartDiv );
        var style = document.createElement('style');
        style.innerHTML = `
        #anleitung {
            color: white;
            width: 99.9%;
            height: 99.8%;
            border: solid grey 1px;
            text-align: center;
            background-color: #333333;
            position: absolute;
        }
        #ueberschrift {
            color: white;
            text-align: center;
            background-color: #333333;
            font-size: 50px;
            margin-top: 3vh;
            margin-bottom: 5vh;
            font-family: sans-serif;
        }
        `;
        document.head.appendChild(style);

        let currentDiv = document.getElementById("Seitenleiste");
        document.body.insertBefore(startDiv, currentDiv);
        startDiv.style.visibility = 'hidden';
    };

    this.cameraOneHandler = function( ev ){
        const event = new Event( 'cameraOne' );
        document.dispatchEvent( event );
    };
    
    this.cameraTwoHandler = function( ev ){
        const event = new Event( 'cameraTwo' );
        document.dispatchEvent( event );
    };

    this.addButton = function( anzahl ){
        let newDiv;
        let ContentWrapper = document.getElementById( "Seitenleiste");
        ContentWrapper.style.visibility = "hidden";
        if( document.getElementById("Levelauswahl") ){
            newDiv = document.getElementById("Levelauswahl");
        } else {
            newDiv = document.createElement( "div" );
            newDiv.id = "Levelauswahl";
        }
        for( let i = 0; i < anzahl; i++ ){
            let newButton = document.createElement("button");
            newButton.textContent = (i + 1);
            newButton.id = "Level" + (i + 1);
            newButton.classList.add( "Level" );
            newButton.dataset.level = (i + 1);
            newDiv.appendChild( newButton );
        }
        let siteDiv = document.createElement( "div" );
        siteDiv.id = "siteDiv";

        let cameraDiv = document.createElement( "div" );
        cameraDiv.id = "cameraDiv";

        let cameraPosOne = document.createElement( "button" );
        cameraPosOne.id = "cameraOne";
        cameraPosOne.textContent = "Kamera 1";
        cameraPosOne.classList.add( "btnSite" );
        cameraPosOne.classList.add( "btnAktiv" );
        cameraPosOne.onpointerup = this.cameraOneHandler;

        let cameraPosTwo = document.createElement( "button" );
        cameraPosTwo.id = "cameraTwo";
        cameraPosTwo.textContent = "Kamera 2";
        cameraPosTwo.classList.add( "btnSite" );
        cameraPosTwo.classList.add( "btnAktiv" );
        cameraPosTwo.onpointerup = this.cameraTwoHandler;

        let menuBtn = document.createElement( "button" );
        menuBtn.id = "menuBtn";
        menuBtn.textContent = "Menü";
        menuBtn.classList.add( "btnSite" );
        menuBtn.onpointerup = this.menuHandler;

        let resetBtn = document.createElement( "button" );
        resetBtn.id = "resetBtn";
        resetBtn.textContent = "Zurücksetzen";
        resetBtn.classList.add( "btnSite" );
        resetBtn.onpointerup = this.resetHandler;
        
        ContentWrapper.appendChild( newDiv );
        cameraDiv.appendChild( cameraPosOne );
        cameraDiv.appendChild( cameraPosTwo );
        siteDiv.appendChild( menuBtn );
        siteDiv.appendChild( resetBtn );
        ContentWrapper.appendChild( cameraDiv );
        ContentWrapper.appendChild( siteDiv );
    }
}

export {UI};