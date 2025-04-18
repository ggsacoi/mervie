const sending = document.getElementById("envoi");
const imageElement = document.getElementById("dynamicImage");
const images = [
  "481409044_1166194408383892_4735767193394602156_n.jpg",
  "1714619334642.jpg",
];
let currentIndex = 0;
sending.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("clicked");

    const Message = document.getElementById("message");
    const email = document.getElementById("lemail");

    let send =` <b>tiens: </b>${Message.value} + ${email.value}`;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "merviendma@gmail.com",
        Password : "0A3820F0657D0726E4D1A76183B571550DA9",
        SecureToken : "236369de-bba0-4150-b749-71209e0ab842",
        To : 'merviendama@gmail.com',
        From : "merviendama@gmail.com",
        Subject : "vous avez un nouveau message voici l'email ::" + email.value,
        Body : send
    })
// Change l'image au clic
  currentIndex = (currentIndex + 1) % 2; // Alterne entre les deux images
  imageElement.src = images[currentIndex]; // Met à jour la source de l'image
  console.log(`Image changed to: ${images[currentIndex]}`); // Debug : Affiche l'image actuelle
    alert("message envoyer")
});

document.getElementById("englishBtn").addEventListener("click", function() {
  setTimeout(function() {
    window.open("index.html", "_top");
  }, 300);
});

document.getElementById("btnFrançais").addEventListener("click", function() {
  setTimeout(function() {
    window.open("index1.html", "_top");
  }, 300);
});

const transition = document.querySelector('.loader');
window.setTimeout(()=> {
  transition.style.display = 'none';
}, 1000);

  document.addEventListener('DOMContentLoaded', () => {
    const audio = document.querySelector('audio');
    const controls = document.querySelector('.controls');
    const playIcon = document.querySelector('.fa-play');
    const pauseIcon = document.querySelector('.fa-pause');
 // Attendre une interaction utilisateur avant de jouer l'audio
 controls.addEventListener('click', () => {
  if (audio.paused) {
      audio.play().catch(error => {
          console.error("Erreur lors de la lecture de l'audio :", error);
      });
      pauseIcon.style.display = 'flex';
      playIcon.style.display = 'none';
  } else {
      audio.pause();
      playIcon.style.display = 'flex';
      pauseIcon.style.display = 'none';
  }
});
});
