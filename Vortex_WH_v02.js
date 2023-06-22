class VortexEngine {
  constructor() {
    this.entity = []; // Array to hold game entities
    this._isPaused = false; // Flag to control animation loop
    this.assets = {}; // Object to hold cached assets
  }

  project() {
    // Function to be implemented by entities
    // Add your entity projection logic here
  }

  loadAssets(loader) {
    const loadingImage = new Image();
    loadingImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAb9JREFUeF7t2UtKBAEQBFG9/6F150rE1C4J5M26KLIjKufDvL54pQi8ptII80JI7AgIISRGIBZHQwiJEYjF0RBCYgRicTSEkBiBWBwNISRGIBZHQwiJEYjF0RBCYgRicTSEkBiBWBwNISRGIBZHQwiJEYjF0RBCYgRicTSEkBiBWBwNISRGIBZHQwj5IPAWY/HTOI8e9aPLxici5BNghIxXdM2QEEJ8hnx1AxqiIRqiIb9vwZ8x9Jb1e1mPMnx02fhsfodcf4cehdTHv3swjx71o8vqhMd8hIzArscJuSY87idkBHY9Tsg14XE/ISOw63FCrgmP+wkZgV2PE3JNeNxPyAjsepyQa8LjfkJGYNfjhFwTHvcTMgK7HifkmvC4n5AR2PU4IdeEx/2EjMCuxwm5JjzuJ2QE9i/H/ace00oIITECsTgaQkiMQCyOhhASIxCLoyGExAjE4mgIITECsTgaQkiMQCyOhhASIxCLoyGExAjE4mgIITECsTgaQkiMQCyOhhASIxCLoyGExAjE4mgIITECsTgaQkiMQCyOhhASIxCLoyGExAjE4mgIITECsTgaQkiMQCyOhhASIxCL8w4aKR5lcoXobgAAAABJRU5ErkJggg==";

    // Stop animation and display loading image
    /*this.pauseAnimation();
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(loadingImage, 0, 0);*/

    const loadPromises = [];

  // Load music
  if (loader.music && Array.isArray(loader.music)) {
    for (const [name, url] of loader.music) {
      const audio = new Audio();
      const cachedAudio = localStorage.getItem(name);
      if (cachedAudio) {
        audio.src = cachedAudio;
      } else {
        audio.src = url;
        localStorage.setItem(name, url);
      }
      const loadPromise = new Promise((resolve) => {
        audio.addEventListener("canplaythrough", () => {
          this.assets[name] = audio;
          resolve();
        });
      });
      loadPromises.push(loadPromise);
    }
  }

  // Load images
  if (loader.images && Array.isArray(loader.images)) {
    for (const [name, url] of loader.images) {
      const image = new Image();
      const cachedImage = localStorage.getItem(name);
      if (cachedImage) {
        image.src = cachedImage;
      } else {
        image.src = url;
        localStorage.setItem(name, url);
      }
      const loadPromise = new Promise((resolve) => {
        image.addEventListener("load", () => {
          this.assets[name] = image;
          resolve();
        });
      });
      loadPromises.push(loadPromise);
    }
  }

    // Wait for all assets to be loaded
    return Promise.all(loadPromises);
  }

  displayLogo() {
    const logoImage = new Image();
    logoImage.src =
      "https://piskel-imgstore-b.appspot.com/img/409465d9-0c6e-11ee-9c3a-61788352e367.gif";

    return new Promise((resolve) => {
      logoImage.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Make canvas full screen
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.id = "game-canvas";

        canvas.style.margin = "0";
        canvas.style.padding = "0";
        document.body.style.margin = "0";
        document.body.style.padding = "0";

        document.body.appendChild(canvas);

        const fadeDuration = 1000; // Duration for logo fade-in/out (in milliseconds)
        const logoDuration = 5000; // Duration to display logo (in milliseconds)

        const startTimestamp = performance.now();
        let lastTimestamp = startTimestamp;

        const animateLogo = (timestamp) => {
          const elapsed = timestamp - startTimestamp;
          const delta = timestamp - lastTimestamp;

          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw black background during the logo display
          if (elapsed < logoDuration) {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          // Calculate the opacity based on the elapsed time and fade duration
          let opacity = 1;

          if (elapsed < fadeDuration) {
            opacity = elapsed / fadeDuration; // Fade in
          } else if (elapsed > logoDuration - fadeDuration) {
            opacity =
              1 - (elapsed - (logoDuration - fadeDuration)) / fadeDuration; // Fade out
          }

          // Center the logo
          const x = (canvas.width - logoImage.width) / 2;
          const y = (canvas.height - logoImage.height) / 2;

          // Apply the opacity to the logo image
          ctx.globalAlpha = opacity;
          ctx.drawImage(logoImage, x, y);
          ctx.globalAlpha = 1; // Reset global alpha value

          // Wait for logo duration to complete
          if (elapsed < logoDuration + fadeDuration * 2) {
            requestAnimationFrame(animateLogo);
          } else {
            document.body.removeChild(canvas);
            resolve();
          }

          lastTimestamp = timestamp;
        };

        requestAnimationFrame(animateLogo);
      };
    });
  }

  startAnimationLoop() {
    this.displayLogo()
      .then(() => {
        this.loadAssets(loxer);
      })
      .then(() => {
        this.startGame();
      });
  }

  startGame() {
    const canvas = document.createElement("canvas");

    const ctx = canvas.getContext("2d");

    // Make canvas full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.style.margin = "0";
    canvas.style.padding = "0";
    document.body.style.margin = "0";
    document.body.style.padding = "0";

    document.body.appendChild(canvas);

    const animationLoop = () => {
      if (this._isPaused) {
        return; // If paused, exit the animation loop
      }

      // Clear canvas for next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < this.entity.length; i++) {
        this.entity[i].project(ctx); // Call the 'project' method on each entity
      }

      requestAnimationFrame(animationLoop); // Loop animation frames
    };

    animationLoop(); // Start the animation loop
  }

  pauseAnimation() {
    this._isPaused = true;
  }

  resumeAnimation() {
    this._isPaused = false;
  }

  createEntity({ image, animations, x, y, logic, feDy }) {
    const entity = {
      image: new Image(),
      animations: {},
      x: x || 0,
      y: y || 0,
      currentAnimation: null,
      logic: logic || [],
      frameDelay: feDy || 0,
    };

    entity.image.src = image;

    // Map animations to functions
    for (const [animationName, frames] of animations) {
      entity.animations[animationName] = frames;
      entity[animationName] = () => {
        if (entity.currentAnimation !== animationName) {
          entity.currentAnimation = animationName;
          entity.currentFrameIndex = 0;
        }
      };
    }

    entity.project = function (ctx) {
      // Call logic functions
      for (const logicFunc of this.logic) {
        logicFunc.call(this);
      }

      // Display current animation frame
      if (this.currentAnimation) {
        const frameDelay = this.frameDelay;
        const frames = this.animations[this.currentAnimation];
        const currentFrame = frames[this.currentFrameIndex];

        const [frameX, frameY, frameWidth, frameHeight] = currentFrame;

        ctx.drawImage(
          this.image,
          frameX,
          frameY,
          frameWidth,
          frameHeight,
          this.x,
          this.y,
          frameWidth,
          frameHeight
        );

        // Delay before displaying the next frame
        if (frameDelay) {
          if (this.frameDelayCount === undefined) {
            this.frameDelayCount = 0;
          }

          this.frameDelayCount++;

          if (this.frameDelayCount >= frameDelay) {
            this.frameDelayCount = 0;
            this.currentFrameIndex++;
          }
        } else {
          this.currentFrameIndex++;
        }

        if (this.currentFrameIndex >= frames.length) {
          this.currentFrameIndex = 0;
        }
      }
    };

    return entity;
  }
}

