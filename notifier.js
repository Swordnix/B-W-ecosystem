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
