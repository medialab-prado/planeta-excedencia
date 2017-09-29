var soundButton;
var muteState;
var myAudio = new Audio('sound/website.mp3');
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

myAudio.play();

var toggleSound = function (event)
{
  event.stopPropagation();
  myAudio.muted = !myAudio.muted;
  muteState = myAudio.muted;

  if(myAudio.muted)
  {
    //soundButton.innerText = "[ Sound ON ]";
    soundButton.className = "speaker";
    myAudio.pause();
  }
  else
  {
    //soundButton.innerText = "[ Sound OFF ]";
    soundButton.className = "speaker mute";
    myAudio.play();
  }
}


document.addEventListener("DOMContentLoaded", function(event) {
  soundButton = document.getElementById("sound");
  soundButton.addEventListener("click", toggleSound, false);

  if(myAudio.paused)
  {
    myAudio.muted = true;
    soundButton.className = "speaker";
    //soundButton.innerText = "[ Sound ON ]";
  }

  muteState = myAudio.muted;
});


setInterval( checkFocus, 200 );

function checkFocus() {
  if ( !document.hasFocus() ) {
    myAudio.muted = true;
    soundButton.className = "speaker";
    myAudio.pause();
  } else {
    if(!muteState)
    {
      myAudio.muted = false;
      soundButton.className = "speaker mute";
      myAudio.play();
    }
  }
}
