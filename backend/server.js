import express from "express";
import cors from "cors";
import path from "path";

import { fileURLToPath } from "url";

import hamstersRouter from "./routes/hamster.js";
import winners from "./routes/winners.js";
import loosers from "./routes/loosers.js";
import matches from "./routes/matches.js";
import matchWinners from "./routes/matchWinners.js";
import matchLosers from "./routes/matchLosers.js";
// import addScript from "./routes/addScript.js";
// import addScript from "./routes/addScript.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../dist"));
app.use("/img", express.static(__dirname + "/public/img/img"));
app.use((req, res, next) => {
  console.log(`Logger: ${req.method} ${req.url}`, req.body);
  next();
});

const sendFile = path.join(__dirname, "public");

app.use("/hamsters", hamstersRouter);
app.use("/winners", winners);
app.use("/matches", matches);
app.use("/matchWinners", matchWinners);
app.use("/matchLosers", matchLosers);
app.use("/losers", loosers);

// app.use("/addAll", addScript);

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
