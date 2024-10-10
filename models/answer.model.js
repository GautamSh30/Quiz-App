const answerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  selected_option: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
  is_correct: {
    type: Boolean,
    required: true,
  },
});

export const Answer = mongoose.model("Answer", answerSchema);
