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
let context = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = context.createOscillator();


// create Sound class to enable multiple oscillator stops and starts

class Sound {

	constructor(context) {
		this.context = context;
	}

	init() {
		this.oscillator = this.context.createOscillator();
		this.gainNode = this.context.createGain();
		this.oscillator.connect(this.gainNode);
		this.gainNode.connect(this.context.destination);
	}

	play(value, startTime, endTime, wave) {
		this.init();

		this.oscillator.type = wave;
		this.oscillator.frequency.value = value;
		this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

		this.oscillator.start(startTime);
		this.oscillator.stop(endTime);
	}

	stop(time) {
		this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 1);
		this.oscillator.stop(time + 1);
	}

}



// DOM elements
var startButton = document.querySelector('.start-oscillator');
var stopButton = document.querySelector('.stop-oscillator');
var waveformButtons = document.querySelectorAll('.waveforms input');
var volume = document.querySelector('.volume input');
var duration = document.querySelector('.duration input');
var frequency = document.querySelector('.frequency input');
var notes = document.querySelectorAll('.notes button');

// gain
/*
var gain = context.createGain();
oscillator.connect(gain);
gain.connect(context.destination);
gain.gain.value = 1;

oscillator.type == sine;
oscillator.frequency.value = 140;
oscillator.connect(context.destination);
*/

function startOscillator() {
	let now = context.currentTime;
	let noteDuration = duration.value;
	let hz = frequency.value;
	let note = new Sound(context);
	let wave = getWaveform();
	note.play(hz, now, noteDuration, wave);
}

function playNote() {
	let now = context.currentTime;
	let noteDuration = duration.value;
	let note = new Sound(context);
	let hz = this.getAttribute('data-note');
	let wave = getWaveform();
	note.play(hz, now, noteDuration, wave);
}

function stopOscillator() {
	oscillator.stop();
}

function getWaveform() {
	let wave;
	waveformButtons.forEach(function(btn){
		if (btn.checked) {
			wave = btn.value;
		}
	});
	return wave;
}

function changeWaveform() {
	oscillator.type = this.value;
}

function changeVolume() {
	gain.gain.value = volume.value;
}

// Event Listeners

waveformButtons.forEach(function(target) {
	target.addEventListener('click', changeWaveform);
}); 

notes.forEach(note => note.addEventListener('click', playNote));

startButton.addEventListener('click', startOscillator);
stopButton.addEventListener('click', stopOscillator);
volume.addEventListener('change', changeVolume);


