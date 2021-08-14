import { Current } from '../interface/current';
class WaterStorage {
  private current: Current;
  private previous: Current[];
  private sliderValue: number;
  private lastDrink: string;

  constructor() {
    this.current = JSON.parse(
      localStorage.getItem('_water-reminder_current') ?? `{}`
    );

    this.previous = JSON.parse(
      localStorage.getItem('_water-reminder_previous') ?? '[]'
    );

    this.sliderValue = JSON.parse(
      localStorage.getItem('_water-reminder_sliderValue') ?? '120'
    );

    this.lastDrink = localStorage.getItem('_water-reminder_lastDrink') ?? '';
  }

  public getCurrent(): Current {
    return this.current;
  }

  public setCurrent(value: Current): void {
    this.current = value;
    localStorage.setItem('_water-reminder_current', JSON.stringify(value));
  }

  public storeCurrent(value: Current): void {
    this.previous.push(value);

    localStorage.setItem(
      '_water-reminder_previous',
      JSON.stringify(this.previous)
    );

    this.setCurrent({
      date: new Date().toDateString(),
      goal: this.current.goal,
      done: 0,
    });
  }

  public getPrevious(): Current[] {
    return this.previous;
  }

  public getSliderValue(): number {
    return this.sliderValue;
  }

  public setSliderValue(value: number): void {
    this.sliderValue = value;
    localStorage.setItem('_water-reminder_sliderValue', JSON.stringify(value));
  }

  public getLastDrink(): string {
    return this.lastDrink;
  }

  public setLastDrink(timeString: string): void {
    const splitted = timeString.split(':');
    const formatted = `${splitted[0]}:${splitted[1]}`;

    this.lastDrink = formatted;
    localStorage.setItem('_water-reminder_lastDrink', formatted);
  }
}

export const storage = new WaterStorage();
