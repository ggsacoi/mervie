const launch = document.querySelector(".launch");
const map = document.getElementById("game");
const SUPABASE_URL = "https://wlmvwbustnfmezngrvhu.supabase.co";  // Remplace par ton URL
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsbXZ3YnVzdG5mbWV6bmdydmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1NTMxMTcsImV4cCI6MjA2MTEyOTExN30.4Ox59Y93pcjlV0RTnpANlDInwJe8R9HqdS12a07qfWs";  // Remplace par ta clé

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
map.height = window.innerHeight/2;
map.width = window.innerWidth/2;
if(window.innerWidth <= 1199) {
    map.height = window.innerHeight;
    map.width = window.innerWidth;
}
const nameInput = document.createElement("input");
    nameInput.type = 'text';
    nameInput.placeholder = 'entrez votre nom ici';
    nameInput.style.left = (map.offsetLeft + 1200) + 'px';
    nameInput.style.top = (map.offsetTop + 690) + 'px';
    nameInput.style.backgroundColor = 'black';
    nameInput.style.zIndex = 10;
    nameInput.style.position = 'fixed';
    nameInput.style.height = '30px';
    nameInput.style.borderRadius = '5px';
    nameInput.style.color = 'white';
    document.body.appendChild(nameInput);
    nameInput.style.display = 'none';
    const nom = nameInput.value;
launch.addEventListener('click', ()=> {
        map.style.display = "flex";
        nameInput.style.display = 'flex';
});
nameInput.addEventListener('keydown', async (event) => {
    // On ne déclenche que si l'utilisateur appuie sur la touche « Enter »
    if (event.key === 'Enter') {
      event.preventDefault();                   // Évite tout comportement par défaut
      const nom = nameInput.value.trim();       // ← Récupère nameInput.value AU BON MOMENT !
  
      // Vérification du nom
      if (nom.length === 0) {
        return alert("Veuillez entrer un nom valide !");
      }
       // Cache le champ de saisie
       nameInput.style.display = 'none';
      // Insertion dans Supabase
            try {
                // Vérifie si le nom existe déjà dans la base de données
                const { data: existingUser, error: selectError } = await supabase
                    .from('podium')
                    .select('*')
                    .eq('name', nom)
                    .single();
    
                if (selectError && selectError.code !== 'PGRST116') {
                    // Si une erreur autre que "aucune ligne trouvée" se produit
                    throw selectError;
                }
    
                if (existingUser) {
                    // Si le nom existe déjà
                    alert('Ton nom est déjà enregistré clique sur OK pour reprendre avec ce nom!');
                    sessionStorage.setItem('name', nom);
                    nameInput.style.display = 'none';
                    return;
                }
    
                // Insère le nouveau nom dans la base de données
                const { data, error: insertError } = await supabase
                    .from('podium')
                    .insert([{ name: nom }]);
    
                if (insertError) throw insertError;
    
                // Enregistrement réussi
                nameInput.style.display = 'none';
                sessionStorage.setItem('name', nom);
                console.log("Nom enregistré :", data);
                alert(`Mervie: Wesh ${nom} ! tu peux jouer ✅`);
            } catch (err) {
                console.error("Erreur Supabase :", err);
                alert("Erreur lors de l'enregistrement !");
            }
    }
  });  
  let topScores = []; // Tableau pour stocker les meilleurs scores
  let theScore = 0; // Meilleur score
  let sScore = 0;
  let tScore = 0;
  let qScore = 0;
  let cScore = 0;
  let theName = "Anonyme"; // Nom associé au meilleur score
  let sName = "Anonyme";
  let tName = "Anonyme";
  let qName = "Anonyme";
  let cName = "Anonyme";
  
  (async function veriftopScore() {
      try {
          const { data: rows, error } = await supabase
              .from('podium')
              .select('score, name') // Sélectionne les scores et les noms
              .order('score', { ascending: false })
              .limit(5); // Limite à 3 résultats
  
          if (error) {
              console.error('Erreur Supabase lors du select :', error);
              return; // Arrête l'exécution si une erreur survient
          }
  
          if (rows && rows.length > 0) {
              // Récupère les scores et noms dans un tableau
              topScores = rows.map(row => ({
                  name: row.name || "Anonyme", // Utilise "Anonyme" si le nom est vide
                  score: parseFloat(row.score) || 0
              }));
  
              // Stocke les scores et noms dans des variables distinctes
              theScore = topScores[0]?.score || 0;
              theName = topScores[0]?.name || "Anonyme";
  
              sScore = topScores[1]?.score || 0;
              sName = topScores[1]?.name || "Anonyme";
  
              tScore = topScores[2]?.score || 0;
              tName = topScores[2]?.name || "Anonyme";

              qScore = topScores[3]?.score || 0;
              qName = topScores[3]?.name || "Anonyme";

              cScore = topScores[4]?.score || 0;
              cName = topScores[4]?.name || "Anonyme";
          } else {
              console.log("Aucun score trouvé.");
          }
      } catch (err) {
          console.error('Erreur réseau ou autre exception :', err);
      }
  })();
