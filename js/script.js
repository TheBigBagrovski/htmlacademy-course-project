import { genderConstants, activityCoefficients } from './utils.js';

const form = document.querySelector('.counter__form');
const result = document.querySelector('.counter__result');
const resultList = document.querySelector('.counter__result-list');
const genderInputMale = form.querySelector('#gender-male');
const activityInputs = form.querySelector('.radios-group');
const activityMinInput = document.querySelector('#activity-minimal');
const heightInput = form.querySelector('#height');
const weightInput = form.querySelector('#weight');
const ageInput = form.querySelector('#age');
const submitButton = form.querySelector('.form__submit-button');
const resetButton = form.querySelector('.form__reset-button');

const regexNumber = /^[\s]*\d+[\s]*$/;

let activityCoefficient = 1.2;

const disableSubmitButton = () => {submitButton.disabled = !(regexNumber.test(ageInput.value) && regexNumber.test(heightInput.value)
  && regexNumber.test(weightInput.value));};

const disableResetButton = () => {resetButton.disabled =  !(regexNumber.test(ageInput.value) || regexNumber.test(heightInput.value)
   || regexNumber.test(weightInput.value));};

ageInput.addEventListener('keyup', disableSubmitButton);
heightInput.addEventListener('keyup', disableSubmitButton);
weightInput.addEventListener('keyup', disableSubmitButton);
ageInput.addEventListener('keyup', disableResetButton);
heightInput.addEventListener('keyup', disableResetButton);
weightInput.addEventListener('keyup', disableResetButton);

const calculate = () => {
  const N = (10 * weightInput.value) + (6.25 * heightInput.value) - (5 * ageInput.value) + genderConstants.get(form.elements.gender.value);
  return Math.round(activityCoefficient * N);
};

submitButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  result.classList.remove('counter__result--hidden');
  const calories = calculate();
  resultList.querySelector('#calories-norm').textContent = calories.toString();
  resultList.querySelector('#calories-minimal').textContent = Math.round(calories * 0.85).toString();
  resultList.querySelector('#calories-maximal').textContent = Math.round(calories * 1.15).toString();
});

activityInputs.addEventListener('change', (evt) => {
  evt.preventDefault();
  activityCoefficient = activityCoefficients.get(form.elements.activity.value);
});

resetButton.addEventListener('click', () => {
  result.classList.add('counter__result--hidden');
  ageInput.value = '';
  heightInput.value = '';
  weightInput.value = '';
  activityCoefficient = 1.2;
  submitButton.disabled = true;
  resetButton.disabled = true;
  genderInputMale.checked = true;
  activityInputs.querySelectorAll('input').forEach((element) => {
    element.checked = false;
  });
  activityMinInput.checked = true;
});
