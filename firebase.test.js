import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Verify if Firebase API key is loaded
if (!firebaseConfig.apiKey) {
    throw new Error("Firebase API key is missing! Check your .env file.");
}

describe("Firebase Initialization", () => {
    test("Firebase app should initialize without errors", () => {
        expect(() => initializeApp(firebaseConfig)).not.toThrow();
    });

    test("Auth module should be defined", () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        expect(auth).toBeDefined();
    });
});

