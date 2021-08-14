import { storage } from './class/waterStorage';

export function showControls(bool: boolean): void {
  if (bool) document.body.classList.add('controls-hidden');
  document.body.classList.remove('controls-hidden');
}

export function getDateString(start: Date, end: Date): string {
  return `${start.toDateString().slice(4, 10)} - ${end
    .toDateString()
    .slice(4, 10)}`;
}

export function getMaxPages(): number {
  const MILLISECS_IN_DAY = 86_400_000;

  const firstDate = new Date(
    storage.getPrevious()[0]?.date ?? new Date().toDateString()
  );
  const currDate = new Date(new Date().toDateString());

  const millisecsBetween = firstDate.valueOf() - currDate.valueOf();

  const daysBetween = Math.abs(millisecsBetween / MILLISECS_IN_DAY);

  const maxPages = Math.ceil(daysBetween / 7) + 1;

  return maxPages;
}

export function focusInput(): void {
  const headerInput = document.querySelector(
    '.header__input'
  ) as HTMLInputElement;

  headerInput.selectionStart = headerInput.value.length;
  headerInput.focus();
}

export function setSliderValueAndOutput(): void {
  const slider = document.querySelector(
    '.slider-control__slider'
  ) as HTMLInputElement;
  const sliderOutput = document.querySelector(
    '.slider-control__ammount'
  ) as HTMLInputElement;

  const value = storage.getSliderValue().toString();

  slider.value = value;
  sliderOutput.innerText = value;
}

export function updateSliderValue(ev: Event): void {
  const input = ev.target as HTMLInputElement;
  const output = document.querySelector(
    '.slider-control__ammount'
  ) as HTMLDivElement;

  output.innerText = input.value;
}

export function updateUI(): void {
  updateProggres();
  updateGlass();
  updateGlassCounter();
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

function updateProggres(): void {
  const headerDone = document.querySelector('.header__done') as HTMLSpanElement;
  const current = storage.getCurrent();

  headerDone.innerText = current.done.toString();
}

function updateGlassCounter(): void {
  const glassCounter = document.querySelector(
    '.button-control__counter'
  ) as HTMLDivElement;
  const current = storage.getCurrent();

  glassCounter.innerText = (current.done / 200).toFixed(0);
}
