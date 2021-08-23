import Dexie from 'dexie';
import { Current } from '../interface/current';

export class WaterDb extends Dexie {
  previous: Dexie.Table<Current>;

  constructor() {
    super('WaterDB');

    this.version(1).stores({
      previous: 'date, goal, done',
    });

    this.previous = this.table('previous');
  }
}
