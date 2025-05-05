// Express JS method of creating server by using express package
// To run this method/file use 'node server.js'
// Here both can run simultaneously as each uses a different PORT

import express from "express";
import router from "./router.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

//--Middlewares--
app.use(cors());
app.use(morgan("dev")); //morgan used for tracking requests like a console
app.use(express.json()); // Automatically parse incoming JSON request bodies and make them available as req.body
app.use(express.urlencoded({ extended: true })); // It tells Express to parse URL-encoded form data

//--Custom Middleware--
app.use((req, res, next) => {
  req.newConstant = "CUSTOM";
  next();
});

// Instead of uisngf create server and checking the method explicitely using req.get()
// express gives direct functions like get, post; which automatically checks for that condition.
// In this case, grouping of different get api calls becomes more structured.
app.get("/", (req, res) => {
  res.status(200);
  res.send("this is working!");
});

app.use("/api", router);

app.listen(3001, () => {
  console.log("express server is up!!");
});
