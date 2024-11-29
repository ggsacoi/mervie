const launch = document.querySelector(".launch");
const map = document.querySelector(".game");
map.height = window.innerHeight/2;
map.width = window.innerWidth/2;
const context = map.getContext("2d");
let gravity = 2;
let velocityX = 1.5;
let Objects = [];
let frameCount = 0;
let isAnimating = false;
let animation;
let scoreCount = 0;
const obstacleP = map.height/2+70;
const upstacleP =  map.height/2+70-90;
function randomXPosition(options) {
    return options[Math.floor(Math.random() * options.length)];
}
function space() {
    map;
    context.fillStyle = "black";
    context.fillRect(0, 0, map.width, map.height);
}
function ground() {
    const ground = map.getContext('2d');
    ground.height = window.innerWidth/2;
    ground.width = 2;
    ground.fillStyle = 'white';
    ground.fillRect(0, map.height/2+100, ground.height, ground.width);
};
function mainobject() {
    Objects.push({ height: 30, width: 30, x: 200, y: obstacleP, color: 'white'});
}
function obstacleM() {
    Objects.push({ height: 30, width: 30, x: randomXPosition([400, 300]), y: obstacleP, color: 'purple', val: 1000});
}
function obstacleL() {
    Objects.push({ height: 30, width: 60, x: randomXPosition([750, 800]), y: obstacleP, color: 'purple', val: 3000});
}
function upstacleH() {
    Objects.push({ height: 60, width: 30, x: randomXPosition([900, 950]), y: upstacleP, color: 'purple', val: 5000});
}
function upstacle() {
    Objects.push({ height: 30, width: 30, x: randomXPosition([550, 620]), y: upstacleP, color: 'purple', val: 7000});
}
function moveobstacle() {
    Objects.forEach((obj) => {
    if(obj.color === 'purple') {
    obj.x -= velocityX;
    if (obj.x <= 0 - obj.width) {
        switch (obj.val) {
            case 1000:
                obj.x = randomXPosition([map.width+400, map.width+300]);
                break;
            case 3000:
                obj.x = randomXPosition([map.width+750, map.width+800]);
                break;
            case 5000:
                obj.x = randomXPosition([map.width+900, map.width+950]);
                break;
            case 7000:
                obj.x = randomXPosition([map.width+550, map.width+620]);
                break;
        }
    }
}
});
}
function moveobjects() {
    Objects.forEach((obj) => {
        if(obj.color === "white") {
        if(isAnimating) {
        obj.y -= gravity;
        frameCount++;
        if(isAnimating >= 30) {
            isAnimating = false;
            frameCount = 0;
        }
        if(obj.y <= upstacleP) {
            obj.y = upstacleP;
            isAnimating = false;
        }
    } else {
            obj.y += gravity;
            if (obj.y >= map.height / 2 + 100 - obj.height) {
                obj.y = map.height / 2 + 100 - obj.height;
            }
        }
    }
    });
}
function drawObstacles() {
    Objects.forEach((obj) => {
        context.fillStyle = obj.color;
        context.fillRect(obj.x, obj.y, obj.width, obj.height);
    });
}
function collision() {
   Objects.forEach((obj) =>{
   if (obj.color === "purple") {
    const player = Objects.find(o => o.color === 'white');
    if(
        obj.x < player.x + player.width &&
        obj.x + obj.width > player.x &&
        obj.y < player.y + player.height &&
        obj.y + obj.height > player.y
    ) {
        gameover();
    }
   }
});
}
function gameover() {
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`GAME OVER`, map.width/2-60, map.height/2);
    context.fillText(`clique sur R pour rejouer`, 20, map.height-40);
    context.fillText(`click on R to replay`, 20, map.height-20);
    cancelAnimationFrame(animationFrame);
}

function replay() {
    context.fillStyle = 'white';
    context.font = '20px Arial';
    context.fillText(`REPLAY`, map.width-125, map.height-125);
}
function score() {
    context.fillStyle = 'white';
    context.font = '20px Arial';
        context.fillStyle = 'white';
        context.font = '20px Arial';
    context.fillText(`score: ${scoreCount}`, map.width-125, 30);
}
function initializeObstacles() {
    obstacleM();
    obstacleL();
    upstacleH();
    upstacle();
}
function animate() {
    space();
    ground();
    score();
    moveobstacle();
    moveobjects();
    drawObstacles();
    collision();
    animation = requestAnimationFrame(animate);
    scoreCount += 1;
}
function reloadAnimation() {
    cancelAnimationFrame(animation);
    context.clearRect(0, 0, map.width, map.height);
    Objects = [];
    frameCount = 0;
    scoreCount = 0;
    isAnimating = false;
    initializeObstacles();
    mainobject();
    score();
    animation = requestAnimationFrame(animate);
}
document.addEventListener('keydown', (e) => {
    if(e.code == 'KeyW' || 'ArrowUp' || 'KeyZ' && !isAnimating) {
        isAnimating = true;
        frameCount = 0;
    }
    if(e.code == 'KeyR') {
       reloadAnimation();
    }
});
initializeObstacles()
mainobject()
animation = requestAnimationFrame(animate);