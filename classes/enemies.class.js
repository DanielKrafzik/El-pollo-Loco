class Enemies extends MovableObject {
    constructor() {
        super();
        this.x = Math.random() * 500 + 120;
        this.loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
    }
}