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
  }, 2000);
});

document.getElementById("btnFrançais").addEventListener("click", function() {
  setTimeout(function() {
    window.open("index1.html", "_top");
  }, 2000);
});