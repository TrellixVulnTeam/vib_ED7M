module.exports = {





play: function play4(){
	var rpio = require('rpio');

	var pin = 12;           /* P12/GPIO18 */
	var range = 1024;       /* LEDs can quickly hit max brightness, so only use */
	var max = 400;          /*   the bottom 8th of a larger scale */
	var clockdiv = 8;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
	var interval = 2;       /* setInterval timer, speed of pulses */
	var times = 5;          /* How many times to pulse before exiting */
/*
 * Enable PWM on the chosen pin and set the clock and range.
 */
rpio.open(pin, rpio.PWM);
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin, range);

/*
 * Sleep
 */
function sleep(milliseconds){
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++){
		if((new Date().getTime() - start) > milliseconds){
			break;
		}
	}
}

/*
 * Repeatedly pulse from low to high and back again until times runs out.
 */
var direction = 4;
var data = 0;
var pulse = setInterval(function() {
        rpio.pwmSetData(pin, data);
        if (data < 1) {
                direction = 4;
                if (times-- === 0) {
			rpio.pwmSetData(pin, 0);
                        clearInterval(pulse);
                        rpio.open(pin, rpio.INPUT);
                        return;
                }
        } else if (data > max) {

                direction = -4;
        }

        data += direction;
}, interval, data, direction, times);
}
}
