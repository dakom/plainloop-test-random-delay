const canvas = document.getElementById("canvas");
const ctx = document.getElementById("canvas").getContext("2d");

const radius = 50;
const position = {x: window.innerWidth/2, y: window.innerHeight/2};
const speed = .4;
const direction = {x: 1, y: 1};
let windowSize = {width: window.innerWidth, height: window.innerHeight};
let last_timestamp;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
    windowSize = {width: window.innerWidth, height: window.innerHeight};
});

requestAnimationFrame(gameLoop);

function gameLoop(timestamp) {
    requestAnimationFrame(gameLoop);
    if(last_timestamp != undefined) {
        updatePhysics(timestamp - last_timestamp);
        render();
    }
    last_timestamp = timestamp;

    delay(Math.random() * 12);
}

function delay(ms) {
    for(let start_time = performance.now(); performance.now() - start_time < ms;) { ; }
}

function updatePhysics(dt) {
    position.x += speed * dt * direction.x;
    position.y += speed * dt * direction.y;

    //not perfect but good enough
    if(position.x <= radius && direction.x === -1) {
        direction.x = 1;
    }
    if(position.x >= (windowSize.width - radius) && direction.x === 1) {
        direction.x = -1;
    }
    if(position.y <= radius && direction.y == -1) {
        direction.y = 1;
    }
    if(position.y >= (windowSize.height- radius) && direction.y === 1) {
        direction.y = -1;
    }
}

function render(interpolation) {
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
}