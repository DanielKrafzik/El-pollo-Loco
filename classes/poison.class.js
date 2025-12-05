class Poison extends DrawableObject {
    constructor(x, y) {
        super();
        this.loadImage('img/4. Marcadores/Posión/Light - Left.png');
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.offset = {
            top: 25,
            right: 5,
            bottom: 5,
            left: 20
        }
    }
}