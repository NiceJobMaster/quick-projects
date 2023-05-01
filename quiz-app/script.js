const quizData = [
  {
    question: "What is the capital of France?",
    options: {
      a: "Berlin",
      b: "Paris",
      c: "Madrid",
      d: "Rome",
    },
    answer: "b",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: {
      a: "Mars",
      b: "Jupiter",
      c: "Saturn",
      d: "Uranus",
    },
    answer: "b",
  },
  {
    question: "What is the name of the first man to walk on the moon?",
    options: {
      a: "Neil Armstrong",
      b: "Buzz Aldrin",
      c: "Alan Shepard",
      d: "John Glenn",
    },
    answer: "a",
  },
  {
    question: "What is the highest mountain in the world?",
    options: {
      a: "Mount Everest",
      b: "Mount Kilimanjaro",
      c: "Mount Fuji",
      d: "Mount McKinley",
    },
    answer: "a",
  },
  {
    question: "What is the smallest country in the world?",
    options: {
      a: "Monaco",
      b: "Liechtenstein",
      c: "San Marino",
      d: "Vatican City",
    },
    answer: "d",
  },
  {
    question: "What is the name of the largest ocean in the world?",
    options: {
      a: "Atlantic Ocean",
      b: "Indian Ocean",
      c: "Arctic Ocean",
      d: "Pacific Ocean",
    },
    answer: "d",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: {
      a: "Au",
      b: "Ag",
      c: "Cu",
      d: "Fe",
    },
    answer: "a",
  },
  {
    question: "What is the name of the river that runs through Egypt?",
    options: {
      a: "Nile",
      b: "Amazon",
      c: "Mississippi",
      d: "Thames",
    },
    answer: "a",
  },
  {
    question: "What is the name of the largest desert in the world?",
    options: {
      a: "Gobi Desert",
      b: "Sahara Desert",
      c: "Atacama Desert",
      d: "Mojave Desert",
    },
    answer: "b",
  },
  {
    question: "What is the name of the first woman to win a Nobel Prize?",
    options: {
      a: "Marie Curie",
      b: "Dorothy Hodgkin",
      c: "Rosalind Franklin",
      d: "Barbara McClintock",
    },
    answer: "a",
  },
];

const questionEl = document.getElementById("question");
const optionAEl = document.getElementById("optionA");
const optionBEl = document.getElementById("optionB");
const optionCEl = document.getElementById("optionC");
const optionDEl = document.getElementById("optionD");
const submitBtn = document.getElementById("submit");
const optionsElements = document.getElementsByClassName("option");
const formEl = document.getElementById("form");

let currentQuiz = 0;
let score = 0;

const setQuiz = () => {
  questionEl.innerHTML = quizData[currentQuiz].question;
  optionAEl.innerHTML = quizData[currentQuiz].options.a;
  optionBEl.innerHTML = quizData[currentQuiz].options.b;
  optionCEl.innerHTML = quizData[currentQuiz].options.c;
  optionDEl.innerHTML = quizData[currentQuiz].options.d;
};

setQuiz();

submitBtn.addEventListener("click", () => {
  for (let i = 0; i < optionsElements.length; i++) {
    if (
      optionsElements[i].children[0].checked &&
      optionsElements[i].children[0].value === quizData[currentQuiz].answer
    ) {
      score = score + 1;
    }
    optionsElements[i].children[0].checked = false;
  }

  currentQuiz = currentQuiz + 1;
  if (currentQuiz === quizData.length) {
    form.innerHTML = `<h1>Score: ${score}/${quizData.length}`;
  } else {
    setQuiz();
  }
});
