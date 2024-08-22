// Common Variables

const dictionaryWords = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'kiwi', 'lemon', 'mango','android','iphone','chromebook','website','artificial','success','great','relentless'];

let score = 0;

// Speed Test

document.addEventListener('DOMContentLoaded', ()=>{
    const textToType = document.getElementById('text-to-type');
    const userInput = document.getElementById('user-input');
    const timeDisplay = document.getElementById('time');
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const scoreDisplay = document.getElementById('score');

    let startTime;
    let timerInterval;

    function startTest(){
        textToType.textContent = dictionaryWords[Math.floor(Math.random() * dictionaryWords.length)];
        userInput.value = '';
        startTime = new Date().getTime();
        timerInterval = setInterval(updateTime, 100);

    }

    function updateTime(){
        const elapsedTime = (new Date().getTime() - startTime) /1000;
        timeDisplay.textContent = elapsedTime.toFixed(1);
    }

    userInput.addEventListener('input',()=>{
        if (!startTime) {
            startTest();
        }

        const typedText = userInput.value;
        const correctChars = typedText.split('').filter((char,index) => char === textToType.textContent[index]).length;
        const accuracy = (correctChars / typedText.length) * 100;
        accuracyDisplay.textContent = accuracy.toFixed(1);

        if (typedText === textToType.textContent) {
            clearInterval(timerInterval);
            const elapsedTime = (new Date().getTime() - startTime)/1000;
            const wordsTyped = typedText.split('').length;
            const wpm = (wordsTyped/elapsedTime) * 60;
            wpmDisplay.textContent = wpm.toFixed(1);
            score++;
            scoreDisplay.textContent = score;
            startTest();
        }         

    });

});

// word fall Logic

document.addEventListener('DOMContentLoaded', ()=> {
    const wordInput = document.getElementById('word-input');
    const fallingWordsContainer = document.getElementById('falling-words-container');
    const scoreValue = document.getElementById('score');
    let score = 0;
    let missedWords = 0;

    function createFallingWord () {
        const word = dictionaryWords[Math.floor(Math.random() * dictionaryWords.length)];
        const wordElement = document.createElement('div');
        wordElement.classList.add('falling-word');
        wordElement.textContent = word;

        const shape = Math.random() > 0.5 ? 'circle' : 'square';
        wordElement.classList.add(shape);

        fallingWordsContainer.appendChild(wordElement);

        let topPosition = 0;
        const fallInterval = setInterval( ()=> {
            topPosition += 2;
            wordElement.style.top = topPosition + 'px';
            if (topPosition > window.innerHeight) {
                clearInterval(fallInterval);
                fallingWordsContainer.removeChild(wordElement);
                missedWords++;
                checkGameOver();
            }
        },50);

        wordElement.dataset.word = word;

        setTimeout(()=>{
            clearInterval(fallInterval);
            if (fallingWordsContainer.contains(wordElement)) {
                fallingWordsContainer.removeChild(wordElement);
                missedWords++;
                checkGameOver();
            }
        },10000);
    }

    function checkGameOver() {
        if (missedWords >= 5) {
            alert("Game Over!");
            // reset game state
            score = 0;
            missedWords = 0;
            scoreValue.textContent = score;
        }
    }

    setInterval(createFallingWord,2000);

    wordInput.addEventListener('input', ()=>{
        const typedWord = wordInput.value;
        const wordElements = document.querySelectorAll('.falling-word');

        wordElements.forEach(wordElement => {
            if (typedWord === wordElement.dataset.word){
                score++;
                scoreValue.textContent = score;
                wordInput.value = '';
                fallingWordsContainer.removeChild(wordElement);
            }
        });
    });
});

// Type the Patterns

document.addEventListener('DOMContentLoaded', ()=>{
    const patternToType = document.getElementById('pattern-to-type');
    const patternInput = document.getElementById('pattern-input');
    const patternTime = document.getElementById('pattern-time');
    const patternAccuracy = document.getElementById('pattern-accuracy');
    const patternScore = document.getElementById('pattern-score');
    const patterns = ['abc123','bgd65%*92','asdf987','upsrt52&%d','5261tullu', '115599nadnf', '154sdhcusd#@', '1643hsi%%@', 'onvie7954$%', 'njnoi8438^*&'];

    let startTime;
    let timerInterval;

    function generatePattern() {
        patternToType.textContent = patterns[Math.floor(Math.random() * patterns.length)];
        patternInput.value = '';
        startTime = new Date().getTime();
        timerInterval = setInterval(updatePatternTime,100);
    }

    function updatePatternTime(){
        const elapsedTime = (new Date().getTime() - startTime) / 1000;
        patternTime.textContent = elapsedTime.toFixed(1);
    }

    generatePattern();

    patternInput.addEventListener('input', ()=>{
        const typedPattern = patternInput.value;
        const correctChars = typedPattern.split('').filter((char,index)=> char === patternToType.textContent[index]).length;

        const accuracy = (correctChars / typedPattern.length) * 100;
        patternAccuracy.textContent = accuracy.toFixed(1);

        if (typedPattern === patternToType.textContent){
            clearInterval(timerInterval);
            score++;
            patternScore.textContent = score;
            generatePattern();

        }
    });
});

// Typing race

document.addEventListener('DOMContentLoaded', ()=>{
    const raceText = document.getElementById('race-text');
    const raceInput = document.getElementById('race-input');
    const raceTime = document.getElementById('race-time');
    const raceWpm =  document.getElementById('race-wpm');
    const raceScore = document.getElementById('race-score');
    const progressBar = document.getElementById('progress');

    let startTime;
    let timerInterval;

    function updateProgressBar(percentage) {
        progressBar.style.width = percentage + '%';
    }

    raceInput.addEventListener('input', () =>{
        if (!startTime) {
            startTime = new Date().getTime();
            timerInterval = setInterval(()=>{
                const elapsedTime = (new Date().getTime() - startTime) / 1000;
                raceTime.textContent = elapsedTime.toFixed(1);
                const progressPercentage = (raceInput.value.length / raceText.textContent.length) * 100;
                updateProgressBar(progressPercentage);
            },100);
        }

        const typedText = raceInput.value;
        if (typedText === raceText.textContent) {
            clearInterval(timerInterval);
            const elapsedTime = (new Date().getTime() - startTime)/1000;
            const wordsTyped = typedText.split('').length;
            const wpm = (wordsTyped / elapsedTime) * 60;
            raceWpm.textContent = wpm.toFixed(1);
            score++;
            raceScore.textContent = score;
        }
    });
});