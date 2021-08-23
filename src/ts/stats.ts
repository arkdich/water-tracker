import Chart from '../../node_modules/chart.js/auto/auto.esm';
import { storage } from './class/waterStorage';
import { renderStats } from './components';
import { getDateString, getMaxPages } from './utilities';

const btnStats = document.querySelector('.btn_stats') as HTMLButtonElement;
btnStats.addEventListener('click', statsShow);

let currentPage = 1;

let maxPages: number;
getMaxPages().then((value) => (maxPages = value));

let chart: Chart<'bar', { x: string; y: number }[], string>;

let btnLeft: HTMLButtonElement;
let btnRight: HTMLButtonElement;

export function statsShow(): void {
  const statsCont = document.createElement('div');
  document.body.append(statsCont);

  statsCont.outerHTML = renderStats();

  const stats = document.querySelector('.stats') as HTMLDivElement;

  btnLeft = document.querySelector('.stats__btn_left') as HTMLButtonElement;
  btnRight = document.querySelector('.stats__btn_right') as HTMLButtonElement;
  btnRight.disabled = true;

  if (maxPages === 1) btnLeft.disabled = true;

  stats.addEventListener('click', changePage);
  document.body.addEventListener('click', statsClose);

  getPage(1);
}

function statsClose(ev: MouseEvent): void {
  const target = ev.target as HTMLElement;

  if (!target.matches('.stats__close, .overlay')) return;

  const stats = document.querySelector('.stats') as HTMLDivElement;
  const overlay = document.querySelector('.overlay') as HTMLDivElement;

  stats.remove();
  overlay.remove();
}

function changePage(ev: MouseEvent): void {
  const target = ev.target as HTMLButtonElement;

  if (!target.matches('.stats__btn')) return;

  if (target.matches('.stats__btn_left')) {
    if (currentPage === maxPages) return;

    currentPage += 1;
    btnRight.disabled = false;

    if (currentPage === maxPages) target.disabled = true;
  }

  if (target.matches('.stats__btn_right')) {
    if (currentPage === 1) return;

    currentPage -= 1;
    btnLeft.disabled = false;

    if (currentPage === 1) target.disabled = true;
  }

  getPage(currentPage);
}

function getPage(page: number): void {
  const today = new Date();
  const currentWeekDay = today.getDay() === 0 ? 1 : today.getDay() - 1;

  let weekStart: Date;

  const startingPoint = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - currentWeekDay
  );

  if (page === 1) {
    weekStart = startingPoint;
  } else {
    weekStart = new Date(
      startingPoint.getFullYear(),
      startingPoint.getMonth(),
      startingPoint.getDate() - 7 * (page - 1)
    );
  }

  const weekEnd = new Date(
    weekStart.getFullYear(),
    weekStart.getMonth(),
    weekStart.getDate() + 6
  );

  if (chart) chart.destroy();

  renderWeek(weekStart, weekEnd);
}

async function renderWeek(start: Date, end: Date) {
  const ctx = document.querySelector('canvas') as HTMLCanvasElement;
  const data: { x: string; y: number }[] = [];

  const chosenWeek = await storage.getWeek(start, end);

  if (currentPage === 1) chosenWeek.push(storage.getCurrent());

  chosenWeek.forEach((day) => {
    data.push({ x: day.date.toDateString().slice(0, 3), y: day.done });
  });

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          data: data,
          backgroundColor: ['#69b4f1'],
        },
      ],
    },
    options: {
      font: {
        size: 13,
        weight: '300',
      },
      plugins: {
        title: {
          display: true,
          text: getDateString(start, end),
          font: { weight: '300', size: 17 },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          suggestedMax: storage.getCurrent().goal,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    },
  });
}

// const waterDb = new WaterDb();

// for (let i = 21; i > 10; i--) {
//   waterDb.previous.put({
//     date: new Date(2021, 7, i, 0, 0, 0, 0),
//     goal: 2500,
//     done: i * 50,
//   });
// }

// waterDb.currentInfo.put({
//   lastDrink: storage.getLastDrink() ?? '13:37',
//   sliderValue: storage.getSliderValue(),
// });

// waterDb.previous.toArray().then(console.log);

// waterDb.previous
//   .where('done')
//   .aboveOrEqual(200)
//   .and((obj) => obj.done <= 600)
//   .toArray()
//   .then(console.log);
