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