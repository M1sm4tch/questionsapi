//Creating express router
const express = require('express');
const router = express.Router();
const questionController = require('../controller/questioncontroller.js')
const authmiddleware = require('../middleware/authmiddleware')

//Question CRUD operations Routes
router.get('/questions',authmiddleware.requireAuth, questionController.getAllQuestions);

router.post('/addquestion',questionController.addQuestion);

router.get('/question/:id',questionController.getQuestionbyId);

router.put('/question/update/:id', questionController.updateQuestionById);

router.delete('/question/delete/:id', questionController.deleteQuestionById);

module.exports = router;