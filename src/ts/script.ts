import { goalConfirm } from './buttonHandlers';

const header = document.querySelector('.header') as HTMLDivElement;

header.addEventListener('click', goalConfirm);
