const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const responseDiv = document.getElementById('response');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Empêche le rechargement de la page

  const prompt = input.value;

  try {
    const res = await fetch('http://localhost:3001/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    responseDiv.innerText = data.response;
  } catch (error) {
    console.error('Erreur:', error);
    responseDiv.innerText = 'Erreur lors de la communication avec le serveur.';
  }
});