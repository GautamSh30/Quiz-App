const questionSchema = mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length === 4;
      },
      message: "There must be exactly 4 options.",
    },
  },
  correct_option: {
    type: Number,
    required: true,
    min: 0,
    max: 3,
  },
});

export const Question = mongoose.model("Question", questionSchema);
