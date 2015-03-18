/*Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}*/

var scoreTotal = parseInt(sessionStorage.getItem("totalScore"));
var scoreOne;
var scoreTwo;
var scoreThree;
var scoreFour;
var scoreFive;
document.getElementById("totalScore").innerHTML = scoreTotal;

function getLocalStorageItem(keystring) {
    var lsi;
    if(localStorage.getItem(keystring)) {
        lsi = parseInt(localStorage.getItem(keystring));
    } else {
        lsi = 0;
    }
    console.log("getLocalStorageItem().lsi: " + lsi);
    return lsi;
}

function checkScores() {
    console.log("checkScores().scoreTotal: " + scoreTotal);
    console.log("checkScores().scoreOne: "  + scoreOne);
    console.log("checkScores().scoreTwo: " + scoreTwo);
    console.log("checkScores().scoreThree: " + scoreThree);
    console.log("checkScores().scoreFour: " + scoreFour);
    console.log("checkScores().scoreFive: " + scoreFive);
    if (scoreTotal > scoreOne) {
        scoreFive = scoreFour;
        scoreFour = scoreThree;
        scoreThree = scoreTwo;
        scoreTwo = scoreOne;
        scoreOne = scoreTotal;
    } else if (scoreTotal > scoreTwo) {
        scoreFive = scoreFour;
        scoreFour = scoreThree;
        scoreThree = scoreTwo;
        scoreTwo = scoreTotal;
    } else if (scoreTotal > scoreThree) {
        scoreFive = scoreFour;
        scoreFour = scoreThree;
        scoreThree = scoreTotal;
    } else if (scoreTotal > scoreFour) {
        scoreFive = scoreFour;
        scoreFour = scoreTotal;
    } else if (scoreTotal > scoreFive) {
        scoreFive = scoreTotal;
    } else {
        console.log("No score modifications!");
    }
}

function getScores() {
    scoreOne = getLocalStorageItem(scoreOne);
    scoreTwo = getLocalStorageItem(scoreTwo);
    scoreThree = getLocalStorageItem(scoreThree);
    scoreFour = getLocalStorageItem(scoreFour);
    scoreFive = getLocalStorageItem(scoreFive);
}

function setScores() {
    localStorage.setItem("scoreOne", scoreOne);
    localStorage.setItem("scoreTwo", scoreTwo);
    localStorage.setItem("scoreThree", scoreThree);
    localStorage.setItem("scoreFour", scoreFour);
    localStorage.setItem("scoreFive", scoreFive);
}

getScores();
checkScores();
setScores();

console.log(getLocalStorageItem(scoreOne));
console.log(getLocalStorageItem(scoreTwo));
console.log(getLocalStorageItem(scoreThree));
console.log(getLocalStorageItem(scoreFour));
console.log(getLocalStorageItem(scoreFive));
console.log(typeof scoreTotal);