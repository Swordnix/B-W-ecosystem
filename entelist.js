    // Load the sprite images
    var spriteImages = {
        drone: new Image(),
        vegetation: new Image(),
        blocks: new Image(),
        p_w_l:new Image(),
        plant_1: new Image(),
        tentacles: new Image(),
        alien_1: new Image()
      };//spriteImages. .src = ["", "purple_wood_locals.png"][alt]
      var alt = 0;
      spriteImages.drone.src = ["https://drive.google.com/uc?export=view&id=1SZJdr1DLmJPu8un89te48m2q4jCK3iEN", "drone.png"][alt];
      spriteImages.vegetation.src = ["https://drive.google.com/uc?export=view&id=1E2YsBNPKYGjoqwKNeRjfUU9IDwfuc2Ap", "vegetation_0x0x0.png"][alt];
      spriteImages.blocks.src = ["https://drive.google.com/uc?export=view&id=1s9fYniEI-k7JyDFYFd16HDkv_JkZoLtR", "blocks_1.png"][alt];
      spriteImages.p_w_l.src = ["https://drive.google.com/uc?id=1gVhD1FXpDwHe7G7VONTiwgp6xkrEQTPJ", "purple_wood_locals.png"][alt]
      spriteImages.plant_1.src = ["https://drive.google.com/uc?id=1-hMjMIGny3l8zNrvARSCP8ganQhtEVrX", "purple_wood_locals.png"][alt]
      spriteImages.tentacles.src = ["https://drive.google.com/uc?id=1_j-7W2ulUZ7xGssSjH8jxVilGjv6XBvk", "purple_wood_locals.png"][alt]
      spriteImages.alien_1.src = ["https://drive.google.com/uc?id=1wD2iSMGc6EQWH-PTVbFflIl_PNWKs-32", "purple_wood_locals.png"][alt]
      
  
        // Define the Drone object
        function Drone(x, y) {
            this.x = x;
            this.y = y;
            this.frameIndex = 0;
            this.framesPerRow = 2;
            this.frameWidth = 80;
            this.frameHeight = 50;
            this.direction = "right"; // Initial direction
            this.propellerFrameIndex = 0;
            this.propellerFrames = 4;
            this.propellerFrameWidth = 50;
            this.propellerFrameHeight = 50;
            this.propellerAnimationSpeed = 150; // Milliseconds per frame
            this.propellerAnimationTimer = 0;
            this.soundFile = "drone_sound.mp3"; 
            this.encountered = "";
    
            // Method to play the drone sound
            this.playSound = function() {
                // Play the audio file
                var audio = new Audio(this.soundFile);
                audio.play();
            };
            
            // Update the drone's position and animation
            this.update = function() {
            // Handle keyboard input
            if (keyState["d"] && keyState["w"]) {
                this.direction = "right";
                this.frameIndex = (this.frameIndex + 1) % 2;
                this.propellerFrameIndex = (this.propellerFrameIndex + 1) % this.propellerFrames;
                this.x += 5;
                this.y -= 5;
            } else if (keyState["a"] && keyState["w"]) {
                this.direction = "left";
                this.frameIndex = (this.frameIndex + 1) % 2;
                this.propellerFrameIndex = (this.propellerFrameIndex + 1) % this.propellerFrames;
                this.x -= 5;
                this.y -= 5;
            } else if (keyState["d"] && keyState["s"]) {
                this.direction = "right";
                this.frameIndex = (this.frameIndex + 1) % 2;
                this.propellerFrameIndex = (this.propellerFrameIndex + 1) % this.propellerFrames;
                this.x += 5;
                this.y += 5;
            } else if (keyState["a"] && keyState["s"]) {
                this.direction = "left";
                this.frameIndex = (this.frameIndex + 1) % 2;
                this.propellerFrameIndex = (this.propellerFrameIndex + 1) % this.propellerFrames;
                this.x -= 5;
                this.y += 5;
            } else if (keyState["d"]) {
                this.direction = "right";
                this.frameIndex = (this.frameIndex + 1) % 2;
                this.propellerFrameIndex = (this.propellerFrameIndex + 1) % this.propellerFrames;
                this.x += 5;
            } else if (keyState["a"]) {
                this.direction = "left";
                this.frameIndex = (this.frameIndex + 1) % 2;
                this.propellerFrameIndex = (this.propellerFrameIndex + 1) % this.propellerFrames;
                this.x -= 5;
            } else if (keyState["w"]) {
                this.direction = "up";
                this.frameIndex = (this.frameIndex + 1) % 2;
                this.propellerFrameIndex = (this.propellerFrameIndex + 1) % this.propellerFrames;
                this.y -= 5;
            } else if (keyState["s"]) {
                this.direction = "down";
                this.frameIndex = (this.frameIndex + 1) % 2;
                this.propellerFrameIndex = (this.propellerFrameIndex + 1) % this.propellerFrames;
                this.y += 5;
            } else {
                this.frameIndex = (this.frameIndex + 1) % 2;
                this.propellerFrameIndex = (this.propellerFrameIndex + 1) % this.propellerFrames;
            }
    
            // Update propeller animation timer
            this.propellerAnimationTimer += 16.67; // Approximate time between animation frames (60 FPS)
            if (this.propellerAnimationTimer >= this.propellerAnimationSpeed) {
                this.propellerFrameIndex = (this.propellerFrameIndex + 1) % this.propellerFrames;
                this.propellerAnimationTimer = 0;
            }
            };
            var frameY;
            // Render the drone on the canvas
            this.render = function() {
            var frameX, propellerFrameX;
    
            // Determine the frame position based on the direction
            if (this.direction === "right") {
                frameX = this.frameIndex % this.framesPerRow;
                frameY = 0;
            } else if (this.direction === "left") {
                frameX = this.frameIndex % this.framesPerRow;
                frameY = 1;
            } else if (this.direction === "up" || this.direction === "down") {
                frameX = this.frameIndex % this.framesPerRow;
                
            }
    
            propellerFrameX = this.propellerFrameIndex * this.propellerFrameWidth;
    
            // Draw the current frame on the canvas
            ctx.drawImage(
                spriteImages.drone,
                frameX * this.frameWidth,
                frameY * this.frameHeight,
                this.frameWidth,
                this.frameHeight,
                this.x,
                this.y,
                this.frameWidth,
                this.frameHeight
            );
    
            // Draw the propellers
            ctx.drawImage(
                spriteImages.drone,
                propellerFrameX,
                200,
                this.propellerFrameWidth,
                this.propellerFrameHeight,
                this.x + 25,
                this.y + 25,
                this.propellerFrameWidth,
                this.propellerFrameHeight
            );
            ctx.drawImage(
                spriteImages.drone,
                propellerFrameX,
                200,
                this.propellerFrameWidth,
                this.propellerFrameHeight,
                this.x + 25,
                this.y + 75,
                this.propellerFrameWidth,
                this.propellerFrameHeight
            );
            };
        }
  
        // Define the Vegetation object
        function Vegetation(x, y) {
            this.x = x;
            this.y = y;
            this.frameIndex = 0;
            this.framesPerRow = 2;
            this.frameWidth = 100;
            this.frameHeight = 100;
            this.animationSpeed = 200; // Milliseconds per frame
            this.animationTimer = 0;
            this.id = "Black string";
            
    
            // Update the vegetation's animation
            this.update = function() {
            // Update animation timer
            this.animationTimer += 16.67; // Approximate time between animation frames (60 FPS)
            if (this.animationTimer >= this.animationSpeed) {
                this.frameIndex = (this.frameIndex + 1) % 4;
                this.animationTimer = 0;
            }
            if ( Math.sqrt(Math.pow(physicsWorld.entities[0].x - this.x, 2) + Math.pow(physicsWorld.entities[0].y - this.y, 2)) < 200 ){
                this.y-=4
            }
            };
    
            // Render the vegetation on the canvas
            this.render = function() {
            var frameX = this.frameIndex % this.framesPerRow;
            var frameY = Math.floor(this.frameIndex / this.framesPerRow);
    
            // Draw the current frame on the canvas
            ctx.drawImage(
                spriteImages.vegetation,
                frameX * this.frameWidth,
                frameY * this.frameHeight,
                this.frameWidth,
                this.frameHeight,
                this.x,
                this.y,
                this.frameWidth,
                this.frameHeight
            );
            };
        }
    
        // Define the Outreacher object
        function Outreacher(x, y) {
        this.x = x;
        this.y = y;
        this.frameIndex = 0;
        this.framesPerRow = 3;
        this.frameWidth = 100;
        this.frameHeight = 100;
        this.animationSpeed = 200; // Milliseconds per frame
        this.animationTimer = 0;
        this.id = "out reachers";
    
        // Update the outreacher's animation
        this.update = function() {
        // Update animation timer
        this.animationTimer += 16.67; // Approximate time between animation frames (60 FPS)
        if (this.animationTimer >= this.animationSpeed) {
            this.frameIndex = (this.frameIndex + 1) % 9;
            this.animationTimer = 0;
        }
        };
    
        // Render the outreacher on the canvas
        this.render = function() {
        var frameX = this.frameIndex % this.framesPerRow;
        var frameY = Math.floor(this.frameIndex / this.framesPerRow);
    
        // Draw the current frame on the canvas
        ctx.drawImage(
            spriteImages.tentacles,
            frameX * this.frameWidth,
            frameY * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.frameWidth,
            this.frameHeight
        );
        };
        }
  
        // Define the Rungus Soot object
        function RungusSoot(x, y) {
            this.x = x;
            this.y = y;
            this.frameIndex = 0;
            this.framesPerRow = 2;
            this.frameWidth = 100;
            this.frameHeight = 100;
            this.animationSpeed = 200; // Milliseconds per frame
            this.animationTimer = 0;
            this.id = "rungus_root";
    
            // Update the rungus soot's animation
            this.update = function() {
            // Update animation timer
            this.animationTimer += 16.67; // Approximate time between animation frames (60 FPS)
            if (this.animationTimer >= this.animationSpeed) {
                this.frameIndex = (this.frameIndex + 1) % this.framesPerRow;
                this.animationTimer = 0;
            }
            };
    
            // Render the rungus soot on the canvas
            this.render = function() {
            var frameX = this.frameIndex;
            var frameY = 0;
    
            // Draw the current frame on the canvas
            ctx.drawImage(
                spriteImages.plant_1,
                frameX * this.frameWidth,
                frameY * this.frameHeight,
                this.frameWidth,
                this.frameHeight,
                this.x,
                this.y,
                this.frameWidth,
                this.frameHeight
            );
            };
        }
  
        //define thhe emerald muck object
        function emerald_muck(x, y) {
        this.x = x;
        this.y = y;
        this.frameIndex = 0;
        this.framesPerRow = 6;
        this.frameWidth = 203;
        this.frameHeight = 203;
        this.animationSpeed = 200; // Milliseconds per frame
        this.animationTimer = 0;
        this.id = "emerald muck";
    
        // Update the muck's animation
        this.update = function() {
        // Update animation timer
        this.animationTimer += 16.67; // Approximate time between animation frames (60 FPS)
        if (this.animationTimer >= this.animationSpeed) {
            this.frameIndex = (this.frameIndex + 1) % (this.framesPerRow * 2);
            this.animationTimer = 0;
        }
    
        if (physicsWorld.find_dist(physicsWorld.entities[0], this)) {
            var direction = Math.sign(physicsWorld.entities[0].x - this.x);
            this.x += direction;
            this.frameIndex = (direction === 1) ? 0 : this.framesPerRow;
        }
        };
    
        // Render the muck on the canvas
        this.render = function() {
        var frameX = this.frameIndex % this.framesPerRow;
        var frameY = Math.floor(this.frameIndex / this.framesPerRow);
    
        // Draw the current frame on the canvas
        ctx.drawImage(
            spriteImages.alien_1,
            frameX * this.frameWidth,
            frameY * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.frameWidth,
            this.frameHeight
        );
        };
        }
  
        //the locals
        function purple_wood_locals(x, y) {
            this.x = x;
            this.y = y;
            this.frameIndex = 0;
            this.framesPerRow = 6;
            this.frameWidth = 100;
            this.frameHeight = 100;
            this.animationSpeed = 200; // Milliseconds per frame
            this.animationTimer = 0;
            this.id = "purple wood local";
            
    
            // Update the local's animation
            this.update = function() {
        // Update animation timer
        this.animationTimer += 16.67; // Approximate time between animation frames (60 FPS)
        if (this.animationTimer >= this.animationSpeed) {
        this.frameIndex = (this.frameIndex + 1) % 4;
        this.animationTimer = 0;
        }
        
        // Play sound occasionally
        if (Math.random() < 0.002 && !this.soundPlayed) { // Adjust the probability (0.01) as desired
        this.playSound();
        this.soundPlayed = true;
        }
        
        // Reset sound played flag
        if (this.animationTimer >= this.animationSpeed - 16.67) {
        this.soundPlayed = false;
        }
        
        if (physicsWorld.find_dist(physicsWorld.entities[0], this)) {
        this.x += Math.sign(physicsWorld.entities[0].x - this.x) * 2;
        }
    };
            this.soundURLs = [
            "https://drive.google.com/uc?id=1UELDV-ZeEjtc2EizgfLiEQB2xjeUfc3x",
            "https://drive.google.com/uc?id=1Q63UDWxbJTxltBzeoZpPoQHEbwjNXHrg",
            "https://drive.google.com/uc?id=1bS9prWC-Juqa7JIBgjfshcW3Sjg8_3mr"
    
            ]
            // Play the sound
            this.playSound = function() {
            var audio = new Audio(this.soundURLs[Math.floor(Math.random()*this.soundURLs.length)]);
            audio.play();
            };    
            // Render the local on the canvas
            this.render = function() {
            var frameX = this.frameIndex % this.framesPerRow;
            var frameY = Math.floor(this.frameIndex / this.framesPerRow);
    
            // Draw the current frame on the canvas
            ctx.drawImage(
                spriteImages.p_w_l,
                frameX * this.frameWidth,
                frameY * this.frameHeight,
                this.frameWidth,
                this.frameHeight,
                this.x,
                this.y,
                this.frameWidth,
                this.frameHeight
            );
            };
        }
  
        // Define the Block object
        function Block(x, y, statex, statey) {
            this.x = x;
            this.y = y;
            this.statex = statex*100
            this.statey = statey*100
        
            this.width = 100; // Set the width of the block
            this.height = 100; // Set the height of the block
    
            // Render the block on the canvas
            this.render = function() {
            // Draw the current frame on the canvas
            ctx.drawImage(
                spriteImages.blocks,
                this.statex,
                this.statey,
                this.width,
                this.height,
                this.x,
                this.y,
                this.width,
                this.height
            );
            };
        }
  
        // Notifier constructor
        function Notifier(options) {
        // Default values
        var defaults = {
            title: "",
            body: "",
            icon: "",
            timeout: 5000
        };
    
        // Merge default options with user-provided options
        this.options = Object.assign({}, defaults, options);
    
        // Create notification container
        this.container = document.createElement("div");
        this.container.classList.add("notifier-container");
    
        // Create notification element
        this.notification = document.createElement("div");
        this.notification.classList.add("notifier-notification");
    
        // Create notification title
        var titleElement = document.createElement("div");
        titleElement.classList.add("notifier-title");
        titleElement.textContent = this.options.title;
    
        // Create notification body
        var bodyElement = document.createElement("div");
        bodyElement.classList.add("notifier-body");
        bodyElement.textContent = this.options.body;
    
        // Append title and body to the notification element
        this.notification.appendChild(titleElement);
        this.notification.appendChild(bodyElement);
    
        // Append the notification element to the container
        this.container.appendChild(this.notification);
    
        // Add the container to the document body
        document.body.appendChild(this.container);
        }
  
        // Show the notification
        Notifier.prototype.show = function() {
        this.container.classList.add("notifier-show");
    
        // Set a timeout to hide the notification after a certain period
        var self = this;
        setTimeout(function() {
            self.hide();
        }, this.options.timeout);
        };
  
        // Hide the notification
        Notifier.prototype.hide = function() {
        this.container.classList.remove("notifier-show");
        };
  
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


        function perlin(x, y) {
            const floorX = Math.floor(x);
            const floorY = Math.floor(y);
            const fractionalX = x - floorX;
            const fractionalY = y - floorY;
          
            const fadeX = fade(fractionalX);
            const fadeY = fade(fractionalY);
          
            const p1 = perm(floorX) + floorY;
            const p2 = perm(floorX + 1) + floorY;
          
            const grad1 = grad(p1, fractionalX, fractionalY);
            const grad2 = grad(p2, fractionalX - 1, fractionalY);
          
            const interp1 = lerp(grad1, grad2, fadeX);
            
            const p3 = perm(floorX) + floorY + 1;
            const p4 = perm(floorX + 1) + floorY + 1;
          
            const grad3 = grad(p3, fractionalX, fractionalY - 1);
            const grad4 = grad(p4, fractionalX - 1, fractionalY - 1);
          
            const interp2 = lerp(grad3, grad4, fadeX);
          
            return (lerp(interp1, interp2, fadeY) + 1) / 2; // Normalize to the range [0, 1]
          }
          function fade(t) {
            return t * t * t * (t * (t * 6 - 15) + 10);
          }
          function lerp(a, b, t) {
            return a + t * (b - a);
          }
          function grad(hash, x, y) {
            const h = hash & 15;
            const u = h < 8 ? x : y;
            const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
            return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
          }
          function perm(x) {
            return ((x * 34) ^ (x << 13)) & 255;
          }
          
          class TerrainArt {
            constructor(startingCoordinate, endingCoordinate) {
              this.startX = Math.floor(startingCoordinate[0] / 100) * 100;
              this.startY = Math.floor(startingCoordinate[1] / 100) * 100;
              this.endX = Math.floor(endingCoordinate[0] / 100) * 100;
              this.endY = Math.floor(endingCoordinate[1] / 100) * 100;
              this.terrainMap = [];
              this.blockCoordinates = [];
            }
          
            generateCoordinates() {
              this.initializeTerrainMap();
              this.markOccupiedBlocks();
              this.generateTerrain();
              this.createCaves();
              this.createMountains();
              this.extractBlockCoordinates();
          
              return this.blockCoordinates;
            }
          
            initializeTerrainMap() {
              const terrainSizeX = Math.floor((this.endX - this.startX) / 100) + 1;
              const terrainSizeY = Math.floor((this.endY - this.startY) / 100) + 1;
          
              for (let i = 0; i < terrainSizeX; i++) {
                this.terrainMap.push(Array(terrainSizeY).fill(0));
              }
            }
          
            markOccupiedBlocks() {
              for (let x = this.startX; x <= this.endX; x += 100) {
                for (let y = this.startY; y <= this.endY; y += 100) {
                  const gridX = Math.floor((x - this.startX) / 100);
                  const gridY = Math.floor((y - this.startY) / 100);
                  this.terrainMap[gridX][gridY] = 1;
                }
              }
            }
          
            generateTerrain() {
              for (let x = 0; x < this.terrainMap.length; x++) {
                for (let y = 0; y < this.terrainMap[0].length; y++) {
                  const noiseValue = perlin(x / 20, y / 20); // Replace perlin with your chosen noise function
                  if (noiseValue > 0.3) {
                    this.terrainMap[x][y] = 1;
                  }
                }
              }
            }
          
            createCaves() {
              for (let i = 0; i < 20; i++) { // Adjust the number of caves as needed
                const startX = Math.floor(Math.random() * this.terrainMap.length);
                const startY = Math.floor(Math.random() * this.terrainMap[0].length);
                this.digCave(startX, startY);
              }
            }
          
            digCave(x, y) {
            if (
              x >= 0 && x < this.terrainMap.length &&
              y >= 0 && y < this.terrainMap[0].length &&
              this.terrainMap[x][y] !== 0
            ) {
              this.terrainMap[x][y] = 0;
              this.digCave(x + 1, y);
              this.digCave(x - 1, y);
              this.digCave(x, y + 1);
              this.digCave(x, y - 1);
            }
          }
          
            createMountains() {
              for (let i = 0; i < 10; i++) { // Adjust the number of mountains as needed
                const startX = Math.floor(Math.random() * this.terrainMap.length);
                const startY = Math.floor(Math.random() * this.terrainMap[0].length);
                this.buildMountain(startX, startY, 10); // Adjust the size of mountains as needed
              }
            }
          
            buildMountain(x, y, size) {
            if (
              x >= 0 && x < this.terrainMap.length &&
              y >= 0 && y < this.terrainMap[0].length &&
              size >= 0 &&
              this.terrainMap[x][y] !== 1
            ) {
              this.terrainMap[x][y] = 1;
              this.buildMountain(x + 1, y, size - 1);
              this.buildMountain(x - 1, y, size - 1);
              this.buildMountain(x, y + 1, size - 1);
              this.buildMountain(x, y - 1, size - 1);
            }
          }
            extractBlockCoordinates() {
              for (let x = 0; x < this.terrainMap.length; x++) {
                for (let y = 0; y < this.terrainMap[0].length; y++) {
                  if (this.terrainMap[x][y] === 1) {
                    const blockX = this.startX + x * 100;
                    const blockY = this.startY + y * 100;
                    this.blockCoordinates.push([blockX, blockY, 0, 0]);
                  }
                }
              }
            }
          }
          
   