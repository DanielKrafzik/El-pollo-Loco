class MovableObject {
    x = 120;
    y  = 280;
    img;
    height  = 100;
    width = 150;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;


    loadImage(src) {
        this.img = new Image();
        this.img.src = src;
    }

    loadImages(arr) {
        arr.forEach(src => {
            let img = new Image();
            img.src = src;
            this.imageCache[src] = img;
        });
    }

    playAnimation(arr) {
                let i = this.currentImage % arr.length;
                let path = arr[i];
                this.img = this.imageCache[path];
                this.currentImage++;     
    }

    moveRight() {
    
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}
    