const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const questionBankPath = path.join(__dirname, '../data/azure_ai_question_bank_300.json');
let questionBank = [];

try {
  const data = fs.readFileSync(questionBankPath, 'utf-8');
  questionBank = JSON.parse(data);
} catch (err) {
  console.error("Failed to load question bank:", err);
}

function getRandomQuestions(limit = 60) {
  return questionBank.sort(() => 0.5 - Math.random()).slice(0, limit);
}

router.get('/questions', (req, res) => {
  const selectedQuestions = getRandomQuestions();
  res.json(selectedQuestions);
});

module.exports = router;
