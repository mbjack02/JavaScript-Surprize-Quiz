
var startBtn = document.getElementById("start-btn")
var quizElementsWrapper = document.getElementById("quiz")
var firstQuestionElement = document.getElementById("quiz-section1")
var secondQuestionElement = document.getElementById("quiz-section2")
var thirdQuestionElement = document.getElementById("quiz-section3")
var gameoverForm = document.getElementById("gameover")
var displayScoreElement = document.getElementById("display-score")
var timerElement = document.getElementById("timer")
var secondsElement = document.getElementById("seconds")
var correctBtn = Array.from(document.querySelectorAll(".correct"))
var incorrectBtn = Array.from(document.querySelectorAll(".incorrect"))

var questionList = [
    "What are the correct ways to set varibles in Javascript?", "What are the correct ways to write a function in Javascript?", "What is the correct way to add an event listener in Javascript?"
]

var timeLeft = 30



function startQuiz() {
    quizElementsWrapper.classList.remove("hidden")
    firstQuestionElement.classList.remove("hidden")
    startBtn.classList.add('hidden')
    timerElement.classList.remove("hidden")
    timeLeft = 30

    displayQuestions()
    startTimer()

    if (startBtn.innerText === 'Retake Quiz') {
        displayScoreElement.classList.add('hidden')
    }


}

function displayQuestions() {

    for (let index = 0; index < questionList.length; index++) {

        var quizWrapper = document.querySelector(`#quiz-section${index + 1}`)

        // console.log('quiz element', quizWrapper)

        var questionEl = quizWrapper.querySelector('.question')

        // console.log('question element', questionEl)

        questionEl.textContent = questionList[index]
    }

}

function correctAnswer(event) {

    event.target.parentElement.classList.add('hidden')

    if (event.target.parentElement.id.includes('1')) {
        secondQuestionElement.classList.remove("hidden")
    } else if (event.target.parentElement.id.includes('2')) {
        thirdQuestionElement.classList.remove("hidden")
    } else if (event.target.parentElement.id.includes('3')) {
        gameoverForm.classList.remove("hidden")
    }
}

function incorrectAnswer(event) {
    timeLeft--
}

function handleSubmit(event) {
    event.preventDefault()

    var initials = event.target.elements['initials'].value

    console.log('form event', initials)
    console.log('target', event.target)

    event.target.classList.add('hidden')

    displayScoreElement.textContent = `Congrats ${initials}, you have completed the test and scored a 100!`

    startBtn.innerText = 'Retake Quiz'

    startBtn.classList.remove('hidden')

    displayScoreElement.classList.remove('hidden')

    timerElement.classList.add("hidden")

    event.target.reset()

    timeLeft = 30
}



function startTimer() {
    timeLeft--

    secondsElement.innerText = timeLeft

    if (timeLeft > 0) {
        setTimeout(startTimer, 1000)
    }

    if (timeLeft === 0) {


        gameoverForm.classList.add("hidden")
        timerElement.classList.add("hidden")
        quizElementsWrapper.classList.add("hidden")
        displayScoreElement.textContent = "Sorry you have ran out of time!"

        startBtn.innerText = 'Retake Quiz'

        startBtn.classList.remove('hidden')

        displayScoreElement.classList.remove('hidden')
    }
}

startBtn.addEventListener("click", startQuiz)
gameoverForm.addEventListener("submit", handleSubmit)

for (let index = 0; index < correctBtn.length; index++) {
    correctBtn[index].addEventListener("click", correctAnswer)
}

for (let index = 0; index < incorrectBtn.length; index++) {
    incorrectBtn[index].addEventListener("click", incorrectAnswer)
}
