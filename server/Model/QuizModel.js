const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  field: {
    type: String,
  },
  attribute: [
    {
      name: String,
      questions: [
        {
          q: String,
          options: [String],
          correct_ans: [String],
          description: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("QuizModel", quizSchema);

// fields : [saving , investing , budgeting , retirement plainning , debt management]
// attributes : ["Knowledge", "Perspective"],
// great : >90 , good : >75 , average >50 , bad > 25 , poor < 25
// insights : knowledge (score) , perspective : ()
