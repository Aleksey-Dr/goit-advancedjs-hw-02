console.log('Promise generator');

// ========== imports
// ========== import "izitoast" library
// ========== from documentation
import iziToast from "izitoast";
// ========== additional
import "izitoast/dist/css/iziToast.min.css";

// ========== find elements
const formPromises = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay)
  );
};

// ========== callback for listener
const onFormSubmit = (evt) => {
  evt.preventDefault();

  let delay = Number(formPromises.delay.value);

  for (let i = 1; i <= formPromises.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
      // show in window
      iziToast.show({
        backgroundColor: 'lightgreen',
        message: `✅ Fulfilled promise ${position} in ${delay}ms`,
        position: 'topRight',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
      });
    })
      .catch(({ position, delay }) => {
      // show in console
      iziToast.show({
        backgroundColor: '#FD4A3F',
        message: `❌ Rejected promise ${position} in ${delay}ms`,
        position: 'topRight',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
      });
    });
    delay = delay + Number(formPromises.step.value);
  }
};

// ========== listener
formPromises.addEventListener('submit', onFormSubmit);