const QuizModel = require("../Model/QuizModel");
const FinanceModel = require("../Model/FinanceModel");
const UserModel = require("../Model/UserModel");

field = [
  "Savings",
  "Investing",
  "Budgeting",
  "Retirement Planning",
  "Debt Management",
];

const getQuiz = async (req, res) => {
  try {
    var i = 0;
    var q = [];

    // for each field :
    for (; i < field.length; i++) {
      const quiz = await QuizModel.findOne({ field: field[i] });
      // one question from each element i.e. knowledge and perspective :
      quiz.attribute.forEach((element) => {
        // retreiving a random question of that attribute :
        const question =
          element.questions[
            Math.floor(Math.random() * element.questions.length)
          ];
        // not sending the correct ans :
        q.push({
          field: field[i],
          attribute: element.name,
          question: question.q,
          options: question.options,
          description: question.description,
          _id: question._id,
        });
      });
    }
    res.status(200).json({ questions: q });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

const postQuiz = async (req, res) => {
  const { q_id } = req.params;
  const { answers } = req.body;
  try {
    const fin = await FinanceModel.findOne({ user: req.user.id });
    var knowledge = fin.knowledge;
    var perspective = fin.perspective;
    var already = false;

    // checking if the question is already attempted :
    if (knowledge.length > 0) {
      for (let k of knowledge) {
        for (let z of k.attempted) {
          if (z.toString() === q_id) already = true;
        }
      }
    }
    if (perspective.length > 0) {
      for (let p of perspective) {
        for (let z of p.attempted) {
          if (z.toString() === q_id) already = true;
        }
      }
    }

    if (!already) {
      // that one entry out of 5 that consist this question :
      const quiz = await QuizModel.findOne({ "attribute.questions._id": q_id });
      if (!quiz) {
        console.log("question not found");
        res.status(404).json({
          message: "no question found!",
        });
      }

      // getting field , attribute and the actual question :
      var attribute;
      let que; // iterating attr in arrays of attributes to
      for (let attr of quiz.attribute) {
        que = attr.questions.find(
          (question) => question._id.toString() === q_id
        );
        attribute = attr.name;
        if (que) break;
      }
      const field = quiz.field;

      // checking answer and counting score :
      var j = 0;
      var count = 0;
      const correct = que.correct_ans; //correct-ans array
      const total_correct = correct.length; // correct-ans array length
      for (j in answers) {
        if (correct.includes(answers[j])) {
          count += 1;
        } else {
          count -= 1;
        }
      }

      var score = 0;
      if (count < 0) count = 0;
      score += count / total_correct;

      // to insert if the field doesn't already exists in knowledge or perspective array :
      scoreObject = {
        field: field,
        score: score,
        attempted: [q_id],
      };

      var that_field;
      if (attribute === "knowledge") {
        that_field = knowledge.find((item) => item.field === field);
        if (!that_field) {
          knowledge.push(scoreObject);
        }
      } else {
        that_field = perspective.find((item) => item.field === field);
        if (!that_field) {
          perspective.push(scoreObject);
        }
      }
      // if field already exists :
      if (that_field) {
        that_field.attempted.push(q_id);
        that_field.score += score;
      }
      await fin.save();

      resObject = {
        knowledge: fin.knowledge,
        perspective: fin.perspective,
      };
      res.status(200).json(resObject);
    } else {
      res.status(200).json({ message: "already attempted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getQuiz, postQuiz };
