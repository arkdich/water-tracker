import { Current } from '../interface/current';
import { WaterDb } from './waterDb';
class WaterStorage {
  private waterDb = new WaterDb();
  private current: Current;
  private sliderValue: number;
  private lastDrink: string;

  constructor() {
    this.current = {
      date: new Date(new Date().setHours(0, 0, 0, 0)),
      goal: 0,
      done: 0,
    };

    this.sliderValue = Number(
      document.cookie
        ?.split(';')
        ?.find((str) => str.includes('sliderValue'))
        ?.split('=')[1] ?? 125
    );

    this.lastDrink =
      document.cookie
        ?.split(';')
        ?.find((str) => str.includes('lastDrink'))
        ?.split('=')[1] ?? 'up ahead';
  }

  public async initCurrent() {
    const cur = await this.waterDb.previous.get(
      new Date(new Date().setHours(0, 0, 0, 0))
    );

    if (cur) {
      this.current = cur;
      return this.current;
    } else {
      const lastEtnry = await this.waterDb.previous.orderBy('date').last();

      if (lastEtnry) {
        this.current.goal = lastEtnry.goal;
      }

      return this.current;
    }
  }

  public getCurrent() {
    return this.current;
  }

  public setCurrent(value: Current) {
    this.current = value;
    this.waterDb.previous.put(this.current);
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
