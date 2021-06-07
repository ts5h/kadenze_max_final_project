// Set parameters for FM

inlets = 1;
outlets = 3;


function bang() {
	setParams();
	
	setCarrierEnvelope();
	setModulatorEnvelope();
}


function setCarrierEnvelope() {
	var dur = this.duration;
	
	// Make odd number
	var pointNumber = Math.floor(Math.random() * 9) + 3; // 3-11
	
	// Set coordination and set
	outlet(0, 'clear');
	
	var oldX = 0;
	var oldY = 0;
	
	for (var i = 0; i < pointNumber; i++) {
		var x = 0;
		var y = 0;
		
		// x
		if (i === 0) {
			x = 0;
		} else if (i === pointNumber - 1) {
			x = this.duration;
		} else {
			var tmpDur = Math.random() * (dur / ((pointNumber - i) / 2));
			
			x = tmpDur + oldX;
			dur -= tmpDur;
			oldX = x;
		}
		
		// y
		if (i === 0 || i === pointNumber - 1) {
			y = 0;
		} else {
			y = Math.random();
		}
		
		oldY = Math.max(oldY, y);
		
		if (i === pointNumber - 2 && oldY <= 0.5) {
			y = Math.random() * 0.5 + 0.5;
		}
		
		outlet(0, [x, y]);
		
		// curve
		if (i > 0) {
			var curve = Math.random() * 1.6 - 0.8;
			outlet(0, 'setcurve', [i, curve]);
		}
	}
}


function setModulatorEnvelope() {
	var dur = this.duration;
	
	// Make odd number
	var pointNumber = Math.floor(Math.random() * 18) + 2; // 2-19
	
	// Set coordination and set
	outlet(1, 'clear');
	
	var oldX = 0;
	for (var i = 0; i < pointNumber; i++) {
		var x = 0;
		var y = 0;
		
		// x
		if (i === 0) {
			x = 0;
		} else if (i === pointNumber - 1) {
			x = this.duration;
		} else {
			var tmpDur = Math.random() * (dur / ((pointNumber - i) / 2));
			
			x = tmpDur + oldX;
			dur -= tmpDur;
			oldX = x;
		}
		
		// y
		y = Math.random();
		
		outlet(1, [x, y]);
		
		// curve
		if (i > 0) {
			var curve = Math.random() * 1.6 - 0.8;
			outlet(1, 'setcurve', [i, curve]);
		}
	}
}


// Frequency, Harmonicity, Duration, MIDI, Feedback, LFO
function setParams() {
	// Harmonicity
	var harmonicity = 0;
	if (Math.floor(Math.random() * 10) < 3) {
		harmonicity = Math.random() * 49.5 + 0.5;
	} else {
		harmonicity = Math.random() * 4.5 + 0.5;
	}
	
	
	outlet(2, 'harmonicity', harmonicity);
			
	// Duration (250-10000ms)
	this.duration = Math.random() * 9750 + 250;
	outlet(2, 'duration', duration);
	
	// MIDI
	var midi = Math.floor(Math.random() * 89) + 23;
	outlet(2, 'midi', midi);
	
	// Feedback (20%　probability)
	if (Math.floor(Math.random() * 10) < 2) {
		var feedback = Math.random() * 25;
		outlet(2, 'feedback', feedback);
	} else {
		outlet(2, 'feedback', 0);
	}
	
	// LFO (50% probability)
	if (Math.floor(Math.random() * 10) < 5 && this.duration >= 3000) {
		var lfo = Math.random() * 50;
		outlet(2, 'lfo', lfo);
	} else {
		outlet(2, 'lfo', 0);
	}
}