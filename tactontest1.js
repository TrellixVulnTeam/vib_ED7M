var rpio = require('rpio');

var pin = 12;           /* P12/GPIO18 */
var range = 1024;       /* LEDs can quickly hit max brightness, so only use */
var max = 1000;          /*   the bottom 8th of a larger scale */
var clockdiv = 8;       /* Clock divider (PWM refresh rate), 8 == 2.4MHz */
var interval = 2;       /* setInterval timer, speed of pulses */
var times = 1;          /* How many times to pulse before exiting */



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



function play1(){
/*
 * Enable PWM on the chosen pin and set the clock and range.
 */

rpio.open(pin, rpio.PWM);
rpio.pwmSetClockDivider(clockdiv);
rpio.pwmSetRange(pin, range);

/*
 * Repeatedly pulse from low to high and back again until times runs out.
 */

        rpio.pwmSetData(pin, 625);
     
        sleep(15000);
rpio.pwmSetData(pin, 0);
sleep(5000);
rpio.pwmSetData(pin, 525);
     
        sleep(15000);
rpio.pwmSetData(pin, 0);
sleep(5000);
rpio.pwmSetData(pin, 550);
     
        sleep(15000);
rpio.pwmSetData(pin, 0);
sleep(5000);
rpio.pwmSetData(pin, 575);
     
        sleep(15000);
rpio.pwmSetData(pin, 0);
sleep(5000);
rpio.pwmSetData(pin, 600);
     
        sleep(15000);
rpio.pwmSetData(pin, 0);

}
play1();