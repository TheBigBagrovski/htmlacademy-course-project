import { genderConstants, activityCoefficients, percentageConstants } from './utils.js';

const WEIGHT_FORMULA_CONSTANT = 10;
const HEIGHT_FORMULA_CONSTANT = 6.25;
const AGE_FORMULA_CONSTANT = 5;
const REGEX_NUMBER = /^[\s]*\d+[\s]*$/;

const form = document.querySelector('.counter__form');
const result = document.querySelector('.counter__result');
const resultList = document.querySelector('.counter__result-list');
const genderInputMale = form.querySelector('#gender-male');
const activityInputs = form.querySelector('.radios-group');
const activityMinInput = document.querySelector('#activity-minimal');
const heightInput = form.querySelector('#height');
const weightInput = form.querySelector('#weight');
const ageInput = form.querySelector('#age');
const buttonSubmit = form.querySelector('.form__submit-button');
const buttonReset = form.querySelector('.form__reset-button');

let activityCoefficient = activityCoefficients.get('min');

const disableSubmitButton = () => {
  buttonSubmit.disabled = !(REGEX_NUMBER.test(ageInput.value) && REGEX_NUMBER.test(heightInput.value) && REGEX_NUMBER.test(weightInput.value));
};

const disableResetButton = () => {
  buttonReset.disabled =  (ageInput.value === '' && heightInput.value === '' && weightInput.value === '');
};

ageInput.addEventListener('keyup', () => {
  disableSubmitButton();
  disableResetButton();
});

heightInput.addEventListener('keyup', () => {
  disableSubmitButton();
  disableResetButton();
});

weightInput.addEventListener('keyup', () => {
  disableSubmitButton();
  disableResetButton();
});

const calculateCalories = () => {
  const N = (WEIGHT_FORMULA_CONSTANT * weightInput.value) + (HEIGHT_FORMULA_CONSTANT * heightInput.value) - (AGE_FORMULA_CONSTANT * ageInput.value) + genderConstants.get(form.elements.gender.value);
  return Math.round(activityCoefficient * N);
};

buttonSubmit.addEventListener('click', (evt) => {
  evt.preventDefault();
  result.classList.remove('counter__result--hidden');
  const calories = calculateCalories();
  resultList.querySelector('#calories-norm').textContent = calories.toString();
  resultList.querySelector('#calories-minimal').textContent = Math.round(calories * percentageConstants.get('loss')).toString();
  resultList.querySelector('#calories-maximal').textContent = Math.round(calories * percentageConstants.get('gain')).toString();
});

activityInputs.addEventListener('change', (evt) => {
  evt.preventDefault();
  activityCoefficient = activityCoefficients.get(form.elements.activity.value);
});

const resetInputs = () => {
  result.classList.add('counter__result--hidden');
  // form.reset();    Uncaught TypeError: form.reset is not a function
  ageInput.value = '';
  weightInput.value = '';
  heightInput.value = '';
  activityCoefficient = activityCoefficients.get('min');
  buttonSubmit.disabled = true;
  buttonReset.disabled = true;
  genderInputMale.checked = true;
  activityInputs.querySelectorAll('input').forEach((element) => {
    element.checked = false;
  });
  activityMinInput.checked = true;
};

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetInputs();
});

disableResetButton();
disableSubmitButton();
resetInputs();
