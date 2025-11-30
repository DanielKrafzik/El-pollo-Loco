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

    loadImage(src) {
        this.img = new Image();
        this.img.src = src;
    }

    draw(ctx) {
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
    
    drawFrame(ctx) {

        if(this instanceof Shark || this instanceof Enemies || this instanceof Endboss || this instanceof Poison || this instanceof Coin|| this instanceof Bubble) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'orange';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        }
    }
    
    loadImages(arr) {
        arr.forEach(src => {
            let img = new Image();
            img.src = src;
            this.imageCache[src] = img;
        });
    }
    
    collect() {
        this.coinCount++;      
    }

    collectPoison() {
        this.poisonCount++;      
    }

}