/* self created
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
}); */

// video
let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (event) => {
    if(event.keyCode == 39){
        keyboard.RIGHT = true;
    }
    if(event.keyCode == 37){
        keyboard.LEFT = true;
    }
    if(event.keyCode == 38){
        keyboard.UP = true;
    }
    if(event.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(event.keyCode == 32){
        keyboard.SPACE = true;
    }
});

window.addEventListener('keyup', (event) => {
    if(event.keyCode == 39){
        keyboard.RIGHT = false;
    }
    if(event.keyCode == 37){
        keyboard.LEFT = false;
    }
    if(event.keyCode == 38){
        keyboard.UP = false;
    }
    if(event.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(event.keyCode == 32){
        keyboard.SPACE = false;
    }
});