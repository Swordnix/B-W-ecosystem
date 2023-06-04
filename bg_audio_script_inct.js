        //audio player for background music
        const audioPlayer = {
        currentSong: null,
        audioElement: new Audio(),
        silenceDuration: 5000, // 5 seconds of silence before selecting another song
        fadeOutDuration: 10000, // 3 seconds fade out duration
        fadeOutStart: 1, // Start fading out at the 25th second
    
        playRandomSong() {
        const randomIndex = Math.floor(Math.random() * audioFiles.length);
        const randomSong = audioFiles[randomIndex];
        this.currentSong = randomSong;
    
        this.audioElement.src = randomSong;
        this.audioElement.play();
        console.log(`Playing song: ${randomSong}`);
    
        this.audioElement.onended = () => {
            this.fadeOut();
        };
        },
    
        fadeOut() {
            if (this.currentSong) {
            const audio = this.audioElement;
            const fadeOutInterval = setInterval(() => {
                const currentTime = audio.currentTime;
                const fadeOutStart = this.fadeOutStart;
                const fadeOutDuration = this.fadeOutDuration / 1000;
                let volume;
    
            if (currentTime >= fadeOutStart) {
                const timeSinceFadeOutStart = currentTime - fadeOutStart;
                const fadeOutProgress = timeSinceFadeOutStart / fadeOutDuration;
                volume = Math.max(1 - Math.pow(fadeOutProgress, 2), 0); // Ensure volume is within [0, 1]
            } else {
                volume = 1;
            }
    
            audio.volume = volume;
    
            if (volume <= 0) {
                clearInterval(fadeOutInterval);
                audio.pause();
                audio.volume = 1; // Reset volume for the next song
                console.log(`Faded out song: ${this.currentSong}`);
                setTimeout(() => {
                this.playRandomSong();
                }, this.silenceDuration);
            }
            }, 10); // Check every 10 milliseconds
        }
        }
        };
