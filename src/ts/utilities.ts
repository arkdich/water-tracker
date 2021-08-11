import { WaterStorage } from './class/waterStorage';

export const storage = new WaterStorage();

export function controlsToggle(): void {
  document.body.classList.toggle('controls-hidden');
}
