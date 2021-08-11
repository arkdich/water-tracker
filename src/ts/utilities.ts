import { storage } from './class/waterStorage';

export function showControls(bool: boolean): void {
  if (bool) document.body.classList.add('controls-hidden');
  document.body.classList.remove('controls-hidden');
}

export function focusInput(): void {
  const headerInput = document.querySelector(
    '.header__input'
  ) as HTMLInputElement;

  headerInput.selectionStart = headerInput.value.length;
  headerInput.focus();
}

export function updateUI(): void {
  updateTrack();
  updateGlass();
}

export function updateGlass(): void {
  const glassPerc = document.querySelector(
    '.glass__percentage'
  ) as HTMLDivElement;
  const glassEmpty = document.querySelector('.glass__empty') as HTMLDivElement;

  const current = storage.getCurrent();
  const donePercent = (current.done / current.goal) * 100;
  const heightValue = 100 - donePercent;

  glassEmpty.style.height = `${heightValue < 0 ? 0 : heightValue}%`;
  glassEmpty.innerText = '';

  glassPerc.innerText = `${donePercent.toFixed(1)}%`;
}

function updateTrack(): void {
  const headerDone = document.querySelector('.header__done') as HTMLSpanElement;
  const current = storage.getCurrent();

  headerDone.innerText = current.done.toString();
  updateGlassCounter();
}

function updateGlassCounter(): void {
  const glassCounter = document.querySelector(
    '.button-control__counter'
  ) as HTMLDivElement;
  const current = storage.getCurrent();

  glassCounter.innerText = (current.done / 200).toString();
}
