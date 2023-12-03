// COUNTDOWN TIMER
console.log('Countdown timer');

// ========== imports
// ========== import "flatpickr" library
// ========== from documentation
import flatpickr from 'flatpickr';
// ========== additional
import "flatpickr/dist/flatpickr.min.css";

// ========== import "izitoast" library
// ========== from documentation
import iziToast from "izitoast";
// ========== additional
import "izitoast/dist/css/iziToast.min.css";

// ========== object of parameters
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        onSelectingValidDate(selectedDates[0]);
        console.log(selectedDates[0]);
    },
};

// ========== function for count of values
function convertMs(ms) {
// Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Remaining days
const days = Math.floor(ms / day);
// Remaining hours
const hours = Math.floor((ms % day) / hour);
// Remaining minutes
const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// ========== find elements
const inputWindow = document.querySelector('#datetime-picker');

const btnStart = document.querySelector('[data-start]');

const daysE = document.querySelector('[data-days]');
const hoursE = document.querySelector('[data-hours]');
const minutesE = document.querySelector('[data-minutes]');
const secondsE = document.querySelector('[data-seconds]');

// ========== variables
// ========== variable for interval id
let intervalId = null;
// ========== variable for time and date of input
let inputDate = null;

// ========== default state for "Start" button
btnStart.disabled = true;

// ========== from documentation
// ========== if using flatpickr in a framework,
// ========== its recommended to pass the element directly
flatpickr(inputWindow, options);

// ========== handler of selecting date and check of valid date
function onSelectingValidDate (selectedDates) {
    inputDate = selectedDates.getTime();
    if (inputDate < Date.now()) {
        // blocking button startBtn
        btnStart.disabled = true;
        // show notification
        iziToast.show({
            backgroundColor: '#FD4A3F',
            message: 'Please choose a date in the future',
            timeout: 3000,
            position: 'topRight',
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX',
        });
        return;
    }
    // unblocking button startBtn
    btnStart.disabled = false;
};

const addLeadingZero = (value) => {
  return String(value).padStart(2, '0');
};

// ========== show screen of timer
const updateClockface = ({ days, hours, minutes, seconds }) => {
    secondsE.textContent = addLeadingZero(seconds);
    minutesE.textContent = addLeadingZero(minutes);
    hoursE.textContent = addLeadingZero(hours);
    if (days > 99) {
        daysE.textContent = days;
    }
    daysE.textContent = addLeadingZero(days);
};

const countDownTimer = () => {
    const deltaTime = inputDate - Date.now();
    // counter values
    const timeComponents = convertMs(deltaTime);
    // show screen of timer
    updateClockface(timeComponents);
    if (secondsE.textContent === '00' && minutesE.textContent === '00'
        && hoursE.textContent === '00' && daysE.textContent === '00') {
        // show notification
        iziToast.show({
            backgroundColor: 'lightyellow',
            message: 'Time is over!',
            timeout: 3000,
            position: 'topRight',
            transitionIn: 'flipInX',
            transitionOut: 'flipOutX',
        });
        clearInterval(intervalId);
        // Unblocking button startBtn
        btnStart.disabled = false;
    }
};

const handlerStart = () => {
    intervalId = setInterval(countDownTimer, 1000);
    btnStart.disabled = true;
};

const notificationStart = () =>
    // show notification
    iziToast.show({
        backgroundColor: 'lightgreen',
        message: 'Time is started!',
        timeout: 3000,
        position: 'topRight',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
    });

// ========== listeners
btnStart.addEventListener('click', handlerStart);
// ========== show notification
btnStart.addEventListener('click', notificationStart);