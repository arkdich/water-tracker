import { storage } from './class/waterStorage';
import { renderNewGoal, renderProgress } from './components';
import { focusInput, showControls, updateUI } from './utilities';

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
    done: 0,
  };

  showControls(true);
  storage.setCurrent(current);

  header.innerHTML = renderProgress(current.done, current.goal);
  updateUI();
}

export function goalChange(ev: MouseEvent): void {
  const target = ev.target as HTMLButtonElement;

  if (!target.matches('.header__btn_change')) return;

  const header = target.closest('.header') as HTMLDivElement;
  header.innerHTML = renderNewGoal();

  focusInput();
}

export function takeGlass(ev: MouseEvent): void {
  const target = ev.target as HTMLButtonElement;
  const current = storage.getCurrent();
  const glassVolume = 200;

  if (target.matches('.button-control__plus')) {
    current.done += glassVolume;
  }

  if (target.matches('.button-control__minus')) {
    if (current.done - glassVolume < 0) return;

    current.done -= glassVolume;
  }

  storage.setCurrent(current);
  updateUI();
}
