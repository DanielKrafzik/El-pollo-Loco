class Enemies extends MovableObject {

    IMAGES_SWIMMING = [
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim4.png',
        'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim5.png'
    ];

    constructor() {
        super();
        this.x = Math.random() * 500 + 120;
        this.y = Math.random() * 400;
        this.loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
        this.loadImages(this.IMAGES_SWIMMING);
    }

    loadImages(arr) {

        setInterval(() => {          
            this.x -= 5;  
            this.img = new Image();
            this.img.src = arr[this.imgCounter];
            this.imgCounter++;
            if (this.imgCounter >= arr.length) {
                this.imgCounter = 0;
            }
        }, 100);
    }
}