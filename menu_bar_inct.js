// Define the Menu class
class Menu {
  constructor(worldObject) {
    this.worldObject = worldObject;
    this.overlay = null;
    this.isMenuOpen = false;
  }

  // Method to toggle the menu
  toggleMenu() {
    if (this.isMenuOpen) {
      // Resume the game
      this.worldObject.resumeGame();

      // Remove the overlay
      if (this.overlay) {
        document.body.removeChild(this.overlay);
        this.overlay = null;
      }
    } else {
      // Darken the surrounding
      this.worldObject.darkenSurrounding();

      // Pause the game
      this.worldObject.pauseGame();

      // Create the overlay
      this.overlay = document.createElement('div');
      this.overlay.className = 'overlay';
      document.body.appendChild(this.overlay);

      // Create the black div in the center
      const blackDiv = document.createElement('div');
      blackDiv.className = 'black-div';
      this.overlay.appendChild(blackDiv);
    }

    // Toggle the menu state
    this.isMenuOpen = !this.isMenuOpen;
  }
}
