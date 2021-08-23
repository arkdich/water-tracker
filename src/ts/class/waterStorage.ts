import { Current } from '../interface/current';
import { WaterDb } from './waterDb';
class WaterStorage {
  private waterDb = new WaterDb();
  private current: Current;
  private sliderValue: number;
  private lastDrink: string | undefined;

  constructor() {
    this.current = {
      date: new Date(new Date().toDateString()),
      goal: 0,
      done: 0,
    };

    this.sliderValue = Number(
      document.cookie
        ?.split(';')
        ?.find((str) => str.includes('sliderValue'))
        ?.split('=')[1] ?? 120
    );

    this.lastDrink = document.cookie
      ?.split(';')
      ?.find((str) => str.includes('lastDrink'))
      ?.split('=')[1];
  }

  public async initCurrent() {
    const cur = await this.waterDb.previous.get({
      date: new Date(new Date().toDateString()),
    });

    this.current = cur ?? {
      date: new Date(new Date().toDateString()),
      goal: 0,
      done: 0,
    };

    return this.current;
  }

  public getCurrent() {
    return this.current;
  }

  public setCurrent(value: Current) {
    this.current = value;
    this.waterDb.previous.put(this.current);
  }

  public storeCurrent(value: Current) {
    this.waterDb.previous.put(value);

    this.setCurrent({
      date: new Date(new Date().toDateString()),
      goal: this.current.goal,
      done: 0,
    });
  }

  public async getWeek(start: Date, end: Date) {
    return await this.waterDb.previous
      .where('date')
      .between(start, end, true, true)
      .toArray();
  }

  public getSliderValue() {
    return this.sliderValue;
  }

  public setSliderValue(value: number) {
    document.cookie = `sliderValue=${value}; max-age=${60 * 60 * 24 * 30}`;
  }

  public getLastDrink() {
    return this.lastDrink;
  }

  public setLastDrink(timeString: string) {
    const splitted = timeString.split(':');
    const formatted = `${splitted[0]}:${splitted[1]}`;

    this.lastDrink = formatted;
    document.cookie = `lastDrink=${formatted}; max-age${60 * 60 * 24 * 30}`;
  }

  public async getFirstDate() {
    const firstEntry = await this.waterDb.previous.orderBy('date').first();

    return firstEntry?.date;
  }
}

export const storage = new WaterStorage();
