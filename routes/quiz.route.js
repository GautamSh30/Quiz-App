import express from "express";
import {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuizAnswers,
  getQuizResults,
} from "../controllers/quiz.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticateUser, createQuiz);
router.get("/", authenticateUser, getAllQuizzes);
router.get("/:quizId", authenticateUser, getQuizById);
router.post("/:quizId/submit", authenticateUser, submitQuizAnswers);
router.get("/:quizId/results", authenticateUser, getQuizResults);

export default router;
