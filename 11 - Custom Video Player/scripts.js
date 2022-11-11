// Get elements

const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelector('[data-skip]');
const ranges = player.querySelector('.player__slider');

// Build functions

function togglePlay() {
	const method = video.paused ? 'play' : 'pause';
	video[method]();
	// = since 'play' or 'pause' are string values, they have to be converted to the method .play() or .pause() somehow...apparently ['play'] etc does that.

	// if (video.paused) {
	// 	video.play();
	// } else {
	// 	video.pause();
	// }
}

// Hook up event listeners

video.addEventListener('click', togglePlay);
