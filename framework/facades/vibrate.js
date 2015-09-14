module.exports = {
  vibrate : function ( duration ) {
    var realDuration = 100;

    if ( duration ) {
      if ( typeof duration === 'string' ) {
        switch ( duration ) {
          case 'fast':
            realDuration = 100;
            break;
          case 'medium':
            realDuration = 500;
            break;
          case 'long':
            realDuration = 700;
            break;
        }
      } else {
        realDuration = duration;
      }
    }

    window.navigator.vibrate = window.navigator.vibrate ||
        window.navigator.webkitVibrate ||
        window.navigator.mozVibrate || 
        window.navigator.msVibrate;

    if ( 'vibrate' in window.navigator ) {
      window.navigator.vibrate( duration );
    }
  }
};