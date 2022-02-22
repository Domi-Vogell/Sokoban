import * as pack from "./playground.m.js";

const THREE = pack.THREE;


const Audio = function( viewport ){
    Object.call( this );
    const scope = this;
    const listener = new THREE.AudioListener();
    viewport.camera.add( listener );
    
    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();

    // create a global audio source
    scope.feuerwerk = new THREE.Audio( listener );

    audioLoader.load( '../test/Sounds/feuerwerk.mp3', function( buffer ) {
        scope.feuerwerk.setBuffer( buffer );
        scope.feuerwerk.setLoop( false );
        scope.feuerwerk.setVolume( 0.5 );
    });

    scope.startGlocke = new THREE.Audio( listener );

    audioLoader.load( '../test/Sounds/start.mp3', function( buffer ) {
        scope.startGlocke.setBuffer( buffer );
        scope.startGlocke.setLoop( false );
        scope.startGlocke.setVolume( 0.5 );
    });
};

Audio.prototype = Object.assign( Object.create ( Object.prototype ), {
    constructor: Audio
});

export { Audio };