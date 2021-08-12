export function renderProgress(done: number, goal: number): string {
  return `
    <span class="header__done">${done}</span> of
    <span class="header__goal">${goal}</span> ml
    <button class="btn btn_control header__btn header__btn_change"></button>`;
}

export function renderNewGoal(): string {
  return `
    My Goal is
    <input
    class="header__input"
    type="text"
    maxLength=3
    value="2.5"
    enterkeyhint="send"
    />
    Liters
    <button class="btn btn_control header__btn header__btn_ok"></button>`;
}
