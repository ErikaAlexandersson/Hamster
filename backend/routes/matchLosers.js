import express from "express";
const router = express.Router();

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/firebase.js";

router.get("/:id", async (req, res) => {
  let matches = [];

  const q = query(
    collection(db, "matches"),
    where("loserId", "==", req.params.id)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log("Innuti snapshot", doc.data());
    matches.push({ ...doc.data(), id: doc.id });
  });
  if (matches.length > 0) {
    res.status(200).send(matches);
    return;
  }
  res.status(404).send(matches);
  // .send("The provided id has not lost any matches or does not exist");
});

export default router;
