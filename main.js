// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Authentication
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

document.getElementById('login-button').addEventListener('click', () => {
    auth.signInWithPopup(provider).then((result) => {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('recipe-container').style.display = 'block';
    }).catch((error) => {
        console.error(error);
    });
});

// Function to generate recipe using ChatGPT API
async function generateRecipe() {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            prompt: 'Generate a recipe with a grocery list and step-by-step instructions.',
            max_tokens: 500
        })
    });

    const data = await response.json();
    document.getElementById('recipe').innerText = data.choices[0].text;
}

// Generate a recipe on page load
generateRecipe();