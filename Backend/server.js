// Express JS method of creating server by using express package
// To run this method/file use 'node server.js'
// Here both can run simultaneously as each uses a different PORT

import express from "express";

const app = express();

// Instead of uisngf create server and checking the method explicitely using req.get()
// express gives direct functions like get, post; which automatically checks for that condition.
// In this case, grouping of different get api calls becomes more structured.
app.get("/", (req, res) => {
  res.status(200);
  res.send("this is working!");
});

app.listen(3001, () => {
  console.log("express server is up!!");
});
