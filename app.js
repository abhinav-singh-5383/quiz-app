const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Tool Multi Language"],
    answer: 0
  },
  {
    question: "Which of the following is correct about features of JavaScript?",
    options: ["JavaScript is a complementary to and integrated with HTML.", "JavaScript is open and cross-platform.", "Both of the above.", "All of the above."],
    answer: 2
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["text-style", "font-size", "text-size", "font-style"],
    answer: 1
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    options: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"],
    answer: 3
  },
  {
    question: "Which of the following function of Array object returns a new array comprised of this array joined with other array(s) and/or value(s)?",
    options: ["concat()", "pop()", "push()", "some()"],
    answer: 0
  }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const currentQNum = document.getElementById('current-q-num');
const totalQNum = document.getElementById('total-q-num');
const scoreText = document.getElementById('score-text');
const progressBar = document.getElementById('quiz-progress-bar');
const feedbackText = document.getElementById('feedback-text');

const finalPercentage = document.getElementById('final-percentage');
const finalScore = document.getElementById('final-score');
const maxScore = document.getElementById('max-score');

// Initialize
totalQNum.textContent = questions.length;
maxScore.textContent = questions.length;

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function updateProgress() {
  currentQNum.textContent = currentQuestionIndex + 1;
  scoreText.textContent = `Score: ${score}`;
  const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
}

function loadQuestion() {
  updateProgress();
  nextBtn.style.display = 'none';
  feedbackText.textContent = '';
  feedbackText.className = 'feedback-text';
  
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;
  
  optionsContainer.innerHTML = '';
  
  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.className = 'option-btn';
    button.addEventListener('click', () => selectAnswer(index));
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  const currentQuestion = questions[currentQuestionIndex];
  const options = optionsContainer.children;
  
  // Disable all options
  for(let i=0; i<options.length; i++) {
    options[i].disabled = true;
  }
  
  if(selectedIndex === currentQuestion.answer) {
    options[selectedIndex].classList.add('correct');
    feedbackText.textContent = 'Correct!';
    feedbackText.classList.add('correct');
    score++;
    scoreText.textContent = `Score: ${score}`;
  } else {
    options[selectedIndex].classList.add('wrong');
    options[currentQuestion.answer].classList.add('correct');
    feedbackText.textContent = 'Incorrect!';
    feedbackText.classList.add('wrong');
  }
  
  nextBtn.style.display = 'block';
}

function showResults() {
  progressBar.style.width = `100%`;
  setTimeout(() => {
    showScreen(resultsScreen);
    const percentage = Math.round((score / questions.length) * 100);
    finalPercentage.textContent = `${percentage}%`;
    finalScore.textContent = score;
    
    // CSS variable for conic-gradient
    document.querySelector('.score-circle').style.setProperty('--progress', `${percentage}%`);
  }, 500);
}

// Event Listeners
startBtn.addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
  showScreen(quizScreen);
});

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

restartBtn.addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
  showScreen(quizScreen);
});
