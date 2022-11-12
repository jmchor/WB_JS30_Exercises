// Get elements

const player = document.querySelector('.player');

const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const fullscreen = player.querySelector('.fullscreen');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

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

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	// "this" can be used because the function is bound to video
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
	// .currentTime is HTMLMediaElement. this is referencing the object that called the function. Dataset refers to the "data-" part as CSS property, and skip is the part "-skip" in "data-skip"
}

function handleRangeUpdate() {
	video[this.name] = this.value;
	// video = the HTMLMediaElement, with HTMLMediaElement.volume and HTMLMediaElement.playbackRate as instance properties
}

function handleProgress() {
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}% `;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = scrubTime;
	console.log(e);
}

function fullScreen() {
	video.requestFullscreen();
}

// requestFullscreen API

// Hook up event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach((skipButton) => skipButton.addEventListener('click', skip));

ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
ranges.forEach((range) => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// if mousedown is true (so, if the mouse is down) then it can move on to scrub. Otherwise it won't
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
fullscreen.addEventListener('click', fullScreen);
