import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import FireBaseConfig from "../backend/database/firebaseConfig.json";
// import firebaseConfig from "./firebaseConfig.json" assert { type: "json" };
// import { createRequire } from "module"; // Bring in the ability to create the 'require' method
// const require = createRequire(import.meta.url); // construct the require method
// // const my_json_file = require("./firebaseConfig.json"); // use the require method

// let privateKey;
// if (process.env.PRIVATE_KEY) {
//   privateKey = JSON.parse(process.env.PRIVATE_KEY);
// } else {
//   privateKey = FireBaseConfig;
// }

const app = initializeApp(FireBaseConfig);

const db = getFirestore(app);

export default app;
