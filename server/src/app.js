import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import dbConnect from "./db/index.js";

const app = express();

//setting up configs and middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit:"64kd"}));
app.use(express.urlencoded({extended:true})); //defines what encoder is used for url e.g what+is+express or what%20express
app.use(express.static("public"));            //use public folder for static files 
app.use(cookieParser());


//Routes Import
import userRouter from "./routes/user.routes.js"

//Routes Decalaration
app.use("/api/v1/users",userRouter);


dbConnect()
  .then(()=>{
    app.listen(process.env.PORT, () => {
    console.log(`The Server Started on port ${process.env.PORT}`);
    });
  })
  .catch((error)=>{
    console.log("mongodb connection failed",error);
  })