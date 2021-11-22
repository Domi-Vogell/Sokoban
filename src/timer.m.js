let timerStarted = false;

const Timer = function( loop ){
    let diff;
    let now;
    let target;

    const startTimer = function(){
        now = new Date();
        target = new Date().getTime() + ( 181 * 1000 );
        diff = target - now;
        loop.add( loopCount );
    }

    const loopCount = function(){
        now = new Date().getTime();
        diff = target - now;
        let mins = Math.floor(( diff % ( 1000 * 60 * 60 )) / ( 1000 * 60 ));
        let secs = Math.floor(( diff % ( 1000 * 60 )) / 1000 );

        if( diff >= 0 && diff <= 25 ){
            const event = new Event( 'tenSeconds' );
            document.dispatchEvent( event );
        }

        if( diff >= 0 ){
            document.getElementById("countdown").innerHTML = mins + "m " + secs + "s ";
        } else {
            document.getElementById("countdown").innerHTML = "Zeit abgelaufen";
            timerStarted = false;
            loop.remove( loop._fcts[loop._fcts.length - 1] );
        }

    }

    if( timerStarted ){
        loop.remove( loop._fcts[loop._fcts.length - 1] );
        startTimer();
    } else {
        startTimer();
        timerStarted = true;
    }
};

export { Timer };
