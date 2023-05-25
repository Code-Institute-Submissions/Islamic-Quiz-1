const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-texts'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const mainProgress = document.querySelector('#mainProgress');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: 'Which surah (chapter) is considered as one third (1/3) of the Quran?',
    choice1: 'Yaseen',
    choice2: 'Ikhlas',
    choice3: 'Fatihah',
    choice4: 'Falaq',
    answer: 2,
  },
];

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 30;

const startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('/final.html');
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  mainProgress.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice, index) => {
    const choiceNumber = index + 1;
    choice.innerText = currentQuestion['choice' + choiceNumber];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

const incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
