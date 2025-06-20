const elementaryQuestions = [{
        text: "Which animal is known as man's best friend?",
        options: ["Cat", "Dog", "Cow"],
        correct: "Dog"
    },
    {
        text: "What animal says 'meow'?",
        options: ["Lion", "Cow", "Cat"],
        correct: "Cat"
    },
    {
        text: "Which animal can fly?",
        options: ["Elephant", "Bird", "Snake"],
        correct: "Bird"
    },
    {
        text: "What do cows give us to drink?",
        options: ["Milk", "Water", "Juice"],
        correct: "Milk"
    },
    {
        text: "Which animal lives in water and has gills?",
        options: ["Dog", "Fish", "Monkey"],
        correct: "Fish"
    },
    {
        text: "Which animal has a trunk?",
        options: ["Tiger", "Elephant", "Horse"],
        correct: "Elephant"
    },
    {
        text: "Which bird is known for its colorful tail?",
        options: ["Crow", "Peacock", "Sparrow"],
        correct: "Peacock"
    },
    {
        text: "Which animal gives us wool?",
        options: ["Goat", "Sheep", "Buffalo"],
        correct: "Sheep"
    },
    {
        text: "Which animal is the king of the jungle?",
        options: ["Tiger", "Lion", "Leopard"],
        correct: "Lion"
    },
    {
        text: "Which animal hops and has a pouch?",
        options: ["Dog", "Kangaroo", "Cow"],
        correct: "Kangaroo"
    },
    {
        text: "What do bees make?",
        options: ["Wax", "Honey", "Milk"],
        correct: "Honey"
    },
    {
        text: "Which animal is the tallest?",
        options: ["Elephant", "Giraffe", "Camel"],
        correct: "Giraffe"
    },
    {
        text: "Which animal can change its color?",
        options: ["Chameleon", "Dog", "Snake"],
        correct: "Chameleon"
    },
    {
        text: "Which animal has black and white stripes?",
        options: ["Tiger", "Leopard", "Zebra"],
        correct: "Zebra"
    },
    {
        text: "Which small insect builds a hive and works in groups?",
        options: ["Bee", "Mosquito", "Butterfly"],
        correct: "Bee"
    },
    {
        text: "Which animal has a shell and moves slowly?",
        options: ["Snail", "Frog", "Rabbit"],
        correct: "Snail"
    },
    {
        text: "Which bird cannot fly?",
        options: ["Penguin", "Sparrow", "Crow"],
        correct: "Penguin"
    },
    {
        text: "Which animal is known for hopping?",
        options: ["Horse", "Rabbit", "Cat"],
        correct: "Rabbit"
    },
    {
        text: "Which animal howls at the moon?",
        options: ["Wolf", "Lion", "Tiger"],
        correct: "Wolf"
    },
    {
        text: "What do hens lay?",
        options: ["Eggs", "Milk", "Cotton"],
        correct: "Eggs"
    },
    {
        text: "Which animal is called the ship of the desert?",
        options: ["Camel", "Horse", "Elephant"],
        correct: "Camel"
    },
    {
        text: "Which aquatic animal has eight arms?",
        options: ["Octopus", "Whale", "Shark"],
        correct: "Octopus"
    },
    {
        text: "What is a baby dog called?",
        options: ["Kitten", "Puppy", "Cub"],
        correct: "Puppy"
    },
    {
        text: "Which animal gives us eggs?",
        options: ["Hen", "Cow", "Goat"],
        correct: "Hen"
    },
    {
        text: "Which animal is used to pull carts in villages?",
        options: ["Buffalo", "Horse", "Ox"],
        correct: "Ox"
    },
    {
        text: "Which sea creature has a large mouth and sharp teeth?",
        options: ["Fish", "Shark", "Crab"],
        correct: "Shark"
    },
    {
        text: "Which animal is known to be very slow?",
        options: ["Cheetah", "Turtle", "Horse"],
        correct: "Turtle"
    },
    {
        text: "Which animal has no legs?",
        options: ["Frog", "Snake", "Elephant"],
        correct: "Snake"
    },
    {
        text: "Which pet animal purrs?",
        options: ["Dog", "Rabbit", "Cat"],
        correct: "Cat"
    },
    {
        text: "Which animal is big, grey, and has big ears?",
        options: ["Elephant", "Rhino", "Buffalo"],
        correct: "Elephant"
    }
];

const startBtn = document.getElementById("start-btn");
const quizBox = document.getElementById("quiz-box");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");

let questions = [],
    current = 0,
    score = 0,
    time = 15,
    timer;

startBtn.onclick = () => {
    startBtn.style.display = "none";
    resultEl.textContent = "";
    quizBox.style.display = "block";
    questions = shuffle([...elementaryQuestions]).slice(0, 10);
    current = score = 0;
    showQuestion();
    startTimer();
};

function showQuestion() {
    if (current >= questions.length) return showResult();
    const q = questions[current];
    questionEl.textContent = q.text;
    questionEl.style.fontWeight = "bold"
    answersEl.innerHTML = "";
    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.style.backgroundColor = "lightblue";
        btn.style.borderRadius = '10px';
        btn.style.fontSize = '25px';
        btn.onclick = () => selectAnswer(option);
        answersEl.appendChild(btn);
    });
    progressBar.style.width = `${(current / questions.length) * 100}%`;
    time = 15;
    timerEl.textContent = time;
}

function selectAnswer(selected) {
    if (selected === questions[current].correct) score++;
    current++;
    clearInterval(timer);
    if (current < questions.length) {
        showQuestion();
        startTimer();
    } else {
        showResult();
    }
}

function showResult() {
    quizBox.style.display = "none";
    resultEl.textContent = `You scored ${score} out of ${questions.length}`;
    startBtn.textContent = "Play Again";
    startBtn.style.display = "block";
}

function startTimer() {
    timer = setInterval(() => {
        time--;
        timerEl.textContent = time;
        if (time === 0) {
            clearInterval(timer);
            selectAnswer(null);
        }
    }, 1000);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}