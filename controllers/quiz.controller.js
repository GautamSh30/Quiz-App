import { Quiz } from "../models/quiz.model.js";
import { Question } from "../models/question.model.js";
import { Answer } from "../models/answer.model.js";

export async function createQuiz(req, res) {
  try {
    const { title, description } = req.body;
    const creator = req.user._id;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const quiz = new Quiz({
      title,
      description,
      creator,
    });

    await quiz.save();
    res.status(201).json({ success: true, quiz });
  } catch (error) {
    console.log("Error creating quiz", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getAllQuizzes(req, res) {
  try {
    const quizzes = await Quiz.find().populate("creator", "username email");
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    console.log("Error fetching quizzes", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getQuizById(req, res) {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId).populate(
      "creator",
      "username email"
    );

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    const questions = await Question.find({ quiz: quizId });
    res.status(200).json({ success: true, quiz, questions });
  } catch (error) {
    console.log("Error fetching quiz details", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function submitQuizAnswers(req, res) {
  try {
    const { quizId, answers } = req.body;
    const userId = req.user._id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "Quiz not found" });
    }

    let score = 0;
    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      const isCorrect = question.correct_option === answer.selected_option;

      if (isCorrect) {
        score += 1;
      }

      const userAnswer = new Answer({
        user: userId,
        quiz: quizId,
        question: answer.questionId,
        selected_option: answer.selected_option,
        is_correct: isCorrect,
      });

      await userAnswer.save();
    }

    res
      .status(200)
      .json({ success: true, message: "Quiz submitted successfully", score });
  } catch (error) {
    console.log("Error submitting quiz", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getQuizResults(req, res) {
  try {
    const { quizId } = req.params;
    const userId = req.user._id;

    const answers = await Answer.find({ user: userId, quiz: quizId }).populate(
      "question"
    );
    const correctAnswers = answers.filter((answer) => answer.is_correct).length;

    res.status(200).json({
      success: true,
      results: {
        totalQuestions: answers.length,
        correctAnswers,
        score: correctAnswers,
      },
    });
  } catch (error) {
    console.log("Error fetching quiz results", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
