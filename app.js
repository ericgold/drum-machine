// drum machine keys
// see Wes Bos: JavaScript30 project 1

const keys = document.querySelectorAll('.key');

function playSound(e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	if(!audio) return; // stop the function from running altogether
	audio.currentTime = 0;
	audio.play();
	key.parentNode.classList.add('playing');
}

function removeTransition(e) {
	if(e.propertyName !== 'transform') return; // skip if not a transform
	this.classList.remove('playing');
}

keys.forEach(key => key.parentNode.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);

// web audio API
// see https://css-tricks.com/introduction-web-audio-api/

// web audio API oscillator
var context = new (window.AudioContext || window.webkitAudioContext)();
var oscillator = context.createOscillator();

// DOM elements
var startButton = document.querySelector('.start-oscillator');
var stopButton = document.querySelector('.stop-oscillator');
var waveformButtons = document.querySelectorAll('.waveforms input');
var volume = document.querySelector('.volume input');

// gain
var gain = context.createGain();
oscillator.connect(gain);
gain.connect(context.destination);
gain.gain.value = 0.5;

oscillator.type == sine;
oscillator.frequency.value = 140;
oscillator.connect(context.destination);

function startOscillator() {
	oscillator.start();
}

function stopOscillator() {
	oscillator.stop();
}

function changeWaveform() {
	oscillator.type = this.value;
}

function changeVolume() {
	gain.gain.value = volume.value;
}

waveformButtons.forEach(function(target) {
	target.addEventListener('click', changeWaveform);
}); 

startButton.addEventListener('click', startOscillator);
stopButton.addEventListener('click', stopOscillator);
volume.addEventListener('change', changeVolume);

