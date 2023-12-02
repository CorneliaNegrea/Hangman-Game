let savedWord = "";
let underlinedWord = [];
let selectedLetters = [];
let life = 7;
let nrLetters;

function saveWord() {
    savedWord = document.getElementById("wordInput").value.trim().toUpperCase();

    if (savedWord.length === 0 || !/^[a-zA-Z]+$/.test(savedWord)) {
        alert("Please insert a valid word.");
        return;
    }
    
    underlinedWord = Array(savedWord.length).fill('_');
    nrLetters = savedWord.length;
    showUnderlinedWord();
    
    selectedLetters = Array(26).fill(false);

    showAlphabetButtons();

    document.getElementById("wordInput").value = "";

    document.getElementById("showWord").innerHTML = "";
}

function showUnderlinedWord() {
    let showWordDiv = document.getElementById("showWord");
    showWordDiv.innerHTML = underlinedWord.join(' ');
}

function showAlphabetButtons() {
    let alphabetButtonsDiv = document.getElementById("alphabetButtons");
    alphabetButtonsDiv.innerHTML = "";

    for (let letter = 'A'; letter <= 'Z'; letter = String.fromCharCode(letter.charCodeAt(0) + 1)) {
        let letterButton = document.createElement("button");
        letterButton.textContent = letter;
        letterButton.onclick = function() { checkLetter(this.textContent); };
        alphabetButtonsDiv.appendChild(letterButton);
    }
}

function checkLetter(letter) {
    if (selectedLetters[letter.charCodeAt(0) - 'A'.charCodeAt(0)]) {
        alert("Please select another letter.");
        return;
    }

    selectedLetters[letter.charCodeAt(0) - 'A'.charCodeAt(0)] = true;

    let identifiedLetter = false;

    for (let i = 0; i < savedWord.length; ++i) {
        if (savedWord[i] === letter) {
            underlinedWord[i] = letter;
            identifiedLetter = true;
            --nrLetters;
        }
    }

    showUnderlinedWord();

    if (!identifiedLetter) {
        alert("This letter does not exist in this word.");
        --life;
    }
    if (life == 0) {
        document.getElementById('message').innerText = "You lost this game!";
    }
    if (nrLetters == 0) {
        document.getElementById('message').innerText = "You won!";
    }
}