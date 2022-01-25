"use strict";

window.addEventListener('load', initialize);

// Elements
let slcTypes;

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
}

function addEventListeners() {

}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function fillDropDownList() {
    let tests = new Array();
    
    tests = games.questions.map(a => a.round);
    var unique = tests.filter(onlyUnique);

    for (let i = 0; i < unique.length; i++) {
        const test = unique[i];
        slcTypes.options.add(new Option(test, test));
    }
}