const context = map.getContext("2d");
let gravity = 2.5;
let velocityX = 2;
let decorvelocityX = 0.8;
let carvelocityX = 0.2;
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
    color: "skyblue",
    icon: "\uf6c3",
    vitesseX: 0.004
};
let monblaze = {
    x: map.width,
    y: map.height-70,
    color: 'yellow',
    vitesseX: 0.2
};
let mervie = {
    x: map.width/2+map.width,
    y: map.height-70,
    color: 'skyblue',
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
    trucs.push({x: building.x+750, y: map.height/2, color: "gray", icon: "\uf1ad", velocityX: decorvelocityX});
}
function decor2() {
    trucs.push({x: building.x+800, y: map.height/2, color: "gray", icon: '\uf1ad', velocityX: decorvelocityX});
}
function decor3() {
    trucs.push({x: building.x+500, y: map.height/2, color: "gray", icon: "\uf1b9", velocityX: decorvelocityX});
}
function decor4() {
    trucs.push({x: building.x, y: map.height/2, color: "gray", velocityX: decorvelocityX, icon:"\uf1ad"});
}
function decor5() {
    trucs.push({x: building.x+150, y: map.height/2, color: "gray", icon: '\uf1ad', velocityX: decorvelocityX});
}
function decor6() {
    trucs.push({x: building.x+300, y: map.height/2, color: "gray", icon: "\uf1ad", velocityX: decorvelocityX});
}
function decor7() {
    trucs.push({x: building.x+726, y: map.height/2.3, color: "gray", icon: "\uf1ad", velocityX: decorvelocityX});
}
function decor8() {
    trucs.push({x: building.x+560, y: map.height/2.3, color: "gray", icon: '\uf549', velocityX: decorvelocityX});
}
function decor9() {
    trucs.push({x: building.x+657, y: map.height/2.3, color: "gray", icon: '\uf64f', velocityX: decorvelocityX});
}
function decor10() {
    trucs.push({x: building.x, y: map.height/2.24, color: "gray", velocityX: decorvelocityX, icon:"\uf1ad"});
}
function decor11() {
    trucs.push({x: building.x+415, y: map.height/2.3, color: "gray", icon: '\uf275', velocityX: decorvelocityX});
}
function decor12() {
    trucs.push({x: building.x+253, y: map.height/2.3, color: "gray", icon: "\uf549", velocityX: decorvelocityX});
}
function decor13() {
    trucs.push({x: map.width, y: map.height/2+20, color: "gray", icon: "\uf5e4", velocityX: carvelocityX});
}
function rood() {
    const roodup = map.getContext('2d');
    roodup.height = window.innerWidth/2;
    if(window.innerWidth <= 1199 || window.innerHeight <= 910) {
        roodup.height = window.innerWidth;
     }
    roodup.width = 1;
    roodup.fillStyle = 'white';
    roodup.fillRect(0, map.height/2+30, roodup.height, roodup.width);
    const rood = map.getContext('2d');
    rood.height = window.innerWidth/2;
    if(window.innerWidth <= 1199 || window.innerHeight <= 910) {
        rood.height = window.innerWidth;
     }
    rood.width = 1;
    rood.fillStyle = 'white';
    rood.fillRect(0, map.height/2+10, rood.height, rood.width);
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
let monScore = 0;
function gameover() {
    context.fillStyle = 'white';
    const userAgent = window.navigator.userAgent;

if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
        context.font = '15px Arial';
        context.fillText(`glisse vers la droite pour rejouer`, 10, map.height-40);
        context.fillText(`swipe right to replay`, 10, map.height-20);
        context.fillText(`clique ici pour quitter`, map.width-140, map.height-40);
        context.fillText(`click here to quite`, map.width-140, map.height-20);
        context.font = '20px Arial';
        context.fillText(`>>`, map.width/2, map.height-160);
    } else {
        context.font = '20px Arial';
        context.fillText(`presse sur S pour quitter`, map.width-230, map.height-40);
        context.fillText(`press on S to quite`, map.width-230, map.height-20);
        context.fillText(`clique sur R pour rejouer`, 20, map.height-40);
        context.fillText(`click on R to replay`, 20, map.height-20);
        context.fillText(`presse Z pour sauter`, map.width/2-90, map.height-120);
        context.fillText(`press Z to jump`, map.width/2-70, map.height-140);
        context.font = '20px FontAwesome';
        context.fillText('\uf062', map.width/2-10, map.height-70);
    }
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    context.font = '20px Candal';
    context.fillStyle = 'red';
    context.fillText(`GAME OVER`, map.width/2-50, map.height/2);
    context.fillText(`${theName} highscore:${theScore}`, map.width-225, 30);
    context.fillStyle = 'skyblue';
    context.fillText(`${sName}  highscore:${sScore}`, map.width-225, 50);
    context.fillText(`${tName}  highscore:${tScore}`, map.width-225, 70);
}   else {
    context.font = '30px Candal';
    context.fillStyle = 'red';
    context.fillText(`GAME OVER`, map.width/2-90, map.height/2);
    context.font = '20px Candal';
    context.fillText(`${theName} highscore:${theScore}`, map.width-225, 30);
    context.fillStyle = 'skyblue';
    context.fillText(`${sName}  highscore:${sScore}`, map.width-225, 50);
    context.fillText(`${tName}  highscore:${tScore}`, map.width-225, 70);
}
if (scoreCount > theScore) {
    alert(`Mervie: dinguerie ta le nouveau record ✅`);
    saveScore();
}
// Met à jour monScore si le score actuel est supérieur
let savedHighScore = parseInt(sessionStorage.getItem('highestscore')) || 0;
if (scoreCount > savedHighScore) {
    sessionStorage.setItem('highestscore', scoreCount);
    monScore = scoreCount;
} else {
    monScore = savedHighScore;
}
checkAndInsertScore();
    cancelAnimationFrame(animationFrame);
    console.log("scoreCount", scoreCount);
    map.addEventListener('click', handleQuitClick);
      context.fillStyle = 'white';

    context.font = '20px Arial';
    context.fillText(`Meilleur score : ${theScore}`, map.width / 2 - 100, map.height / 2 + 80);
}

