const app = () => {
  //const song = $(".song");
  const song = document.querySelector(".song");
  //const play = $(".play");
  const play = document.querySelector(".play");
  //const outline = $(".moving-outline circle"); //take the circle element
  const outline = document.querySelector(".moving-outline circle");
  //const video = $(".video-container video");
  const video = document.querySelector(".vid-container video");
  //Sounds
  const Sounds = document.querySelectorAll(".sound-picker button");
  //Time Display
  const timeDisplay = document.querySelector(".time-display"); //The h3 class
  const timeSelect = document.querySelectorAll(".time-select button");
  //Length of the outline
  const outlineLength = outline.getTotalLength();
  //Fake Duration - when the time expires, then the song stop
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Pick diffrent sounds
  Sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  //Play Sounds
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // Select sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  // Create a function to stop and play the sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  // We can animate the circle
  // When we hit play the song, this func will be ewecute
  // while the song keeps going on, it's gonna keep updating
  // When the song gonna stop, this function doesn't run anymore
  // The cuurentTime start from 0
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    // fake duration - how long the song should last
    //currentTime - the position when the song was paused
    let elapsed = fakeDuration - currentTime;
    // Animate the text - when it gets to 60 it's gonna reset back to 0
    let seconds = Math.floor(elapsed % 60);
    // 60 seconds divided by 60 it's gonna be 1 minutes
    // We use Math.floor because we want to keep integer numbers
    let minutes = Math.floor(elapsed / 60);

    // Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();
