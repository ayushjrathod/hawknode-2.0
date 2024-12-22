import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import dbConnect from "./db/index.js";

const app = express();

//setting up configs and middlewares
app.use(
  cors({
    origin: ["http://ec2-13-203-155-46.ap-south-1.compute.amazonaws.com:9000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "500000 kb" }));
app.use(express.urlencoded({ extended: true })); //defines what encoder is used for url e.g what+is+express or what%20express
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
