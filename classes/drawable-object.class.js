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

    setWorld(world) {
        this.world = world;
    }

    loadImage(src) {
        this.img = new Image();
        this.img.src = src;
    }

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
    
    drawFrame(ctx) {

        if(this instanceof Shark || this instanceof Enemies || this instanceof Endboss || this instanceof Poison || this instanceof Coin|| this instanceof Bubble) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'orange';
        ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
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