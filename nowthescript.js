const sending = document.getElementById("envoi");

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
    }).then(
      message => alert("message envoyer")
    );
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

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("loader--hidden");

  loader.addEventListener("transitionend", () => {
    document.body.removeChild(loader);
  });
  const audio = document.querySelector('audio');
  audio.autoplay();
});

  const audio = document.querySelector('audio');
  const controls = document.querySelector('.controls');
  const playIcon = document.querySelector('.fa-play');
  const pauseIcon = document.querySelector('.fa-pause');

  document.addEventListener('DOMContentLoaded', () => {
    audio.autoplay();

  controls.addEventListener('click', ()=>{
  if (audio.paused) {
    audio.autoplay();
    pauseIcon.style.display ='flex';
    playIcon.style.display = 'none';
  }else {
    audio.pause();
    playIcon.style.display ='flex';
    pauseIcon.style.display = 'none';
  };
});
});
