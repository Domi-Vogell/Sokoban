/////////////////////////////////////////
const readText = function( path, element ){
    let result;

    function readTextFile( file, ID ){
        let rawFile = new XMLHttpRequest();
        rawFile.open( "GET", file, false );
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    result = rawFile.responseText;
                }
            }
        }

        rawFile.send( null );
        var event = new CustomEvent("readDone", {
            detail: {
            HTMLid: ID
            }
        });
        document.dispatchEvent( event );
    };

    function eventHandler(){
        document.addEventListener( 'readDone', setText );
    };

    function setText( ev ){
        let lines = result.split( '\n' );
        element.classList.add( "anleitungSeite" );

        for( let line = 0; line < lines.length; line++ ){
            element.innerHTML += lines[line];
            element.innerHTML += "<br>";
        }
    };

    eventHandler();
    readTextFile( path );
};

export {readText};