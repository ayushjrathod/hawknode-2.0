import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

//setting up configs and middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"64kd"}));
app.use(express.urlencoded({extended:true})); //defines what encoder is used for url e.g what+is+express or what%20express
app.use(express.static("public"));            //use public folder for static files 
app.use(cookieParser());

app.get("/",(req,res)=>{
  res.send("<h1> Hello hawkers</h1>");
});




app.get("/jokes",(req,res)=>{
  const jokes=[
    {
      id:1,
      title:"joke one",
      content:"joke one so funny"
    },
    {
      id:2,
      title:"joke two",
      content:"joke two is funnier than joke one"
    }
  ];
  res.send(jokes);


})















//Routes Import
import userRouter from "./routes/user.routes.js"

//Routes Decalaration
app.use("/api/v1/users",userRouter)

app.listen(process.env.PORT, () => {
  console.log(`The Server Started on port ${process.env.PORT}`);
});