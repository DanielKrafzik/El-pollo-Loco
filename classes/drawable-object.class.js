class DrawableObject  {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y  = 280;
    height  = 100;
    width = 150;
    coinCount = 0;
    poisonCount = 0;
    offset = {
        top:0,
        right:0,
        bottom:0,
        left:0
    };
    world = null;

    /**
     * Sets the current world context for this object.
     * @param {Object} world - The world instance to associate with this object.
     */
    setWorld(world) {
        this.world = world;
    }

    /**
     * Loads an image from the specified source path.
     * @param {string} src - The source path of the image to load.
     * @returns {void}
     */
    loadImage(src) {
        this.img = new Image();
        this.img.src = src;
    }

    /**
     * Draws the object on the canvas with rotation support.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context
     * @returns {void}
     * 
     * @description
     * Renders the image at the object's position with rotation applied around its center.
     * The image is translated to its center point, rotated, and then drawn with the
     * center as the origin. Canvas state is saved and restored to prevent affecting
     * other draw operations.
     */
    draw(ctx) {
        if (!this.img) return;
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(
            this.img,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );
        ctx.restore();
    }
    
    /*drawFrame(ctx) {

        if(this instanceof Shark || this instanceof Enemies || this instanceof Endboss || this instanceof Poison || this instanceof Coin|| this instanceof Bubble) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'orange';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
        ctx.stroke();
        }
    }*/
    
    /**
     * Loads images from an array of source paths and caches them.
     * @param {string[]} arr - An array of image source paths to load
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach(src => {
            let img = new Image();
            img.src = src;
            this.imageCache[src] = img;
        });
    }
    
    /**
     * Increments the coin count by one.
     * Called when a coin is collected.
     */
    collect() {
        this.coinCount++;      
    }

    /**
     * Increments the poison count by one.
     * This method is called when the player collects a poison item.
     * 
     * @returns {void}
     */
    collectPoison() {
        this.poisonCount++;      
    }

}