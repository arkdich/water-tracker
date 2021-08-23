import '../scss/style';
import { goalChange, goalConfirm, takeWater } from './buttonHandlers';
import { storage } from './class/waterStorage';
import { renderNewGoal, renderProgress } from './components';
import {
  setSliderValueAndOutput,
  showControls,
  updateSliderValue,
  updateUI,
} from './utilities';

// if (navigator.serviceWorker) {
//   window.addEventListener('load', async () => {
//     navigator.serviceWorker.register('/sw.js');
//   });
// }

const header = document.querySelector('.header') as HTMLDivElement;
const btnControl = document.querySelector('.button-control') as HTMLDivElement;
const sliderControl = document.querySelector(
  '.slider-control'
) as HTMLDivElement;
const slider = document.querySelector(
  '.slider-control__slider'
) as HTMLInputElement;

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

storage.initCurrent().then((currentObj) => {
  if (currentObj.goal !== 0) {
    header.innerHTML = renderProgress(currentObj.done, currentObj.goal);
    showControls(true);
    updateUI();
    setSliderValueAndOutput();
  } else {
    header.innerHTML = renderNewGoal();
  }

  if (
    currentObj.date &&
    currentObj.date.valueOf() !== new Date(new Date().toDateString()).valueOf()
  ) {
    storage.storeCurrent(currentObj);
    updateUI();
    setSliderValueAndOutput();
  }
});

// disabling zoom on dbltap
document.body.addEventListener('dblclick', (ev) => ev.preventDefault());
