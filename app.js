// drum machine keys
// see Wes Bos: JavaScript30 project 1

const keys = document.querySelectorAll('.key');

function playSound(e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	if(!audio) return; // stop the function from running altogether
	audio.currentTime = 0;
	audio.play();
	key.classList.add('playing');
}

function removeTransition(e) {
	if(e.propertyName !== 'transform') return; // skip if not a transform
	this.classList.remove('playing');
}

keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);

// web audio API
// see https://css-tricks.com/introduction-web-audio-api/

var context = new (window.AudioContext || window.webkitAudioContext)();

var oscillator = context.createOscillator();

oscillator.type == 'sine';
oscillator.frequency.value = 140;
oscillator.connect(context.destination);
oscillator.start();