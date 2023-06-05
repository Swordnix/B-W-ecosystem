       //deals with audio & caching
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
          }
          sound.audio.play();
        }
        function stopSoundEffect(category, index) {
          const sound = soundEffects[category][index];
          sound.audio.pause();
          sound.audio.currentTime = 0;
        }
        //audio player for background music
        function playRandomBackgroundMusic() {
          const category = 'backgroundmusic';
          const numberOfSounds = soundEffects[category].length;
          const randomIndex = Math.floor(Math.random() * numberOfSounds);
        
          playSoundEffect(category, randomIndex);
        
          soundEffects[category][randomIndex].audio.addEventListener('ended', () => {
            setTimeout(() => {
              stopSoundEffect(category, randomIndex);
              playRandomBackgroundMusic();
            }, 5000); // Wait 5 seconds before playing the next random background music
          });
        }
