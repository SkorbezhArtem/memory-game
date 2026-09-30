import { createElement } from './utils/dom.js';
import { createHeader } from './components/header.js';
import { createStatusPanel } from './components/status.js';
import { createBoard } from './components/board.js';

const ITEMS = [
  { key: 'blink-dagger', name: 'Blink Dagger', image: './assets/items/blink.png' },
  { key: 'aghanims-scepter', name: 'Aghanims Scepter', image: './assets/items/scepter.png' },
  { key: 'divine-rapier', name: 'Divine Rapier', image: './assets/items/rapier.png' },
  { key: 'black-king-bar', name: 'Black King Bar', image: './assets/items/bkb.png' },
  { key: 'heart-of-tarrasque', name: 'Heart of Tarrasque', image: './assets/items/heart.png' },
  { key: 'desolator', name: 'Desolator', image: './assets/items/desolator.png' },
  { key: 'daedalus', name: 'Daedalus', image: './assets/items/daedalus.png' },
  { key: 'refresher-orb', name: 'Refresher Orb', image: './assets/items/refresher.png' },
];

const initApp = () => {
  const header = createHeader({
    onNewGame: () => {
      board.render();
    },
    onLeaderboard: () => {},
  });

  const statusPanel = createStatusPanel();

  const board = createBoard({
    items: ITEMS,
    onCardClick: (clickedCard) => {
      if (!clickedCard.isFlipped()) {
        clickedCard.flip();
      } else {
        clickedCard.unflip();
      }
    },
  });

  const boardContainer = createElement('main', {
    className: 'board-container',
    attributes: { 'aria-label': 'Game board' },
    children: [board.element],
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

initApp();
