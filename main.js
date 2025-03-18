// Import the functions you need from the SDKs you
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "otf-recipes-e7526.firebaseapp.com",
  projectId: "otf-recipes-e7526",
  storageBucket: "otf-recipes-e7526.appspot.com",
  messagingSenderId: "986601006951",
  appId: "1:986601006951:web:1e377c4c4b5a9990ed31c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const authSection = document.getElementById('auth-section');
const recipesSection = document.getElementById('recipes-section');
const recipesList = document.getElementById('recipes-list');
const addRecipeForm = document.getElementById('add-recipe-form');
const recipeNameInput = document.getElementById('recipe-name-input');

loginBtn.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
});

logoutBtn.addEventListener('click', () => {
  signOut(auth).then(() => {
    console.log('User signed out');
  }).catch((error) => {
    console.error('Error during sign-out:', error);
  });
});

const renderRecipes = async () => {
  recipesList.innerHTML = '';
  const querySnapshot = await getDocs(collection(db, 'recipes'));
  querySnapshot.forEach((doc) => {
    const li = document.createElement('li');
    li.textContent = doc.data().name;
    recipesList.appendChild(li);
  });
};

addRecipeForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const recipeName = recipeNameInput.value.trim();
  if (recipeName !== '') {
    try {
      await addDoc(collection(db, 'recipes'), {
        name: recipeName
      });
      recipeNameInput.value = '';
      renderRecipes();
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  }
});

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    authSection.style.display = 'none';
    recipesSection.style.display = 'block';
    renderRecipes();
  } else {
    authSection.style.display = 'block';
    recipesSection.style.display = 'none';
  }
});