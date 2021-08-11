export function showControls(bool: boolean): void {
  if (bool) document.body.classList.add('controls-hidden');
  document.body.classList.remove('controls-hidden');
}

export function focusInput(): void {
  const headerInput = document.querySelector(
    '.header__input'
  ) as HTMLInputElement;

  headerInput.selectionStart = headerInput.value.length;
  headerInput.focus();
}
