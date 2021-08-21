import Dexie from 'dexie';
import { Current } from '../interface/current';

export class WaterDb extends Dexie {
  previous: Dexie.Table<Current>;
  currentInfo: Dexie.Table<{
    lastDrink: string;
    sliderValue: number;
  }>;

  constructor() {
    super('WaterDB');

    this.version(1).stores({
      previous: '++id, date, goal, done',
      current: 'lastDrink, sliderValue',
    });

    this.previous = this.table('previous');
    this.currentInfo = this.table('current');
  }
}
