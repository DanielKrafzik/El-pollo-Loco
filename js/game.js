let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

document.addEventListener(('keydown'), (event) => {
    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = true;        
    }
    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = true;        
    }
    if (event.key === 'ArrowUp') {
        world.keyboard.UP = true;
    }
    if (event.key === 'ArrowDown') {
        world.keyboard.DOWN = true;
    }
    if (event.key === ' ') {
        world.keyboard.SPACE = true;
    }
});

document.addEventListener(('keyup'), (event) => {
    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = false;        
    }
    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = false;        
    }
    if (event.key === 'ArrowUp') {
        world.keyboard.UP = false;
    }
    if (event.key === 'ArrowDown') {
        world.keyboard.DOWN = false;
    }
    if (event.key === ' ') {
        world.keyboard.SPACE = false;
    }
});