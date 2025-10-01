import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import dbConnect from "./db/index.js";

const app = express();

//setting up configs and middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin"],
  })
);

app.use(express.json({ limit: "500000 kb" }));
app.use(express.urlencoded({ extended: true })); //defines what encoder is used for url e.g what+is+express or what%20express //uses %20 for spaces in URLs since extended:true is set
app.use(express.static("./public/temp")); //use public folder for static files
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("The server is running");
});

//Routes Import
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";
//Routes Decalaration
app.use("/v1/users", userRouter);
app.use("/v1/posts", postRouter);

//Database Connection
dbConnect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`The Server Started on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("mongodb connection failed", error);
  });
