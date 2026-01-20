let canvas;
let world;
let musicCondition = true;
let keyboard = new Keyboard();

document.getElementById("play-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    musicCondition = false;
    document.getElementById("start-screen").style.display = "none";
    world.resume();
    world.sound.play('gameMusic');
});

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);    
    world.pause();
    setupVolumeSlider();
}

function setupVolumeSlider() {
    const volumeSlider = document.getElementById("volume-slider");
    if (!volumeSlider) return;

    volumeSlider.value = world.sound.volume * 100;

    volumeSlider.addEventListener("input", (e) => {
        const volume = e.target.value / 100;
        world.sound.setVolume(volume);
    });
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

document.getElementById("legal-btn").addEventListener("click", () => {
    document.getElementById("legal-notice").style.display = "flex";
});

document.getElementById("close-legal-btn").addEventListener("click", () => {
    document.getElementById("legal-notice").style.display = "none";
});

document.getElementById("pause-btn").addEventListener("click", () => {
    world.togglePause();
    if (document.getElementById("pause-btn-img").src.includes("play")) {
        document.getElementById("pause-btn-img").src = "./assets/pause.png";
    } else {
        document.getElementById("pause-btn-img").src = "./assets/play-buttton.png";
    }   
});

document.getElementById("sound-btn").addEventListener("click", () => {
    world.sound.toggleMute();
    if (document.getElementById("sound-btn-img").src.includes("volume-up")) {
        document.getElementById("sound-btn-img").src = "./assets/mute.png";
    } else {
        document.getElementById("sound-btn-img").src = "./assets/volume-up.png";
    }
});

document.getElementById("restart-btn").addEventListener("click", () => {
    sessionStorage.setItem("skipStart", "true");
    location.reload();
});

document.getElementById("menu-btn").addEventListener("click", () => {
    location.reload();
    world.sound.stop('gameMusic');
    world.sound.play('startMusic');
});

window.addEventListener("load", () => {
    if (sessionStorage.getItem("skipStart") === "true") {
        document.getElementById("start-screen").style.display = "none";
        sessionStorage.removeItem("skipStart");
        init();
        world.resume();
        world.sound.stop('startMusic');
        world.sound.play('gameMusic');
    }
});

document.addEventListener("click", () => {
    if (musicCondition) world.sound.play('startMusic'); 
}, { once: true });

if (sessionStorage.getItem("skipStart") === "true") {
    musicCondition = false;
}