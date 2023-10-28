let questions = [
    {
        question: "What is Gimli's father's name?",
        answers: [
            {text: "Oin", correct: false}, 
            {text: "Dwalin", correct: false},
            {text: "Gloin", correct: true}, 
            {text: "Dain", correct: false}
        ]
    },
    {
        question: "What is Sam's profession?",
        answers: [
            {text: "Carpenter", correct: false},
            {text: "Gardener", correct: true},
            {text: "Blacksmith", correct: false},
            {text: "Merchant", correct: false}
        ]
    },
    {
        question: "What is the name of Sauron's tower?",
        answers: [
            {text: "Isengard", correct: false},
            {text: "Orthanc", correct: false},
            {text: "Minas Morgul", correct: false},
            {text: "Barad-Dur", correct: true}
        ]
    },
    {
        question: "What is the name of the sword that Elrond gifts to Aragorn?",
        answers: [
            {text: "Anduril", correct: true},
            {text: "Ocrist", correct: false},
            {text: "Sting", correct: false},
            {text: "Glamdring", correct: false}
        ]
    },
    {
        question: "How many rings of power were made for the Dwarves?",
        answers: [
            {text: "Three", correct: false},
            {text: "Nine", correct: false}, 
            {text: "Seven", correct: true},
            {text: "Six", correct: false}
        ]
    },
    {
        question: "Which Ent carried Pippin and Merry through Fangorn Forest?",
        answers: [
            {text: "Gnarlstump", correct: false},
            {text: "Treebeard", correct: true},
            {text: "Twistroot", correct: false},
            {text: "Thickbark", correct: false}
        ]
    },
    {
        question: "What is the name of the mountain where the Master Ring was made?",
        answers: [
            {text: "Erebor", correct: false},
            {text: "Misty Mountains", correct: false},
            {text: "Grey Mountains", correct: false},
            {text: "Mount Doom", correct: true}
        ]
    },
    {
        question: "Frodo's sword has the magical ability to glow blue when Orcs and ___ are nearby?",
        answers: [
            {text: "Elves", correct: false},
            {text: "Goblins", correct: true},
            {text: "Dragons", correct: false},
            {text: "Trolls", correct: false}
        ]
    },
    {
        question: "Who did Samwise Gamgee marry?",
        answers: [
            {text: "Rosie", correct: true},
            {text: "Elanor", correct: false},
            {text: "Malva", Correct: false},
            {text: "Estella", correct: false}
        ]
    },
    {
        question: "What is the name of the bridge that Gandalf destroys in the battle with Balrog?",
        answers: [
            {text: "Bridge of Menegroth", correct: false},
            {text: "Last Bridge", correct: false},
            {text: "Brandywine Bridge", correct: false},
            {text: "Bridge of Khazad-dum", correct: true}
        ]
    }
];
    
let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

function selectAnswer(e) {
    let selectedBtn = e.target;
    let isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct"); 
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz()