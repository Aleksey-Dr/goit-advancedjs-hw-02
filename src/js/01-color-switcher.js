// COLOR SWITCHER
console.log('Color switcher');

// ========== find elements
const bodyElement = document.querySelector('body');

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

// ========== variable for interval id
let switcherColor = null;

// ========== default state for the "Stop" button
btnStop.disabled = true;

// ========== colors generator
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};

// ========== handler of events
const handlerStart = () => {
    switcherColor = setInterval(() => {
        bodyElement.style.backgroundColor = getRandomHexColor();
    }, 1000);

    btnStart.disabled = true;
    btnStop.disabled = false;
};

const handlerStop = () => {
    clearInterval(switcherColor);

    btnStop.disabled = true;
    btnStart.disabled = false;
};

// ========== listeners
btnStart.addEventListener('click', handlerStart);
btnStop.addEventListener('click', handlerStop);