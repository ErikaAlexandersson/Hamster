import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import FireBaseConfig from "../backend/database/firebaseConfig.json";

const app = initializeApp(FireBaseConfig);

// const db = getFirestore(app);

export default app;
