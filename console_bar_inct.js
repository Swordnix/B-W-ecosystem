    const ConsoleBar = {
      container: null,
      consoleDiv: null,
      inputBar: null,
      cheatHistory: [],
      
      initialize: function() {
        // Create the console container
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '300px';
        this.container.style.height = '100%';
        this.container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        this.container.style.color = 'white';
        this.container.style.padding = '10px';
        this.container.style.overflowY = 'scroll';
        this.container.style.display = 'none';

        // Create the console div
        this.consoleDiv = document.createElement('div');
        this.consoleDiv.style.height = 'calc(100% - 50px)';
        this.consoleDiv.style.marginBottom = '10px';
        this.consoleDiv.style.overflowWrap = 'break-word';
        this.consoleDiv.style.fontFamily = 'system-ui';
        this.container.appendChild(this.consoleDiv);

        // Create the input bar
        this.inputBar = document.createElement('input');
        this.inputBar.style.width = '100%';
        this.inputBar.style.height = '20px';
        this.inputBar.style.backgroundColor = 'transparent';
        this.inputBar.style.border = 'none';
        this.inputBar.style.color = 'white';
        this.inputBar.style.outline = 'none';
        this.inputBar.style.fontFamily = 'system-ui';
        this.inputBar.placeholder = 'Type a cheat...';
        this.container.appendChild(this.inputBar);

        // Add event listeners
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.inputBar.addEventListener('keydown', this.handleInputKeyDown.bind(this));
      },

      handleKeyDown: function(event) {
        if (event.key === 'ArrowRight') {
          this.showConsole();
        } else if (event.key === 'ArrowLeft') {
          this.hideConsole();
        }
      },

      handleInputKeyDown: function(event) {
        if (event.key === 'Enter') {
          const input = this.inputBar.value.trim();
          this.cheatHistory.push(input);
          this.consoleDiv.innerHTML += ">>> " + input + '<br>';
          this.executeCheat(input);
          this.inputBar.value = '';
        }
      },

      executeCheat: function(cheat) {
        if (cheat.startsWith('goto ')) {
          const coordinates = cheat.replace('goto ', '').split(' ');
          if (coordinates.length === 2) {
            const x = parseFloat(coordinates[0]);
            const y = parseFloat(coordinates[1]);
            if (!isNaN(x) && !isNaN(y)) {
              // Execute the cheat
              physicsWorld.entities[0].x = x;
              physicsWorld.entities[0].y = y;
              console.log('Cheat executed:', cheat);
              return;
            }
          }
        }

        // If cheat is not recognized, execute as JavaScript code
        try {
          eval(cheat);
          console.log('Cheat executed:', cheat);
        } catch (error) {
          console.error('Invalid cheat:', cheat);
        }
      },

      showConsole: function() {
        this.container.style.display = 'block';
      },

      hideConsole: function() {
        this.container.style.display = 'none';
      }
    };

// Initialize the ConsoleBar object
//ConsoleBar.initialize();

// Add the console container to the document body
//document.body.appendChild(ConsoleBar.container);
