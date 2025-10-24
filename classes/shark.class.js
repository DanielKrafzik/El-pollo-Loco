class Shark extends MovableObject {

    IMAGES_SWIMMING = [
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png'
    ];

    constructor() {
        super();
        this.x = 0;
        this.loadImage('img/1.Sharkie/3.Swim/1.png');
        this.loadImages(this.IMAGES_SWIMMING);
    }

    loadImages(arr) {

        setInterval(() => {            
            this.img = new Image();
            this.img.src = arr[this.imgCounter];
            this.imgCounter++;
            if (this.imgCounter >= arr.length) {
                this.imgCounter = 0;
            }
        }, 100);
    }
}