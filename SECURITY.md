# Security Policy

## Handling API Keys

To prevent the exposure of sensitive information such as API keys, follow these best practices:

1. **Use Environment Variables**: Store API keys and other sensitive information in environment variables. Avoid hardcoding them in your source code.
2. **Invalidate Exposed Keys**: If an API key is accidentally exposed, immediately invalidate it and generate a new one.
3. **Secure Storage**: Use secure storage solutions to manage and access API keys.

## Steps to Invalidate an Exposed API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to APIs & Services > Credentials.
3. Select the exposed API key and click "Delete".
4. Generate a new API key and store it securely.

## Updating the `main.js` File

Ensure that the `main.js` file uses environment variables for the API key:

```javascript
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```