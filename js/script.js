"use strict";

window.addEventListener('load', initialize);

// Elements
let slcJeopardy;
let hdgHeader;
let btnStart;
let sctOverview, sctZone;
let currentQuestion;

// Global variables
let games;

function initialize() {
    bindElements();
    addEventListeners();

    games = JSON.parse(dataset);

    currentQuestion = 1;

    fillDropdown();
}

function bindElements() {
    slcJeopardy = document.getElementById("jeopardy-type");
    hdgHeader = document.getElementById("jeopardy-type-choice");
    btnStart = document.getElementById("start");
    sctOverview = document.getElementById("question-overview");
    sctZone = document.getElementById("question-zone");
}

function addEventListeners() {
    slcJeopardy.addEventListener("click", showSelection);
    btnStart.addEventListener("click", buildQuestions);
}

function fillDropdown() {
    // for(let rounds in games){
    //     slcJeopardy.options.add(
    //         new Option(rounds, rounds)
    //     );

    //     console.log(games[rounds].round);
    // //     Undefined for unlogical reasons while in every other
    // //     JS exercise this works perfectly. Makes 0 sense. This
    // //     is the main reason why I keep failing at Javascript
    // //     for 2+ years now.
    // }

    let rounds = ["Jeopardy!", "Double Jeopardy!"];


    rounds.forEach(jeopardyRound => {
        slcJeopardy.options[slcJeopardy.length] = new Option(jeopardyRound, jeopardyRound);
    });
    // games.questions returns Object object
    // games.questions.round cannot be read (because its not an array)
}

function showSelection() {
    const selection = slcJeopardy[slcJeopardy.selectedIndex].value;
    
    hdgHeader.innerHTML = `<h1>You're playing ${selection}</h1>`;
}

function buildQuestions() {
    let listOfQuestions = new Array();
    let selectedQuestions = new Array();
    let questionTable = document.createElement('table');
    questionTable.id = "tblQuestions";
    questionTable.innerHTML = "";

    listOfQuestions = games.questions.sort(() => 0.5 - Math.random());
    selectedQuestions = listOfQuestions.slice(0, 5);
    console.log(selectedQuestions);

    questionTable.innerHTML = 
            `
                <tr>
                    <td><b>Question</b></td>
                    <td><b>Answer Given</b></td>
                    <td><b>Answer</b></td>
                </tr>
            `;
            
    selectedQuestions.forEach(jeoQuestion => {
        questionTable.innerHTML += 
        `
            <tr>
                <td>${jeoQuestion.question}</td>
                <td></td>
                <td>${jeoQuestion.answer}</td>
            </tr>
        `;
    });

    sctOverview.appendChild(questionTable);

    createQuestion(selectedQuestions);
}

function createQuestion(selectedQuestions, index) {
    let divQuestionZone = document.createElement('div');
    divQuestionZone.id = "divZone";
    divQuestionZone.innerHTML = "";

    for (index = currentQuestion; index < selectedQuestions.length; index++) {
        divQuestionZone.innerHTML =
        `
        <h2 align="center">Question ${currentQuestion}</h2>
        <h3 align="center">${selectedQuestions[0].question}</h3>
        <div align="center" class="mark">
            Stake: ${selectedQuestions[0].value}
        </div>
        <div align="center" class="mark">
            Wins: 
        </div>
        <div align="center">
            <button align="center" id="btnValidate" class="questionbutton">
                Next Question
            </button>
        </div>
        `;
    }

    sctZone.appendChild(divQuestionZone);
}