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
    scope.sound = new THREE.Audio( listener );

    audioLoader.load( 'Test/js/feuerwerk.mp3', function( buffer ) {
        scope.sound.setBuffer( buffer );
        scope.sound.setLoop( false );
        scope.sound.setVolume( 0.5 );
    });
};

Audio.prototype = Object.assign( Object.create ( Object.prototype ), {
    constructor: Audio
});

export { Audio };