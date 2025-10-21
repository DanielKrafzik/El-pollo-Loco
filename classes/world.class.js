class World {    
shark = new Shark();
backgroundObjects = [
    new BackgroundObject('img/3. Background/Layers/5. Water/D1.png'),
    new BackgroundObject('img/3. Background/Legacy/Layers/2. Floor/D1.png')
];
canvas;
ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.backgroundObjects.forEach(background => {
            this.ctx.drawImage(background.img, background.x, background.y, background.width, background.height);
        });
        
        this.ctx.drawImage(this.shark.img, this.shark.x, this.shark.y, this.shark.width, this.shark.height);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }
}