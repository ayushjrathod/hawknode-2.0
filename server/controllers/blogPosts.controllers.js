import express from "express";
import mongoose from "mongoose";

const router = express.Router();

export const Title = (req, res) => {
  res.send("Awesome hawknode BLOG");
};

export default router;
