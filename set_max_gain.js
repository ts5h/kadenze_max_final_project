// Set gain


this.oldGain = 64;

function msg_int(val) {
	if (val > this.oldGain) {
		outlet(0, val);
		this.oldGain = val;
		
		// Prevent repeat
		setTimeout(function () {
			reset();
		}, 250);
	}
}

function reset() {
	this.oldGain = 64;
}


// Reference: https://cycling74.com/forums/sleep-with-javascript
function setTimeout(task, timeout) {
	this.allowExecution = false;
	var tsk = new Task(function() {
		if (this.allowExecution) {
			task();
			arguments.callee.task.cancel();
		}
		
		this.allowExecution = true;
	}, this);
	
	tsk.interval = timeout;
	tsk.repeat(2);
}