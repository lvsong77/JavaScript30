const video = document.querySelector(".player__video");

const playBtn = document.querySelector(".player__button");

const progressBackBar = document.querySelector(".progress");

const progressFrontBar = document.querySelector(".progress__filled");

const volumeBar = document.querySelector('input[name="volume"]');

const rateBar = document.querySelector('input[name="playbackRate"]');

const skipBtns = document.querySelectorAll(".player__button[data-skip]");

const togglePlay = () => {
  if (video.paused) {
    video.play();
    playBtn.textContent = "❚ ❚";
  } else {
    video.pause();
    playBtn.textContent = "►";
  }
};

const setVolume = () => {
  video.volume = volumeBar.value;
};

const setRate = () => {
  video.playbackRate = rateBar.value;
};

const setProgressBar = () => {
  const duration = video.duration;
  const currentTime = video.currentTime;
  const backWidth = progressBackBar.offsetWidth;
  const frontWidth = (currentTime / duration) * backWidth;

  progressFrontBar.style.width = frontWidth + "px";
};

const setProgress = (e) => {
  const frontWidth = e.offsetX;
  const backWidth = progressBackBar.offsetWidth;
  const duration = video.duration;
  const currentTime = (frontWidth / backWidth) * duration;

  video.currentTime = currentTime;
  progressFrontBar.style.width = frontWidth + "px";
};

let isDrag = false;
const monitorDrag = () => {
  progressBackBar.addEventListener("mousedown", () => {
    isDrag = true;
  });
  progressBackBar.addEventListener("mouseup", () => {
    isDrag = false;
  });
  progressBackBar.addEventListener("mouseleave", () => {
    isDrag = false;
  });
  progressBackBar.addEventListener("mousemove", (e) => {
    if (isDrag) {
      setProgress(e);
    }
  });
};

const skip = (e) => {
  const skipTime = Number(e.target.dataset.skip);
  video.currentTime += skipTime;
  setProgressBar();
};

playBtn.addEventListener("click", togglePlay);

volumeBar.addEventListener("input", setVolume);

rateBar.addEventListener("input", setRate);

progressBackBar.addEventListener("click", setProgress);

skipBtns.forEach((btn) => btn.addEventListener("click", skip));

setInterval(() => {
  setProgressBar();
}, 1000);

monitorDrag();
