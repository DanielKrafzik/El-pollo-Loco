class World {    
shark = new Shark();
enemies =  [
    new Enemies(),
    new Enemies(),
    new Enemies()
];
endboss = new Endboss();
backgroundObjects = [
    new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 480, 0, 0),    
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 400, 80, 0),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 400, 80, 0),
    new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 480, 0, 0),
    new BackgroundObject('img/3. Background/Legacy/Layers/2. Floor/D1.png', 400, 80, 0),
    new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 480, 0, 720),    
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 400, 80, 720),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 400, 80, 720),
    new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 480, 0, 720),
    new BackgroundObject('img/3. Background/Legacy/Layers/2. Floor/D2.png', 400, 80, 720),
    new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 480, 0, 720 * 2),    
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 400, 80, 720 * 2),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 400, 80, 720 * 2),
    new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 480, 0, 720 * 2),
    new BackgroundObject('img/3. Background/Legacy/Layers/2. Floor/D1.png', 400, 80, 720 * 2),
    new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 480, 0, 720 * 3),
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 400, 80, 720 * 3),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 400, 80, 720 * 3),
    new BackgroundObject('img/3. Background/Layers/1. Light/2.png', 480, 0, 720 * 3),
    new BackgroundObject('img/3. Background/Legacy/Layers/2. Floor/D2.png', 400, 80, 720 * 3),
    new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 480, 0, 720 * 4),    
    new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 400, 80, 720 * 4),
    new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 400, 80, 720 * 4),
    new BackgroundObject('img/3. Background/Layers/1. Light/1.png', 480, 0, 720 * 4),
    new BackgroundObject('img/3. Background/Legacy/Layers/2. Floor/D1.png', 400, 80, 720 * 4)
];
canvas;
ctx;
keyboard;
camera_x = 0;

    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }       

    setWorld() {
        this.shark.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.backgroundObjects.forEach(background => {
            this.ctx.drawImage(background.img, background.x, background.y, background.width, background.height);
        });
        
        this.ctx.drawImage(this.shark.img, this.shark.x, this.shark.y, this.shark.width, this.shark.height);

        this.enemies.forEach(enemy => {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });

        this.ctx.drawImage(this.endboss.img, this.endboss.x, this.endboss.y, this.endboss.width, this.endboss.height);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        });
    }
}