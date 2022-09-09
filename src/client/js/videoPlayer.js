const video = document.querySelector("video");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const volumeRange = document.getElementById("volumeRange");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

const handlePlay = () => {
  return playBtn.innerText = "멈춤";
}

const handlePause = () => {
  video.pause();

  return playBtn.innerText = "재생";
}

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }

  volumeRange.value = video.muted ? 0 : volumeValue;
  muteBtn.innerText = video.muted ? "음소거 해제" : "음소거";

  return;
}

const handleVolumeRangeChange = (e) => {
  volumeValue = e.target.value;
  video.volume = volumeValue;

  if (video.volume === 0) {
    video.muted = true;
    muteBtn.innerText = "음소거 해제";
  } else {
    video.muted = false;
    muteBtn.innerText = "음소거";
  }

  return;
}

const formatTime = (ms) => {
  const seconds = new Date(Math.floor(ms * 1000)).toString().substring(20, 25);

  return seconds;
}

const handleLoadedMetadata = () => {
  timeline.max = Math.floor(video.duration);
  totalTime.innerText = formatTime(video.duration);

  return;
}

const handleTimeUpdate = () => {
  currentTime.innerText = Math.floor(video.currentTime);
  timeline.value = Math.floor(video.currentTime);

  return;
}

const handleTimelineChange = (e) => {
  const {
    target:
    { value }
  } = e;

  video.currentTime = value;

  return;
}

const handleFullScreen = () => {
  if (!document.fullscreenElement) {
    fullScreenBtn.innerText = "전체화면 해제";
    video.requestFullscreen();
  } else {
    fullScreenBtn.innerText = "전체화면";
    document.exitFullscreen();
  }

  return;
}

const hideControls = () => {
  return videoControls.classList.remove("showing");
}

const handleMouseOver = () => {
  videoControls.classList.add("showing");

  return;
}

const handleMouseLeave = () => {
  // mouseLeaveTimeoutId = setTimeout(hideControls, 500);
  hideControls();
  return;
}

const handleFullScreenChange = () => {
  if (!document.fullscreenElement) {
    fullScreenBtn.innerText = "전체화면";
  }

  return;
}

if (video.readyState >= 2) {
  handleLoadedMetadata();
}

video.addEventListener("loadedmetadata", handleLoadedMetadata);
playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeRangeChange);
video.addEventListener("pause", handlePause);
video.addEventListener("play", handlePlay);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("mouseleave", handleMouseLeave);
videoContainer.addEventListener("mouseover", handleMouseOver);
video.addEventListener("fullscreenchange", handleFullScreenChange);
// if (videoControls.classList.contains("showing")) {
//   document.addEventListener("keydown", (e) => {
//     if (e.key === " ") {
//       handleFullScreen();
//     }
//   });
// }