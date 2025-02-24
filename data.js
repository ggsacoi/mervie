//Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  // import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
  import { getDatabase } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";
  // import { getStorage } from "https://www.gstatic.com/firebasejs/11.3.1/firebase/storage";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
  import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  // import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA43D6CPzdkzfvm-yNmLlTeafMKE_AUdgw",
    authDomain: "x-pathway-421918.firebaseapp.com",
    databaseURL: "https://x-pathway-421918-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "x-pathway-421918",
    storageBucket: "x-pathway-421918.appspot.com",
    messagingSenderId: "16124353370",
    appId: "1:16124353370:web:58ed21d55ee906f627f163",
    measurementId: "G-2HLPMNV82B"
  };
  //Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
  const database = getDatabase(app);
  // const storage = getStorage(app);
  const auth = getAuth(app);
  const db = getFirestore(app);

  document.addEventListener('DOMContentLoaded', () => {
    var submit = document.getElementById("envoi");
    
    submit.addEventListener('click', async (e) => {
      e.preventDefault();
    
      var password = document.getElementById("loginpass").value;
      var email = document.getElementById("lemail").value;
      var passwordV = document.getElementById("loginpassV").value;
      var lastname = document.getElementById("lastname").value;
      var name = document.getElementById("name").value;
      var adresse = document.getElementById("adresse").value;
      var number = document.getElementById("Number").value;
    
      if (password === passwordV && adresse && lastname && name && number && email) {createUserWithEmailAndPassword(auth, email, password)
      .then((userCrendential) => {
          const user = userCrendential.user;
          addDoc(collection(db, "Users"), {
            firstname: name,
            adresse: adresse,
            lastname: lastname,
            number: number,
            email: email,
            uid: user.uid
          })
          .then(() => {
            alert("bienvenue  " + name);
            window.location.href = 'login.html';
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            alert('Error creating user. Please try again.');
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert('Veuillez remplir tous les champs et vous assurer que les mots de passe correspondent');
    }
    });
    const backtosignin = document.getElementById('connection');
  backtosignin.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
  });

  // const pfp = document.querySelectorAll(".pfp");
  // const user = document.querySelectorAll(".username").textContent;

  // function insertData() {
  //   const dataRef = ref(db, 'users/');
  //   set(dataRef, {
  //     username: user,
  //     profilepicture: pfp
  //   });
  // }

  // const backtosignin = document.getElementById('creation');
  // backtosignin.addEventListener('click', () => {
  //   window.location.href = 'signin.html';
  // });
  // const forgot = document.getElementById('oublie');
  // forgot.addEventListener('click', function(event){
  //   event.preventDefault()
  //   const email = document.getElementById("lemail").value;
  //   if(!email) {
  //     alert('entre ton email');
  //   }
  //   sendPasswordResetEmail(auth, email)
  //   .then(() => {
  //     alert('message envoyer dans ton boite mail');
  //   })
  // });
  
  const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            preview.src = event.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
});
