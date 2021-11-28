const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const resultButton = document.querySelector("#result");



let timer = [0,0,0,0];
let interval;
let runningTimer = false;
let resultTimer= [];

// Add leading zero to numbers 9 or below (purely for aesthetics):
function startingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function Timer() {
    let currentTime = startingZero(timer[0]) + ":" + startingZero(timer[1]) + ":" + startingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
  
}

// Match the text entered with the provided text on the page:
function sentenceCheck() {
    let textEntered = testArea.value;
    let originTextM= originText.substring(0,textEntered.length);
   let abc="";
    if (textEntered == originText) {
      abc= abc + timer[0]+ ":" + timer[1]+ ":" + timer[2];
      resultTimer.push(abc);
        clearInterval(interval);
        testWrapper.style.borderColor = "#00FF00";
    } else {
        if (textEntered == originTextM) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#FF0000";
        }
    }

}

// Start the timer:
function Begin() {
    let textEnterdLength = testArea.value.length;
    if (textEnterdLength === 0 && !runningTimer) {
        runningTimer = true;
        interval = setInterval(Timer, 10);
    }
    console.log(textEnterdLength);
}

// Reset everything:
function restart() {
   clearInterval(interval);
  // console.log(resultTimer);
    interval = null;
    timer = [0,0,0,0];
    runningTimer = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    resultButton.innerHTML = "Result";
    
}

function result() {
 console.log(resultTimer);
  let sorted = resultTimer.sort((a,b) => (a < b ? -1 : a > b ? 1 : 0));
  const size = 3
   const items = sorted.slice(0, size)
   resultButton.innerHTML = items;
  
  
}
// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", Begin, false);
testArea.addEventListener("keyup", sentenceCheck, false);
resetButton.addEventListener("click", restart, false);
resultButton.addEventListener("click", result, false);





