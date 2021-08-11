import { goalChange, goalConfirm, takeGlass } from './buttonHandlers';
import { storage } from './class/waterStorage';
import { renderNewGoal, renderProgress } from './components';
import { showControls, updateUI } from './utilities';

const header = document.querySelector('.header') as HTMLDivElement;
const btnControl = document.querySelector('.button-control') as HTMLDivElement;
const currentObj = storage.getCurrent();

header.addEventListener('click', goalConfirm);
header.addEventListener('click', goalChange);
header.addEventListener('keyup', (ev) => {
  if (ev.key !== 'Enter') return;

  const btn = header.querySelector('.header__btn_ok') as HTMLButtonElement;
  btn.click();
});

btnControl.addEventListener('click', takeGlass);

if (!currentObj.date) {
  header.innerHTML = renderNewGoal();
} else {
  header.innerHTML = renderProgress(currentObj.done, currentObj.goal);
  showControls(true);
  updateUI();
}

if (currentObj.date && currentObj.date !== new Date().toDateString()) {
  storage.storeCurrent(currentObj);
}
