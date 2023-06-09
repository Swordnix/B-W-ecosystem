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

function shutDownAudio() {
  isAudioEnabled = false;
  stopSoundEffect('backgroundmusic', 0); // Stop the currently playing background music, if any
  stopSoundEffect('backgroundmusic', 1);
  stopSoundEffect('backgroundmusic', 2);

  // Add code to stop all other sounds or audio elements
}
// Flag to track the state of background music
let isBackgroundMusicPlaying = false;
function playRandomBackgroundMusic() {
  if (isBackgroundMusicPlaying) {
    return;
  }

  const category = 'backgroundmusic';
  const numberOfSounds = soundEffects[category].length;
  const randomIndex = Math.floor(Math.random() * numberOfSounds);

  isBackgroundMusicPlaying = true;

  const audio = soundEffects[category][randomIndex].audio;

  audio.addEventListener('error', (event) => {
    console.error('Error occurred while playing background music:', event.target.error);
    isBackgroundMusicPlaying = false;

    setTimeout(() => {
      playRandomBackgroundMusic();
    }, 1000);
  });

  audio.addEventListener('ended', () => {
    setTimeout(() => {
      stopSoundEffect(category, randomIndex);
      isBackgroundMusicPlaying = false;
      playRandomBackgroundMusic();
    }, 5000);
  });

  if (audio.paused) {
    audio.play().catch((error) => {
      if (error.name === 'NotAllowedError') {
        console.warn('Playback was prevented due to autoplay restrictions.');
      } else {
        console.error('Error occurred while playing background music:', error);
        isBackgroundMusicPlaying = false;
      }

      setTimeout(() => {
        playRandomBackgroundMusic();
      }, 5000);
    });
  } else {
    stopSoundEffect(category, randomIndex); // Stop the currently playing background music
    isBackgroundMusicPlaying = false;
    playRandomBackgroundMusic();
  }
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
