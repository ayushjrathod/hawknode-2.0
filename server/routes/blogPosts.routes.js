import express from 'express';
import { Title } from '../controllers/blogPosts.controllers.js';


const router = express.Router();

router.get("/", Title);

export default router;