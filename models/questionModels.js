const mongoose = require('mongoose');

// 4 choice options structure
const optionSchema = new mongoose.Schema({
    option_id: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => {
                return value >= 1 && value <= 4;
            },
            message: 'Option_id must be between 1 and 4'
        }
    },
    option_text: { type: String, required: true }
});

// multiple choice question structure
const questionSchema = new mongoose.Schema({
    question_id: { type: Number, unique: true },
    category: { type: String, required: true },
    question_text: { type: String, required: true },
    options: [optionSchema],
    correct_option_id: { type: Number, required: true }
});

const QuestionModel = mongoose.model('Question', questionSchema);

// starter data
const questionData = [
    {
        question_id: 1,
        category: "sport",
        question_text: "Which one is the correct team name in NBA?",
        options: [
            { option_id: 1, option_text: "New York Bulls" },
            { option_id: 2, option_text: "Los Angeles Kings" },
            { option_id: 3, option_text: "Golden State Warriros" },
            { option_id: 4, option_text: "Houston Rockets" }
        ],
        correct_option_id: 4
    },
    {
        question_id: 2,
        category: "maths",
        question_text: "5 + 7 = ?",
        options: [
            { option_id: 1, option_text: "10" },
            { option_id: 2, option_text: "11" },
            { option_id: 3, option_text: "12" },
            { option_id: 4, option_text: "13" }
        ],
        correct_option_id: 3
    },
    {
        question_id: 3,
        category: "maths",
        question_text: "12 - 8 = ?",
        options: [
            { option_id: 1, option_text: "1" },
            { option_id: 2, option_text: "2" },
            { option_id: 3, option_text: "3" },
            { option_id: 4, option_text: "4" }
        ],
        correct_option_id: 4
    }
];

// saving to mongo db if empty
if ((QuestionModel.countDocuments()) === 0) {
    QuestionModel.insertMany(questionData)
      .then((docs) => {
          console.log("Data inserted successfully:", docs);
      })
      .catch((err) => {
          console.error("Error inserting data:", err);
      });
  }

module.exports = QuestionModel