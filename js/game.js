let canvas;
let world;
let keyboard = new Keyboard();

document.getElementById("play-btn").addEventListener("click", () => {
    document.getElementById("start-screen").style.display = "none";
    initGame();
});

function init() {
    canvas = document.getElementById('canvas');    
}

function initGame() {
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
    if(event.keyCode == 68){
        keyboard.D = true;        
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
    if(event.keyCode == 68){
        keyboard.D = false;
    }
});

document.getElementById("fullscreen-btn").addEventListener("click", () => {
    const canvas = document.getElementById("canvas");

    if (!document.fullscreenElement) {
        canvas.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
});

document.addEventListener("fullscreenchange", () => {
    console.log(world);
    
    if (!world) return;

    if (document.fullscreenElement) {
        world.resize(window.innerWidth, window.innerHeight);
    } else {
        world.resize(960, 540);
    }
});


document.getElementById("controls-btn").addEventListener("click", () => {
    document.getElementById("controls-screen").style.display = "flex";
});

document.getElementById("close-controls-btn").addEventListener("click", () => {
    document.getElementById("controls-screen").style.display = "none";
});

document.getElementById("info-btn").addEventListener("click", () => {
    document.getElementById("start-content").style.display = "flex";
});

document.getElementById("return-btn").addEventListener("click", () => {
    document.getElementById("start-content").style.display = "none";
});