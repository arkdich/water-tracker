import { Current } from '../interface/current';
class WaterStorage {
  private current: Current;
  private previous: Current[];

  constructor() {
    this.current = JSON.parse(
      localStorage.getItem('_water-reminder_current') ?? `{}`
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
}

export const storage = new WaterStorage();
