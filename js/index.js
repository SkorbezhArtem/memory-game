import { createElement } from './utils/dom.js';
import { createHeader } from './components/header.js';
import { createStatusPanel } from './components/status.js';

const initApp = () => {
  const header = createHeader({
    onNewGame: () => {},
    onLeaderboard: () => {},
  });

  const statusPanel = createStatusPanel();

  const boardContainer = createElement('main', {
    className: 'board-container',
    attributes: { 'aria-label': 'Game board' },
  });

  const footer = createElement('footer', {
    className: 'footer',
    text: 'A student project for the RS School 2026Q3',
  });

  const app = createElement('div', {
    className: 'app',
    children: [header.element, statusPanel.element, boardContainer, footer],
  });

  document.body.appendChild(app);
};

document.addEventListener('DOMContentLoaded', initApp);
