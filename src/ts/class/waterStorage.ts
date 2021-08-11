import { Current } from '../interface/current';

export class WaterStorage {
  private current: Current;
  private previous: Current[];

  constructor() {
    this.current = JSON.parse(
      localStorage.getItem('_water-reminder_current') ??
        `{ "date": "${new Date().toDateString()}", "goal": 0, "done": 0 }`
    );

    this.previous = JSON.parse(
      localStorage.getItem('_water-reminder_previous') ?? '[]'
    );
  }

  public getCurrent(): Current {
    return this.current;
  }

  public setCurrent(value: Current): void {
    this.current = value;
    localStorage.setItem('_water-reminder_current', JSON.stringify(value));
  }

  public getPrevious(): Current[] {
    return this.previous;
  }

  public setPrevious(value: Current[]): void {
    this.previous = value;
    localStorage.setItem('_water-reminder_previous', JSON.stringify(value));
  }
}
