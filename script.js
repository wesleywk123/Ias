const questions = [

    {
        question: "O que melhor descreve uma Inteligência Artificial?",

        answers: [
            "Um programa que possui consciência humana.",
            "Um sistema capaz de executar tarefas utilizando técnicas que permitem identificar padrões e produzir resultados.",
            "Um computador que sempre sabe a resposta correta.",
            "Uma máquina que pensa exatamente como uma pessoa."
        ],

        correct: 1
    },


    {
        question: "Por que uma IA pode fornecer uma informação incorreta?",

        answers: [
            "Porque toda IA é programada para mentir.",
            "Porque computadores não conseguem armazenar informações.",
            "Porque os métodos de IA podem produzir erros e seus resultados dependem dos dados e do processo utilizado.",
            "Porque a IA possui opiniões próprias."
        ],

        correct: 2
    },


    {
        question: "Qual situação representa um uso comum de Inteligência Artificial?",

        answers: [
            "Uma calculadora sem nenhuma função programada.",
            "Um sistema que recomenda filmes com base nos padrões de utilização do usuário.",
            "Um interruptor comum de luz.",
            "Uma lâmpada desligada."
        ],

        correct: 1
    },


    {
        question: "Sobre consciência em Inteligência Artificial, é correto afirmar que:",

        answers: [
            "Toda IA possui consciência própria.",
            "Toda IA possui sentimentos iguais aos humanos.",
            "Uma IA pode simular conversas e comportamentos sem que isso demonstre, por si só, consciência humana.",
            "Toda IA possui desejos próprios."
        ],

        correct: 2
    },


    {
        question: "Qual afirmação sobre imagens e textos gerados por IA está correta?",

        answers: [
            "Todo conteúdo produzido por IA é necessariamente verdadeiro.",
            "A IA não consegue produzir informações falsas.",
            "Conteúdos gerados por IA devem ser avaliados e, quando necessário, verificados em fontes confiáveis.",
            "Uma imagem produzida por IA sempre representa uma fotografia real."
        ],

        correct: 2
    },


    {
        question: "Qual é uma característica importante de uma IA generativa?",

        answers: [
            "Ela apenas armazena arquivos sem modificá-los.",
            "Ela pode produzir novos conteúdos, como textos, imagens, áudio ou código, a partir de padrões aprendidos.",
            "Ela possui necessariamente consciência.",
            "Ela consegue saber acontecimentos futuros com certeza."
        ],

        correct: 1
    }

];


let currentQuestion = 0;
let score = 0;
let answered = false;


const questionElement = document.getElementById("question");

const answersElement = document.getElementById("answers");

const nextButton = document.getElementById("next-button");

const questionNumber = document.getElementById("question-number");

const scoreElement = document.getElementById("score");

const progressFill = document.getElementById("progress-fill");

const quizBox = document.getElementById("quiz-box");

const result = document.getElementById("result");

const resultText = document.getElementById("result-text");


function loadQuestion() {

    answered = false;

    nextButton.style.display = "none";

    const question = questions[currentQuestion];


    questionElement.textContent = question.question;


    questionNumber.textContent =
        `Questão ${currentQuestion + 1} de ${questions.length}`;


    scoreElement.textContent =
        `Pontuação: ${score}`;


    progressFill.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    answersElement.innerHTML = "";


    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.classList.add("answer");

        button.textContent = answer;


        button.addEventListener("click", () => {

            selectAnswer(index, button);

        });


        answersElement.appendChild(button);

    });

}


function selectAnswer(index, selectedButton) {

    if (answered) {
        return;
    }

    answered = true;


    const question = questions[currentQuestion];

    const allAnswers =
        document.querySelectorAll(".answer");


    allAnswers.forEach(button => {

        button.disabled = true;

    });


    if (index === question.correct) {

        selectedButton.classList.add("correct");

        score++;

        scoreElement.textContent =
            `Pontuação: ${score}`;

    } else {

        selectedButton.classList.add("wrong");

        allAnswers[question.correct].classList.add("correct");

    }


    nextButton.style.display = "inline-block";


    if (currentQuestion === questions.length - 1) {

        nextButton.textContent = "Ver resultado 🏆";

    }

}


nextButton.addEventListener("click", () => {

    currentQuestion++;


    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        showResult();

    }

});


function showResult() {

    quizBox.classList.add("hidden");

    result.classList.remove("hidden");


    let message;


    if (score === 6) {

        message =
            "Excelente! Você acertou todas as questões. 🧠🔥";

    } else if (score >= 4) {

        message =
            "Muito bem! Você demonstrou um bom conhecimento sobre IA. 🚀";

    } else if (score >= 2) {

        message =
            "Bom começo! Continue estudando para entender melhor a Inteligência Artificial. 📚";

    } else {

        message =
            "Continue estudando! A IA é um tema cheio de conceitos interessantes. 🤖";

    }


    resultText.textContent =
        `Você acertou ${score} de ${questions.length} questões. ${message}`;

}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    quizBox.classList.remove("hidden");

    result.classList.add("hidden");

    loadQuestion();

}


loadQuestion();
