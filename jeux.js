const launch = document.querySelector(".launch");
const map = document.querySelector(".game");
launch.addEventListener('click', ()=> {
        map.style.display = "flex";
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
    if(window.innerWidth <= 1199 || window.innerHeight <= 910) {
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
    trucs.push({x: building.x+500, y: map.height/2, color: "white", icon: "\uf1ad", velocityX: decorvelocityX});
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
function decor7() {
    trucs.push({x: building.x+726, y: map.height/3, color: "gray", icon: "\uf64f", velocityX: decorvelocityX});
}
function decor8() {
    trucs.push({x: building.x+560, y: map.height/3, color: "white", icon: '\uf549', velocityX: decorvelocityX});
}
function decor9() {
    trucs.push({x: building.x+657, y: map.height/3, color: "gray", icon: '\uf64f', velocityX: decorvelocityX});
}
function decor10() {
    trucs.push({x: building.x, y: map.height/3, color: "gray", velocityX: decorvelocityX, icon:"\uf64f"});
}
function decor11() {
    trucs.push({x: building.x+415, y: map.height/3, color: "gray", icon: '\uf275', velocityX: decorvelocityX});
}
function decor12() {
    trucs.push({x: building.x+253, y: map.height/3, color: "gray", icon: "\uf549", velocityX: decorvelocityX});
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
        if(truc.color === 'white'||truc.color === 'gray') {
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
    context.fillText(`@makilaaz0`, monblaze.x, monblaze.y);
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
function modePotrait() {
    const rotation = window.matchMedia("(orientation: portrait)").matches;
    console.log("Hauteur de la fenêtre :", window.innerHeight);
    console.log("Orientation portrait :", rotation);
    if (window.innerHeight <= 950 && rotation) {
        map.height = window.innerHeight;
        map.width = window.innerWidth;
        // Effacer le canvas avant de dessiner
        context.clearRect(0, 0, map.width, map.height);
        // Charger la vidéo
        const video = document.createElement('video');
        video.src = './Rotate your phone screen to landscape  no copyright video  free download link.mp4'; // Remplacez par le chemin de votre vidéo
        video.autoplay = true;
        video.loop = true;
        video.muted = true; // Désactiver le son pour éviter les restrictions des navigateurs
        // Dessiner la vidéo sur le canvas une fois qu'elle est prête
        video.onloadeddata = () => {
            console.log("Vidéo chargée :", video.src);
            // Calculer les dimensions pour conserver les proportions
            const maxWidth = map.width / 4; // Par exemple, 50% de la largeur du canvas
            const maxHeight = map.height / 4; // Par exemple, 50% de la hauteur du canvas
            let videoWidth = video.videoWidth;
            let videoHeight = video.videoHeight;

            if (videoWidth > maxWidth || videoHeight > maxHeight) {
                const widthRatio = maxWidth / videoWidth;
                const heightRatio = maxHeight / videoHeight;
                const scale = Math.min(widthRatio, heightRatio); // Choisir le ratio le plus petit pour conserver les proportions

                videoWidth *= scale;
                videoHeight *= scale;
            }
            // Calculer les coordonnées pour centrer la vidéo
            const centerX = map.width / 2 - videoWidth / 2;
            const centerY = map.height / 2 - videoHeight / 2;

            // Dessiner la vidéo sur le canvas à chaque frame
            function drawVideo() {
                context.clearRect(0, 0, map.width, map.height); // Effacer le canvas
                context.drawImage(video, 0, 0, videoWidth, videoHeight);
                requestAnimationFrame(drawVideo); // Boucle pour redessiner la vidéo
            }
            drawVideo(); // Démarrer le dessin de la vidéo
        };

        // Gérer les erreurs de chargement
        video.onerror = () => {
            console.error("Erreur lors du chargement de la vidéo :", video.src);
            console.error("Vérifiez le chemin et la présence du fichier.");
        };
    } else {
        console.log("Condition non remplie pour afficher la vidéo.");
    }
}
function modelandscape() {

}
function initializedecor() {
    decor1();
    decor2();
    decor3();
    decor4();
    decor5();
    decor6();
    decor7();
    decor8();
    decor9();
    decor10();
    decor11();
    decor12();
}
function rotationdetection() {
    const rotation = window.matchMedia("(orientation: landscape)").matches;
    if (window.innerHeight <= 910 && rotation)  {
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
//   modePotrait();
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
let touchStartX = 0;
let touchEndX = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX; // Enregistre la position de départ du toucher
});
document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX; // Enregistre la position de fin du toucher
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > 30) { // Seuil minimum de 30 pixels
        console.log("Swipe detected");
        if (touchEndX) {
            reloadAnimation();
        }
    }
});
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
