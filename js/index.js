import { createElement } from './utils/dom.js';

const initApp = () => {
  const app = createElement('div', {
    className: 'app',
    children: [
      createElement('header', {
        className: 'header',
        children: [
          createElement('h1', {
            className: 'header__title',
            text: 'DOTA 2 MEMORY GAME',
          }),
        ],
      }),
      createElement('section', {
        className: 'status-panel',
        attributes: { 'aria-label': 'Game statistics' },
      }),
      createElement('main', {
        className: 'board-container',
        attributes: { 'aria-label': 'Game board' },
      }),
      createElement('footer', {
        className: 'footer',
        text: 'A student project for the RS School 2026Q3',
      }),
    ],
  });

  document.body.appendChild(app);
};

document.addEventListener('DOMContentLoaded', initApp);
