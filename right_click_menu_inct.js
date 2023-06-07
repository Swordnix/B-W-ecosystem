var CustomContextMenu = {
    menuItems: [],
    menuBox: null,
    playButton: null,
    physicsWorld: {
      running: true
    },
  
    activate: function() {
      // Create the menu box element
      this.menuBox = document.createElement('div');
      this.menuBox.classList.add('menu-box');
      this.menuBox.style.width = '200px';
      this.menuBox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      this.menuBox.style.position = 'fixed';
      this.menuBox.style.zIndex = '9999';
  
      // Create the "Pause" button
      this.playButton = document.createElement('div');
      this.playButton.textContent = 'Pause';
      this.playButton.style.padding = '10px';
      this.playButton.style.cursor = 'pointer';
      this.playButton.style.color = '#fff';
      this.playButton.style.fontWeight = 'bold';
  
      // Add smooth glow effect on hover
      this.playButton.classList.add('menu-item');
  
      // Add click event listener to the "Pause" button
      this.playButton.addEventListener('click', function() {
        if (this.playButton.textContent == 'Pause') {
          physicsWorld.toggle_pause_or_play()
          this.playButton.textContent = 'Play';
          this.darkenPage();
        } else {
          physicsWorld.toggle_pause_or_play()
          this.playButton.textContent = 'Pause';
          this.undarkenPage();
        }
      }.bind(this));
  
      // Append the "Pause" button to the menu box
      this.menuBox.appendChild(this.playButton);
  
      // Add menu items to the menu box
      for (var i = 0; i < this.menuItems.length; i++) {
        var menuItem = document.createElement('div');
        menuItem.textContent = this.menuItems[i];
        menuItem.style.padding = '10px';
        menuItem.style.cursor = 'pointer';
  
        // Add smooth glow effect on hover
        menuItem.classList.add('menu-item');
  
        // Add click event listener to each menu item
        menuItem.addEventListener('click', function(item) {
          return function() {
            console.log('Clicked:', item);
            this.menuBox.style.display = 'none';
          }.bind(this);
        }.bind(this)(this.menuItems[i]));
  
        // Append menu item to the menu box
        this.menuBox.appendChild(menuItem);
      }
  
      // Calculate the menu box position based on the right-click event
      var handleRightClick = function(event) {
        event.preventDefault();
  
        var menuBoxHeight = (this.menuItems.length + 1) * 30; // +1 for the "Pause" button
        var clickX = event.clientX;
        var clickY = event.clientY;
  
        // Adjust menu box position if it goes beyond window boundaries
        var menuBoxWidth = this.menuBox.offsetWidth;
        var menuBoxHeight = this.menuBox.offsetHeight;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
  
        if (clickX + menuBoxWidth > windowWidth) {
          clickX = windowWidth - menuBoxWidth;
        }
  
        if (clickY + menuBoxHeight > windowHeight) {
          clickY = windowHeight - menuBoxHeight;
        }
  
        // Set the menu box position
        this.menuBox.style.left = clickX + 'px';
        this.menuBox.style.top = clickY + 'px';
  
        // Show the menu box
        this.menuBox.style.display = 'block';
      }.bind(this);
  
      // Hide the menu box when clicked outside
      var handleDocumentClick = function(event) {
        if (!this.menuBox.contains(event.target)) {
          this.menuBox.style.display = 'none';
        }
      }.bind(this);
  
      // Function to darken the page
      this.darkenPage = function() {
        var darkOverlay = document.createElement('div');
        darkOverlay.classList.add('dark-overlay');
        document.body.appendChild(darkOverlay);
      };
      // Function to undarken the page
      this.undarkenPage = function() {
        var darkOverlay = document.querySelector('.dark-overlay');
        if (darkOverlay) {
          darkOverlay.remove();
        }
      };
      // Attach right-click and document click event listeners
      document.addEventListener('contextmenu', handleRightClick);
      document.addEventListener('click', handleDocumentClick);
  
      // Append the menu box to the document body
      document.body.appendChild(this.menuBox);
    }
  };


/* requirements.jssi 

>>> for running perfectly, you need to add these styles
:pull

<style>
      .menu-item {
      transition: background-color 0.3s ease;
    }

    .menu-item:hover {
      background-color: green;
    }
</style>

>>> use it like this:

// Usage:
CustomContextMenu.menuItems = ['Button 1?', 'Button 2?', 'Button 3?'];
CustomContextMenu.activate();

>>> !! physicsWorld.toggle_pause_or_play() is a foreign object. This menu system is designed for a game. You have been warned !!

:anyways$$ >
    physicsWorld.toggle_pause_or_play: function(){console.log("as")}

*/
  