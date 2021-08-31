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

export async function getMaxPages(): Promise<number> {
  const MILLISECS_IN_DAY = 86_400_000;
  let maxPages: number;

  const currDate = new Date(new Date().setHours(0, 0, 0, 0));
  const firstEntryDate = await storage.getFirstDate();

  const firstDate = firstEntryDate ?? currDate;

  const currentWeekDay = currDate.getDay() === 0 ? 1 : currDate.getDay() - 1;

  const weekStart = new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    currDate.getDate() - currentWeekDay
  );

  const millisecsBetween = firstDate.valueOf() - weekStart.valueOf();
  const daysBetween = millisecsBetween / MILLISECS_IN_DAY;

  const pagesCoeff = Math.abs(daysBetween / 7);

  if (daysBetween >= 0) maxPages = 1;
  else maxPages = Math.ceil(pagesCoeff) + 1;

  return maxPages;
}

export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches;
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
  updateProgress();
  updateGlass();
  updateGlassCounter();
  updateDrinkInfo();
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

function updateProgress(): void {
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

function updateDrinkInfo(): void {
  const info = document.querySelector('.drink-info__value') as HTMLSpanElement;
  const lastDrink = storage.getLastDrink();

  info.innerText = lastDrink;
}
