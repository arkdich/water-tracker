import { goalChange, goalConfirm, takeWater } from './buttonHandlers';
import { storage } from './class/waterStorage';
import { renderNewGoal, renderProgress } from './components';
import {
  setSliderValueAndOutput,
  showControls,
  updateSliderValue,
  updateUI,
} from './utilities';
import { statsShow } from './stats';

const header = document.querySelector('.header') as HTMLDivElement;
const btnControl = document.querySelector('.button-control') as HTMLDivElement;
const sliderControl = document.querySelector(
  '.slider-control'
) as HTMLDivElement;
const slider = document.querySelector(
  '.slider-control__slider'
) as HTMLInputElement;
const btnStats = document.querySelector('.btn_stats') as HTMLButtonElement;

const currentObj = storage.getCurrent();

header.addEventListener('click', goalConfirm);
header.addEventListener('click', goalChange);
header.addEventListener('keyup', (ev) => {
  if (ev.key !== 'Enter') return;

  const btn = header.querySelector('.header__btn_ok') as HTMLButtonElement;
  btn.click();
});

btnControl.addEventListener('click', takeWater);
sliderControl.addEventListener('click', takeWater);

slider.addEventListener('input', updateSliderValue);

btnStats.addEventListener('click', statsShow);

if (!currentObj.date) {
  header.innerHTML = renderNewGoal();
} else {
  header.innerHTML = renderProgress(currentObj.done, currentObj.goal);
  showControls(true);
  updateUI();
  setSliderValueAndOutput();
}

if (currentObj.date && currentObj.date !== new Date().toDateString()) {
  storage.storeCurrent(currentObj);
  updateUI();
  setSliderValueAndOutput();
}

// disabling zoom on dbltap
document.body.addEventListener('dblclick', (ev) => ev.preventDefault());
