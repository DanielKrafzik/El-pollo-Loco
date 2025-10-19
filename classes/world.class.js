class World {    
shark = new Shark();
canvas;
ctx;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.shark.img, this.shark.x, this.shark.y, this.shark.width, this.shark.height);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }
}