function handleQuitClick(event) {
    const rect = map.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const textX = map.width - 140 ;
    const textY = map.height - 40 || map.height - 20;
    const textWidth = 140;
    const textHeight = 20;

    if (x >= textX && x <= textX + textWidth && y >= textY && y <= textY + textHeight) {
        leavethegame();
        map.removeEventListener('click', handleQuitClick);
    }
}
function score() {
    context.fillStyle = 'white';
    context.font = '20px Arial';
        context.fillStyle = 'white';
        context.font = '20px Arial';
    context.fillText(`score: ${scoreCount}`, 10, 30);
    context.fillText(`record: ${monScore}`, 10, 50);
    context.font = '20px Candal';
    context.fillStyle = 'red';
}
async function saveScore() {
    console.log("🔔 saveScore() appelée !");
    const Nname = sessionStorage.getItem('name'); // Récupère le nom de session

    try {
        if (!Nname) {
            console.error("❌ Aucun nom trouvé dans la session !");
            return;
        }

        // Étape 1 : Vérifie si le nom existe déjà dans la base de données
        const { data: existingUser, error: selectError } = await supabase
            .from('podium')
            .select('*')
            .eq('name', Nname)
            .single(); // Récupère une seule ligne

        if (selectError && selectError.code !== 'PGRST116') {
            // Si une erreur autre que "aucune ligne trouvée" se produit
            throw selectError;
        }

        if (existingUser) {
            // Vérifie si le score existant est supérieur au score actuel
            if (existingUser.score > scoreCount) {
                console.log(`❌ Pas de mise à jour : le score existant (${existingUser.score}) est supérieur à ${scoreCount}.`);
                return;
            }

            // Étape 2 : Si le score existant est inférieur ou égal, met à jour le score
            const { data: updatedData, error: updateError } = await supabase
                .from('podium')
                .update({ score: scoreCount }) // Met à jour le score
                .eq('name', Nname); // Filtre par le nom

            if (updateError) throw updateError;

            console.log("✅ Score mis à jour :", updatedData);
        } else {
            // Étape 3 : Si le nom n'existe pas, insère une nouvelle ligne
            const { data: insertedData, error: insertError } = await supabase
                .from('podium')
                .insert([{ name: Nname, score: scoreCount }]); // Insère un nouveau score

            if (insertError) throw insertError;

            console.log("✅ Nouveau score inséré :", insertedData);
        }
    } catch (err) {
        console.error("🔥 Exception dans saveScore() :", err);
    }
}
async function checkAndInsertScore() {
    console.log("🔍 Vérification du score...");
    const Nname = sessionStorage.getItem('name'); // Récupère le nom de session

    try {
        if (!Nname) {
            console.error("❌ Aucun nom trouvé dans la session !");
            return;
        }

        // Étape 1 : Récupère les trois meilleurs scores
        const { data: topScores, error: selectError } = await supabase
            .from('podium')
            .select('score, name') // Sélectionne les scores et les noms
            .order('score', { ascending: false }) // Trie par score décroissant
            .limit(3); // Limite à 3 résultats

        if (selectError) {
            console.error("❌ Erreur lors de la récupération des scores :", selectError);
            return;
        }

        console.log("🔝 Les trois meilleurs scores :", topScores);

        // Étape 2 : Vérifie si le joueur existe déjà dans la base de données
        const { data: existingUser, error: userError } = await supabase
            .from('podium')
            .select('score')
            .eq('name', Nname)
            .single();

        if (userError && userError.code !== 'PGRST116') {
            console.error("❌ Erreur lors de la vérification de l'utilisateur :", userError);
            return;
        }

        if (existingUser) {
            // Vérifie si le score existant est supérieur au score actuel
            if (existingUser.score > scoreCount) {
                console.log(`❌ Pas de mise à jour : le score existant (${existingUser.score}) est supérieur à ${scoreCount}.`);
                return;
            }

            // Étape 3 : Met à jour le score si le score actuel est supérieur ou égal
            const { data: updatedData, error: updateError } = await supabase
                .from('podium')
                .update({ score: scoreCount }) // Met à jour le score
                .eq('name', Nname); // Filtre par le nom

            if (updateError) {
                console.error("❌ Erreur lors de la mise à jour du score :", updateError);
                return;
            }

            console.log("✅ Score mis à jour :", updatedData);
        } else {
            // Étape 4 : Si le joueur n'existe pas, insère un nouveau score
            const { data: insertedData, error: insertError } = await supabase
                .from('podium')
                .insert([{ name: Nname, score: scoreCount }]); // Insère un nouveau score

            if (insertError) {
                console.error("❌ Erreur lors de l'insertion du score :", insertError);
                return;
            }

            console.log("✅ Nouveau score inséré :", insertedData);
        }
    } catch (err) {
        console.error("🔥 Exception dans checkAndInsertScore() :", err);
    }
}
function initializeObstacles() {
    // Restaure monScore depuis sessionStorage
    monScore = parseInt(sessionStorage.getItem('highestscore')) || 0;
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
        if(truc.color === "gray") {
            context.font = "30px FontAwesome";
            context.fillStyle = truc.color;
            context.fillText(truc.icon, truc.x, truc.y);
        }
    })
}
function movedecor() {
    trucs.forEach((truc) =>{
        if(truc.color === 'gray') {
            truc.x -= truc.velocityX;
    if (truc.x <= -50) {
        truc.x = map.width;
    }
        }
    })
}
function blaze() {
    context.font = "20px Aial";
    const userAgent = window.navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
        context.font = "10px Aial";
    }
    context.fillStyle = monblaze.color;
    context.fillText(`@makilaaz0`, monblaze.x, monblaze.y);
    monblaze.x -= monblaze.vitesseX;
    if (monblaze.x <= 0-120) {
        monblaze.x = map.width;
    }
}
function aka() {
    context.font = "20px Aial";
    const userAgent = window.navigator.userAgent;
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)) {
        context.font = "10px Aial";
    }
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
    decor13();
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
    rood();
    drawDecor13();
    score();
    moveobstacle();
    moveobjects();
    drawObstacles();
    collision();
    rotationdetection();
    animation = requestAnimationFrame(animate);
    scoreCount += 1;
}

function drawDecor13() {
    const decor13 = trucs.find(truc => truc.icon === "\uf5e4"); // Trouve decor13
    if (decor13) {
        context.font = "30px FontAwesome";
        context.fillStyle = decor13.color;
        context.fillText(decor13.icon, decor13.x, decor13.y);
    }
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
    nameInput.style.display = "none";
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
    if(e.code == 'KeyW' || 'ArrowUp' || 'KeyZ' || 'space' && !isAnimating) {
        isAnimating = true;
        frameCount = 0;
    }
    if(e.code == 'KeyR') {
        const name = sessionStorage.getItem('name');

        if (!name) {
            alert("Mervie: Veuillez entrer un nom avant de recommencer !");
            return;
        }
       reloadAnimation();
    }
});
document.addEventListener('keydown', (e) => {
        if (e.code === 'KeyS') {
        map.style.display = "none";
    }
});
function leavethegame() {
    console.log("Quitter le jeu");
    map.style.display = "none"; // Cache le canvas
}
document.addEventListener('click', (e) => {if(!isAnimating) {isAnimating = true; frameCount = 0;}});
initializeObstacles()
initializedecor()
mainobject()
animation = requestAnimationFrame(animate);
