const container = document.querySelector(".container");
const questionBox = document.querySelector(".question");
const choicesBox = document.querySelector(".choices");
const nextBtn = document.querySelector(".nextBtn");
const scoreCard = document.querySelector(".scoreCard");
const alert = document.querySelector(".alert");
const startBtn = document.querySelector(".startBtn");
const timer = document.querySelector(".timer");


// an array of objects to store questions, choices and answer
const quiz = [
    {
        question: "Q. What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language"],
        answer: "Hyper Text Markup Language"
    }, 

    {
        question: "Q. Who is making the Web standards?",
        choices: ["The World Wide Web Consortium","Mozilla","Microsoft","Google"],
        answer: "The World Wide Web Consortium"
    },

    {
        question: "Q. Choose the correct HTML element for the largest heading:",
        choices: ["<h6>", "heading", "<h1>", "head"],
        answer: "<h1>"
    }
    
];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;

function showQuestions() {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    // Clear previous choices
    choicesBox.innerHTML = ""; 

    // Loop through choices and create a container for each choice
    for (var i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement("div");
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add("choice"); // Add a class for styling
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });
    }
    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// function for checking answers
function checkAnswers() {
    const selectedChoice = document.querySelector(".choice.selected");
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        // alert("Correct Answer");
        showAlert("Correct Answer!");
        score++;
    }
    else{
        // alert("Wrong Answer");
        showAlert(`Wrong Answer!, Correct answer is ${quiz[currentQuestionIndex].answer}`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
    }

}

// function for displaying score
function showScore(){
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You scored ${score} out of ${quiz.length}`;
    showAlert("You have completed the quiz");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// function for customized alert message
function showAlert(msg){
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(function(){
        alert.style.display = "none";
    }, 2000);
}

// function for setting timer
function startTimer(){
    clearInterval(timerId);
    timer.textContent = timeLeft;
    function countDown(){
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!! Do you want to play the quiz again?");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                document.querySelector("h1").style.display = "block";
                startBtn.style.display = "block";
                container.style.display = "none";
                timeLeft = 17;
                return;
            }
        }
    }
    timerId = setInterval(countDown, 1000);
}

// function to stop the timer
function stopTimer(){
    clearInterval(timerId);
}

// function to shuffle questions
function shuffleQuestions(){
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

function startQuiz(){
    timeLeft = 15; // Resetting the timer to 15 seconds
    timer.style.display = "flex";
    shuffleQuestions();
}


// add event listener to start button
startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    showQuestions();
    document.querySelector("h1").style.display = "none";
});   

// show next questions by clicking next button
nextBtn.addEventListener("click",() => {
    const selectedChoice = document.querySelector(".choice.selected");
    if(!selectedChoice && nextBtn.textContent != "Play Again"){
        // alert("Select your Answer");
        showAlert("Select your Answer");
        return;
    }
    if(quizOver){
        currentQuestionIndex = 0;
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        startQuiz();
        quizOver = false;
        score = 0;
    }
    else{
        checkAnswers();
    }
}); 

