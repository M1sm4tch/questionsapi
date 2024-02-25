const QuestionModel = require('../models/questionModels')

// route validation manipulation

const getAllQuestions = async (req, res) => {
    try {
        const questions = await QuestionModel.find();
        res.status(200).json(questions);
    }
    catch(error) {
        console.log(error.message);
    }
}

const addQuestion = async (req, res) => {
    try {
        const lastQuestion = await QuestionModel.findOne().sort({ question_id: -1 });
        const nextQuestionId = (lastQuestion?.question_id) + 1;  

        const newQuestion = new QuestionModel({ question_id: nextQuestionId, ...req.body });
        await newQuestion.save();  

        res.status(201).json(newQuestion);
    }
    catch(error) {
        console.log(error.message)
    }
}

const getQuestionbyId = async (req, res) => {
    const questionId = req.params.id;
    try{
        const question = await QuestionModel.findOne({ question_id: parseInt(questionId) })
        if (!question) {
            return res.status(404).json({error: "Question not found."})
        }
        res.status(200).json(question)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

const updateQuestionById = async (req, res) => {
    try {
        const question = await QuestionModel.findOneAndUpdate(
            { question_id: req.params.id },
            req.body,
            { new: true }
        )
        if (!question) {
            return res.status(404).json({ error: "Question not found." });
        }

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


const deleteQuestionById = async (req, res) => {
    try {
        const question = await QuestionModel.findOneAndDelete(
            { question_id: req.params.id }
        );

        if (!question) {
            return res.status(404).json({ error: "Question not found." });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    getAllQuestions,
    addQuestion,
    getQuestionbyId,
    updateQuestionById,
    deleteQuestionById,
};