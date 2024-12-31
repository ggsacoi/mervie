const launch = document.querySelector(".launch");
const map = document.querySelector(".game");
launch.addEventListener('click', ()=> {
        map.style.display = "flex";
        document.addEventListener('click', (e) => {reloadAnimation();});
});
map.height = window.innerHeight/2;
map.width = window.innerWidth/2;
if(window.innerWidth <= 1199) {
    map.height = window.innerHeight;
    map.width = window.innerWidth;
}
const context = map.getContext("2d");
let gravity = 2;
let velocityX = 1.5;
let decorvelocityX = 0.8;
let Objects = [];
let trucs = [];
let frameCount = 0;
let isAnimating = false;
let animation;
let scoreCount = 0;
const obstacleP = map.height/2+70;
const upstacleP =  map.height/2+70-90;
let building = {
    x: map.width,
    y: map.height/2,
};
let sun = {
    x: map.width/4,
    y: map.height/4,
    color: "white",
    icon: "\uf185",
    vitesseX: 0.004
};
let monblaze = {
    x: map.width,
    y: map.height-70,
    color: 'white',
    vitesseX: 0.2
};
let mervie = {
    x: map.width/2+map.width,
    y: map.height-70,
    color: 'white',
    vitesseX: 0.2
};
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
    if(window.innerWidth <= 1199) {
        ground.height = window.innerWidth;
     }
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
function decor1() {
    trucs.push({x: building.x+750, y: map.height/2, color: "white", icon: "\uf1ad", velocityX: decorvelocityX});
}
function decor2() {
    trucs.push({x: building.x+800, y: map.height/2, color: "white", icon: '\uf1ad', velocityX: decorvelocityX});
}
function decor3() {
    trucs.push({x: building.x+500, y: map.height/2, color: "white", icon: '\uf1ad', velocityX: decorvelocityX});
}
function decor4() {
    trucs.push({x: building.x, y: map.height/2, color: "white", velocityX: decorvelocityX, icon:"\uf1ad"});
}
function decor5() {
    trucs.push({x: building.x+150, y: map.height/2, color: "white", icon: '\uf1ad', velocityX: decorvelocityX});
}
function decor6() {
    trucs.push({x: building.x+300, y: map.height/2, color: "white", icon: "\uf1ad", velocityX: decorvelocityX});
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
    context.fillText(`presse sur S pour quitter`, map.width-230, map.height-40);
    context.fillText(`press on S to quite`, map.width-230, map.height-20);
    cancelAnimationFrame(animationFrame);
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
function thesun() {
    context.font = "30px FontAwesome";
    context.fillStyle = sun.color;
    context.fillText(sun.icon, sun.x, sun.y);
    sun.x += sun.vitesseX;
    if (sun.x >= map.width) {
        sun.x = -30;
    }
}
function drawdecor() {
    trucs.forEach((truc) => {
        if(truc.color === "white") {
            context.font = "30px FontAwesome";
            context.fillStyle = truc.color;
            context.fillText(truc.icon, truc.x, truc.y);
        }
    })
}
function movedecor() {
    trucs.forEach((truc) =>{
        if(truc.color === 'white') {
            truc.x -= truc.velocityX;
    if (truc.x <= -50) {
        truc.x = map.width;
    }
        }
    })
}
function blaze() {
    context.font = "20px Aial";
    context.fillStyle = monblaze.color;
    context.fillText(`@makilapetoaz0`, monblaze.x, monblaze.y);
    monblaze.x -= monblaze.vitesseX;
    if (monblaze.x <= 0-120) {
        monblaze.x = map.width;
    }
}
function aka() {
    context.font = "20px Aial";
    context.fillStyle = mervie.color;
    context.fillText(`Mervie`, mervie.x, mervie.y);
    mervie.x -= mervie.vitesseX;
    if (mervie.x <= 0-120) {
        mervie.x = map.width;
    }
}
function initializedecor() {
    decor1();
    decor2();
    decor3();
    decor4();
    decor5();
    decor6();
}
function rotationdetection() {
    const rotation = window.matchMedia("(orientation: landscape)").matches;
    if (window.innerHeight <= 1000 && rotation)  {
        map.height = window.innerHeight;
        map.width = window.innerWidth;
    }
}
function animate() {
    space();
    thesun();
    blaze();
    aka();
    drawdecor();
    movedecor();
    ground();
    score();
    moveobstacle();
    moveobjects();
    drawObstacles();
    collision();
    rotationdetection();
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
    thesun();
    blaze();
    drawdecor();
    movedecor();
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
document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyS') {
        map.style.display = "none";
    }
});
document.addEventListener('click', (e) => {if(!isAnimating) {isAnimating = true; frameCount = 0;}});
initializeObstacles()
initializedecor()
mainobject()
animation = requestAnimationFrame(animate);
