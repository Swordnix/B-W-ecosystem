// Deals with audio & caching
function preloadSoundEffects() {
  for (const category in soundEffects) {
    soundEffects[category].forEach(sound => {
      sound.audio.preload = 'auto';
      sound.audio.src = sound.url;
    });
  }
}

function playSoundEffect(category, index) {
  const sound = soundEffects[category][index];
  if (sound.audio.paused) {
    sound.audio.currentTime = 0;
    sound.audio.play().catch(error => {
      console.error('Error occurred while playing sound effect:', error);
    });
  } else {
    sound.audio.addEventListener('ended', () => {
      sound.audio.currentTime = 0;
      sound.audio.play().catch(error => {
        console.error('Error occurred while playing sound effect:', error);
      });
    });
  }
}

function stopSoundEffect(category, index) {
  const sound = soundEffects[category][index];
  if (!sound.audio.paused) {
    sound.audio.pause();
    sound.audio.currentTime = 0;
  }
}

// Flag to track the state of background music
let isBackgroundMusicPlaying = false;

// Function to play a sound effect
function playSoundEffect(category, index) {
  const sound = soundEffects[category][index];
  if (sound.audio.paused) {
    sound.audio.currentTime = 0;
  }
  sound.audio.play();
}

// Function to stop a sound effect
function stopSoundEffect(category, index) {
  const sound = soundEffects[category][index];
  sound.audio.pause();
  sound.audio.currentTime = 0;
}

// Function to play random background music
function playRandomBackgroundMusic() {
  // Check if background music is already playing
  if (isBackgroundMusicPlaying) {
    return; // Return early if background music is already playing
  }

  const category = 'backgroundmusic';
  const numberOfSounds = soundEffects[category].length;
  const randomIndex = Math.floor(Math.random() * numberOfSounds);

  isBackgroundMusicPlaying = true; // Set the flag to indicate that background music is playing

  const audio = soundEffects[category][randomIndex].audio;

  audio.addEventListener('error', (event) => {
    console.error('Error occurred while playing background music:', event.target.error);
    isBackgroundMusicPlaying = false; // Reset the flag on error

    // Attempt to play the next random background music
    setTimeout(() => {
      playRandomBackgroundMusic();
    }, 1000); // Wait 1 second before playing the next random background music
  });

  audio.addEventListener('ended', () => {
    setTimeout(() => {
      stopSoundEffect(category, randomIndex);
      isBackgroundMusicPlaying = false; // Reset the flag when the background music ends
      playRandomBackgroundMusic();
    }, 5000); // Wait 5 seconds before playing the next random background music
  });

  audio.play().catch((error) => {
    console.error('Error occurred while playing background music:', error);
    isBackgroundMusicPlaying = false; // Reset the flag on error

    // Attempt to play the next random background music
    setTimeout(() => {
      playRandomBackgroundMusic();
    }, 1000); // Wait 1 second before playing the next random background music
  });
}





      /*requirements.jssi
        const soundEffects  = {
            music_category: [
                {
                    title: 'Music 1?',
                    url: 'https://drive.google.com/uc?export=download&id=1l3oKu98XjeWqT17l_BH3zmqM_uoTlgdH',
                    audio: new Audio()
                },
                /.......
            ]
        }
        >>> Preload the sound effects FIRST
         preloadSoundEffects()

        >>> then play the sound effects like this
         playSoundEffect(music_category, Music 1?);
      
         >>> can be used independently without worries of foreign object as long as requirement is fulfilled
      */
