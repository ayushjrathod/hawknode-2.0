import express from "express";
import bodyParser from "body-parser";
import path from "path";
import mongoose from "mongoose";
import blogPosts from "./routes/blogPosts.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";


const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database Connection
mongoose
  .connect(
    "mongodb+srv://clashofa1057:temppass@cluster0.fqzvj3u.mongodb.net/hawknode?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });



// Serve the main HTML file when accessing the "/compose" route
app.get("/compose", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "/index.html"));
});

app.listen(9000, () => {
  console.log("Server Started on port 9000");
});
