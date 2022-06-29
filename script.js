// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
 
let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
 
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let wave  = document.getElementById("wave");
let randomIcon = document.querySelector("fa-random");

// Create the audio element for the player
let curr_track = document.createElement("audio");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
 
 
// Define the list of tracks that have to be played
let track_list = [
 {
  name: "Namo Namo",
  artist: "Amit Trivedi",
  image: "namonamo.jpg",
  path:"Namo Namo - Lyrical _ Kedarnath _ Sushant Rajput _ Sara Ali Khan _ Amit Trivedi _ Amitabh B.mp3"

 },
  {
    name: "Bhaag Milkha Bhaag",
    artist: "Arif Lohar",
    image: "BhaagMilkha.jpg",
    path: "Bhaag Milkha Bhaag (Rock Version).mp3"
  },
  {
    name: "Maahi Ve",
    artist: "A.R Rahman",
    image: "mahive.jpg",
    path: "A.R Rahman Maahi Ve Full Song (Audio) Highway Alia Bhatt, Randeep Hooda Imtiaz Ali.mp3"
  },
  {
    name: "Deep Space",
    artist: "Nigel Stanford",
    image: "deepspace.jpg",
    path: "Deep Space - from Solar Echoes - Nigel Stanford (Official Visual).mp3"
  },

  {
    name: "Agar Tum Sath Ho",
    artist: "Arijit Singh & Alka Yagnik",
    image: "agartum.jpg",
    path: "'AGAR TUM SAATH HO' Full VIDEO songTamashaRanbir Kapoor, Deepika PadukoneT-Series.mp3"
  },
  
  
  {
    name: "Mood",
    artist: "24kGoldin",
    image: "mood.jpg",
    path: "24kGoldn - Mood (Official Video) ft. iann dior.mp3"
  },

  {
    name: "Falling",
    artist: "Trevor Daniel",
    image: "falling.jpg",
    path: "Trevor Daniel - Falling (Official Music Video).mp3"
  },

  {
    name: "STAY",
    artist: "Kid LAROI, Justin Bieber",
    image: "stay.jpg",
    path: "The Kid LAROI, Justin Bieber - STAY (Official Video) (1).mp3"
  },

  {
    name: "Kabhi Kabhi Aditi",
    artist: "A.R Rahaman",
    image: "kabhi_kabhi.jpg",
    path: "kabhi kabhi aditithe genius of AR rahmanT Series stereo OST from CD.mp3"
  },

  {
    name: "Runaway",
    artist: "Aurora Aksnes",
    image: "aurora.jpg",
    path: "AURORA - Runaway.mp3"
  },

  {
    name: "Intentions",
    artist: "Justin Beiber",
    image: "intentions.jpg",
    path: "Justin Bieber - Intentions (Official Video (Short Version)) ft. Quavo.mp3"
  }
  
  
];

loadTrack(track_index);

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    reset();
   
   // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    
   
    // Update details of the track
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    console.log(track_list[track_index].image)
    track_art.style.backgroundImage =
    "url(" + track_list[track_index].image + ")";
    
    
    
    now_playing.textContent =
       "PLAYING " + (track_index + 1) + " OF " + track_list.length;
   
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(setUpdate, 1000);
   
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener('ended', nextTrack);
   
    // Apply a random background color
    random_bg_color();
  }
   
  function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
    docuument.body.style.footer.background= gradient;
}
   
  // Function to reset all values to their default
  function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
  }

function randomTrack(){
  isRandom  ? pauseRandom() : playRandom();
}

function playRandom(){
  isRandom = true;
  randomIcon.classList.add('randomActive');
}

function pauseRandom (){
  isRandom = false;
  randomIcon.classList.remove('randomActive');
  }

  function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
  }

  function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
  isPlaying ? pauseTrack() : playTrack();
  }

  function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
   
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
   
  function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
   
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
   
  function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1 && isRandom === false){
      track_index += 1;
    }  
    else if(track_index < track_list.length - 1 && isRandom === true)
    {
        let random_index = Number.parseInt(Math.random() * track_list.length);
        track_index = random_index;
    } 
    else {
    
      track_index= 0;
    }
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }
   
  function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0){
      track_index -= 1;
    }
    else {
      track_index = track_list.length - 1;
    }
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
  }


  function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
   let seekto = curr_track.duration * (seek_slider.value / 100);
   
    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
  }
   
  function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
  }
   
  function setUpdate() {
    let seekPosition = 0;
   
    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_slider.value = seekPosition;
   
      // Calculate the time left and the total duration
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
   
      // Add a zero to the single digit time values
      if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
      if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
      if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
      if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
   
      // Display the updated duration
      curr_time.textContent = currentMinutes + ":" + currentSeconds;
      total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
  }


  // Load the first track in the tracklist
// loadTrack(track_index);