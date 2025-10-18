let canvas;
let ctx;
let character = new Image();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    character.src = '../img/1.Sharkie/1.IDLE/1.png';
    ctx.drawImage(character, 0, 0, canvas.width, canvas.height);

    setTimeout(() => {
        ctx.drawImage(character, 0, 0, canvas.width, canvas.height);
    }, 1000);
}