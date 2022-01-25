"use strict";

window.addEventListener('load', initialize);

// Elements
let slcJeopardy;

// Global variables
let games;

function initialize() {
    bindElements();
    addEventListeners();

    games = JSON.parse(dataset);

    fillDropdown();
}

function bindElements() {
    slcJeopardy = document.getElementById("jeopardy-type");
}

function addEventListeners() {
    
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