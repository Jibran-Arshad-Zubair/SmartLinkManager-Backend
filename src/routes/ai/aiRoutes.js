import express from "express";
import { generateAIDescription } from "../../app/controllers/ai/aiDescriptionController.js";

const router = express.Router();
router.post("/generate-description", generateAIDescription);
export default router;
