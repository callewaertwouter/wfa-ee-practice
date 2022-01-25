"use strict";

window.addEventListener('load', initialize);

// Elements
let slcTypes;
let hdgHeader;
let btnStart;
let questionTable;
let sctOverview;

// Global variables
let games;

function initialize() {

    bindElements();
    addEventListeners();

    games = JSON.parse(dataset);

    fillDropDownList();

}

function bindElements() {
    slcTypes = document.getElementById("jeopardy-type");
    hdgHeader = document.getElementById("jeopardy-type-choice");
    btnStart = document.getElementById("start");
    sctOverview = document.getElementById("question-overview");
}

function addEventListeners() {
    slcTypes.addEventListener("click", showSelectedType);
    btnStart.addEventListener("click", collectQuestions);
}

function resetUI() {
    sctOverview.innerHTML = "";
}

// Global function to extract unique values
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function fillDropDownList() {
    // Create a new array
    let types = new Array();
    
    // Extracts all the values from property 'round'
    types = games.questions.map(a => a.round);
    // Returns all unique values
    // Results in 'Jeopardy!' and 'Double Jeopardy!' shown only once
    var uniqueTypes = types.filter(onlyUnique);

    // Adds these unique values to dropdown list
    for (let i = 0; i < uniqueTypes.length; i++) {
        const type = uniqueTypes[i];
        slcTypes.options.add(new Option(type, type));
    }
}

function getSelectedType() {
    return slcTypes[slcTypes.selectedIndex].value;
}

function showSelectedType() {
    const selectedType = getSelectedType();

    hdgHeader.innerHTML = `<h1>You're playing ${selectedType}</h1>`;
}

function filterOnSelectedType() {
    const selectedType = getSelectedType();

    let filterOnType = games.questions.filter(obj => {
        return obj.round === selectedType
    });

    return filterOnType;
}

function collectQuestions() {
    resetUI();

    const filteredType = filterOnSelectedType();

    questionTable = document.createElement('table');
    questionTable.id = "tblQuestions";
    questionTable.innerHTML = 
        `
        <tr>
            <td><b>Questions</b></td>
            <td><b>Answer Given</b></td>
            <td><b>Answer</b></td>
        </tr>
        `;

    let listOfQuestions = new Array();
    let selectedQuestions = new Array();
    listOfQuestions = filteredType.sort(() => 0.5 - Math.random());
    selectedQuestions = listOfQuestions.slice(0, 5);
    console.log(selectedQuestions);

    selectedQuestions.forEach(typeQuestion => {
        questionTable.innerHTML += 
        `
        <tr>
            <td>${typeQuestion.question}</td>
            <td></td>
            <td>${typeQuestion.answer}</td>
        </tr>
        `;
    });

    sctOverview.appendChild(questionTable);
}