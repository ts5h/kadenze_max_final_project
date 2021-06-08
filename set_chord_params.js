// Set parameters for sine curve based

inlets = 1;
outlets = 3;

function bang() {
	setParams();

	setCarrierEnvelope();
	setModulatorEnvelope();
}


function setCarrierEnvelope() {
	var dur = this.duration;

	var a = dur * 0.2;
	var d = a + dur * 0.05;
	var s = d + dur * 0.55;
	var r = s + dur * 0.2;

	// ASR
	outlet(0, 'clear');
	outlet(0, [0, 0]);
	outlet(0, [a, 1]);
	outlet(0, [d, 0.75]);
	outlet(0, [s, 0.75]);
	outlet(0, [r, 0]);

	// curve
	outlet(0, 'setcurve', [1, -0.3]);
	outlet(0, 'setcurve', [2, -0.6]);
	outlet(0, 'setcurve', [4, -0.3]);
}


function setModulatorEnvelope() {
	outlet(1, 'clear');
}


// Frequency, Harmonicity, Duration, MIDI, Feedback, LFO
function setParams() {
	// Harmonicity
	outlet(2, 'harmonicity', 0);

	// Duration
	this.duration = 4400;
	
	var rest = this.duration / 8;
	outlet(2, 'duration', this.duration + rest);

	// MIDI
	var midi = Math.floor(Math.random() * 49) + 36;
	outlet(2, 'midi', midi);

	// Feedback
	outlet(2, 'feedback', 0);

	// LFO
	outlet(2, 'lfo', 0);
}
