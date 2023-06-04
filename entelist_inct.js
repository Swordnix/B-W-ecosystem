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
  

  
          
 
