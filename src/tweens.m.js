const myTween = function( VP, playground ){
    const scope = this;
    this.tweenReset = function( mhkzwerg ){
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

    this.tweenBoxRechts = function( box, mhkzwerg ){
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
            scope.tweenReset( mhkzwerg );
        });
        VP.loop.add( TWEEN.update );

        setTimeout(function() {
            const event = new Event( 'tastenFreigeben' );
            document.dispatchEvent( event );
        }, 1400 );
    }

    this.tweenBoxLinks = function( box, mhkzwerg ){

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
            scope.tweenReset( mhkzwerg );
        });
        VP.loop.add( TWEEN.update );

        setTimeout(function() {
            const event = new Event( 'tastenFreigeben' );
            document.dispatchEvent( event );
        }, 1400 );
    }

    this.tweenBoxUnten = function( box, mhkzwerg ){
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
            scope.tweenReset( mhkzwerg );
        });
        VP.loop.add( TWEEN.update );

        setTimeout(function() {
            const event = new Event( 'tastenFreigeben' );
            document.dispatchEvent( event );
        }, 1400 );
    }

    this.tweenBoxOben = function( box, mhkzwerg ){
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
            scope.tweenReset( mhkzwerg );
            mhkzwerg.kopf.rotation.y = 0;
        });
        VP.loop.add( TWEEN.update );

        setTimeout(function() {
            const event = new Event( 'tastenFreigeben' );
            document.dispatchEvent( event );
        }, 1400 );
    }

    this.tweenJubeln = function( mhkzwerg ){
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

    this.tweenGehen = function( mhkzwerg ){
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


    this.tweenMoveRight = function( mhkzwerg ){

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
            scope.tweenGehen( mhkzwerg );
            tweenSchritte.start();
        });
        VP.loop.add( TWEEN.update );

        setTimeout(function() {
            const event = new Event( 'tastenFreigeben' );
            document.dispatchEvent( event );
        }, 1400 );
    }

    this.tweenMoveLeft = function( mhkzwerg ){
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
            scope.tweenGehen( mhkzwerg );
            tweenSchritte.start();
        });
        VP.loop.add( TWEEN.update );

        setTimeout(function() {
            const event = new Event( 'tastenFreigeben' );
            document.dispatchEvent( event );
        }, 1400 );
    }

    this.tweenMoveUp = function( mhkzwerg ){
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
            scope.tweenGehen( mhkzwerg );
            tweenSchritte.start();
        });
        VP.loop.add( TWEEN.update );

        setTimeout(function() {
            const event = new Event( 'tastenFreigeben' );
            document.dispatchEvent( event );
        }, 1400 );
    }

    this.tweenMoveDown = function( mhkzwerg ){
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
            scope.tweenGehen( mhkzwerg );
            tweenSchritte.start();
        });
        VP.loop.add( TWEEN.update );

        setTimeout(function() {
            const event = new Event( 'tastenFreigeben' );
            document.dispatchEvent( event );
        }, 1400 );
    }
};

export{ myTween };