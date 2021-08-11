import { goalChange, goalConfirm } from './buttonHandlers';
import { storage } from './class/waterStorage';
import { renderNewGoal, renderProgress } from './components';
import { showControls } from './utilities';

const header = document.querySelector('.header') as HTMLDivElement;
const currentObj = storage.getCurrent();

header.addEventListener('click', goalConfirm);
header.addEventListener('click', goalChange);
header.addEventListener('keyup', (ev) => {
  if (ev.key !== 'Enter') return;

  const btn = header.querySelector('.header__btn_ok') as HTMLButtonElement;
  btn.click();
});

if (!currentObj.date) {
  header.innerHTML = renderNewGoal();
} else {
  header.innerHTML = renderProgress(currentObj.done, currentObj.goal);
  showControls(true);
}

if (currentObj.date !== new Date().toDateString()) {
  storage.storeCurrent(currentObj);
}

console.log(currentObj);
