import Chart from '../../node_modules/chart.js/auto/auto.esm';
import { storage } from './class/waterStorage';
import { Current } from './interface/current';

const ctx = document.querySelector('canvas') as HTMLCanvasElement;

// for (let i = 0; i < 2; i++) {
//   const date = new Date();
//   date.setDate(i);

//   const cur: Current = {
//     date: date.toDateString(),
//     goal: i * 500,
//     done: i * 250,
//   };

//   storage.storeCurrent(cur);
// }

const weekDayes = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
let pageNumber = 1;
// const data: { x: string; y: number }[] = [];
const data: number[] = [];

const today = new Date();
const todayNum = today.getDay() === 0 ? 1 : today.getDay() - 1;

const chosenWeek = storage.getPrevious().slice(-todayNum);

if (storage.getPrevious().length === 0) {
  for (let i = 0; i < todayNum; i++) {
    data.push(0);
  }
}

if (
  storage.getPrevious().length < todayNum &&
  storage.getPrevious().length !== 0
) {
  for (let i = 0; i < todayNum - storage.getPrevious().length; i++) {
    data.push(0);
  }
}

chosenWeek.push(storage.getCurrent());

// storage.setCurrent({ date: new Date().toDateString(), goal: 2500, done: 1200 });

chosenWeek.forEach((day) => {
  //   data.push({ x: day.date.slice(0, 3), y: day.done });
  data.push(day.done);
});

console.log(storage.getPrevious());
console.log(chosenWeek);
console.log(data);
console.log(storage.getCurrent());

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: weekDayes,
    datasets: [
      {
        label: 'Water consumed',
        data: data,
        backgroundColor: ['rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// fill empties between last and todays date in case app hasn't been opened in a while
