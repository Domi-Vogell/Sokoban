const UI = function(){
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
        document.getElementById( "start" ).style.visibility = 'visible'; 
        document.getElementById( "Seitenleiste" ).style.visibility = 'hidden'; 
        document.getElementById("btnFortsetzen").disabled = true; 
        document.getElementById("btnFortsetzen").classList.remove( "btnAktiv" ); 
        document.getElementById("btnFortsetzen").classList.add( "btnDeaktiv" ); 

        document.getElementById( "resetBtn" ).classList.remove( "btnAktiv" ); 
        document.getElementById( "resetBtn" ).classList.add( "btnDeaktiv" ); 
        document.getElementById( "resetBtn" ).disabled = true; 

        const event = new Event( 'resetClicked' );
        document.dispatchEvent( event );
    };

    this.continueHandler = function( ev ){
        document.getElementById( "resetBtn" ).classList.remove( "btnDeaktiv" ); 
        document.getElementById( "resetBtn" ).classList.add( "btnAktiv" ); 
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
        newDiv.appendChild(newParagraph); // füge den Textknoten zum neu erstellten div hinzu.
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
            left: 25%;
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

        newParagraph.appendChild(newContent);
        newDiv.appendChild(newParagraph); // füge den Textknoten zum neu erstellten div hinzu.
        buttonDiv.appendChild(newWeiterButton);
        buttonDiv.appendChild(newbtnFortsetzen);
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

        if( scope.highestLevel < 2 ){
            newbtnFortsetzen.disabled = true;
            newbtnFortsetzen.classList.remove( "btnAktiv" ); 
            newbtnFortsetzen.classList.add( "btnDeaktiv" ); 
        }
    };

    this.menuHandler = function( ev ){
        document.getElementById( "start" ).style.visibility = 'visible'; 
        document.getElementById( "Seitenleiste" ).style.visibility = 'hidden';

        if( scope.highestLevel > 1 ){
            document.getElementById("btnFortsetzen").disabled = false;
            document.getElementById("btnFortsetzen").classList.remove( "btnDeaktiv" ); 
            document.getElementById("btnFortsetzen").classList.add( "btnAktiv" );
        }   
    };


    this.addButton = function( anzahl ){
        let newDiv;
        let ContentWrapper = document.getElementById( "Seitenleiste");
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

        let menuBtn = document.createElement( "button" );
        menuBtn.id = "menuBtn";
        menuBtn.textContent = "Menü";
        menuBtn.classList.add( "btnSite" );
        menuBtn.classList.add( "active" );
        menuBtn.onpointerup = this.menuHandler;

        let resetBtn = document.createElement( "button" );
        resetBtn.id = "resetBtn";
        resetBtn.textContent = "Zurücksetzen";
        resetBtn.classList.add( "btnSite" );
        resetBtn.onpointerup = this.resetHandler;
        
        ContentWrapper.appendChild( newDiv );
        siteDiv.appendChild( menuBtn );
        siteDiv.appendChild( resetBtn );
        ContentWrapper.appendChild( siteDiv );
    }
}

export {UI};