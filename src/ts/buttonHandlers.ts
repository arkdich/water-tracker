import { storage } from './class/waterStorage';
import { renderNewGoal, renderProgress } from './components';
import {
  focusInput,
  setSliderValueAndOutput,
  showControls,
  updateUI,
} from './utilities';

export function goalConfirm(ev: MouseEvent): void {
  const target = ev.target as HTMLButtonElement;

  if (!target.matches('.header__btn_ok')) return;

  const goalInput = document.querySelector(
    '.header__input'
  ) as HTMLInputElement;
  const header = target.closest('.header') as HTMLDivElement;

  const goalValue = Number(Number(goalInput.value).toFixed(1));

  if (goalValue === 0 || isNaN(goalValue)) {
    goalInput.setCustomValidity('yo man');
    return;
  }

  const current = {
    date: new Date().toDateString(),
    goal: goalValue * 1000,
    done: storage.getCurrent().done ?? 0,
  };

  showControls(true);
  storage.setCurrent(current);

  header.innerHTML = renderProgress(current.done, current.goal);

  updateUI();
  setSliderValueAndOutput();
}

export function goalChange(ev: MouseEvent): void {
  const target = ev.target as HTMLButtonElement;

  if (!target.matches('.header__btn_change')) return;

  const header = target.closest('.header') as HTMLDivElement;
  header.innerHTML = renderNewGoal();

  focusInput();
}

export function takeWater(ev: MouseEvent): void {
  const target = ev.target as HTMLButtonElement;

  if (!target.matches('button')) return;

  const current = storage.getCurrent();
  let glassVolume = 200;

  const sliderCont = target.closest('.slider-control');

  if (sliderCont) {
    const rangeInput = sliderCont.querySelector(
      '.slider-control__slider'
    ) as HTMLInputElement;
    const inputValue = Number(rangeInput.value);

    glassVolume = Number(inputValue);

    storage.setSliderValue(inputValue);
  }

  if (target.matches('.button-control__plus, .slider-control__add')) {
    current.done += glassVolume;
  }

  if (target.matches('.button-control__minus, .slider-control__delete')) {
    if (current.done - glassVolume < 0) current.done = 0;
    else current.done -= glassVolume;
  }

  storage.setCurrent(current);
  updateUI();
}
