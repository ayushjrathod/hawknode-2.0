import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.get("/",(req,res)=>{
  res.send("<h1> Hello hawkers</h1>");
});


app.listen(process.env.PORT, () => {
  console.log(`The Server Started on port ${process.env.PORT}`);
});