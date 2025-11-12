class DrawableObject  {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y  = 280;
    height  = 100;
    width = 150;

    loadImage(src) {
        this.img = new Image();
        this.img.src = src;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    loadImages(arr) {
        arr.forEach(src => {
            let img = new Image();
            img.src = src;
            this.imageCache[src] = img;
        });
    }
}