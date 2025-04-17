//Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/11.3.1/firebase/storage";
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
  const storage = getStorage(app);

  const imageInput = document.getElementById('imageInput');
  const preview = document.getElementById('preview');
  const seconnecter = document.getElementById('connexion');
  
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

// Sélectionner le fichier input
imageInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Créer une référence de stockage
  const storageRef = ref(storage, "uploads/" + file.name);

  // Upload le fichier
  try {
    await uploadBytes(storageRef, file);
    alert("Fichier uploadé avec succès !");
  } catch (error) {
    console.error("Erreur upload :", error);
    alert("Erreur lors de l'upload !");
  }
});