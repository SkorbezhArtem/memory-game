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
  let firstCard = null;
  let secondCard = null;
  let isLocked = false;
  let moves = 0;
  let matches = 0;
  let mismatchTimeoutId = null;

  const resetGame = () => {
    if (mismatchTimeoutId) {
      clearTimeout(mismatchTimeoutId);
      mismatchTimeoutId = null;
    }
    firstCard = null;
    secondCard = null;
    isLocked = false;
    moves = 0;
    matches = 0;
    statusPanel.reset();
    board.render();
  };

  const handleCardClick = (card) => {
    if (isLocked || card.isMatched() || card === firstCard) return;

    card.flip();

    if (!firstCard) {
      firstCard = card;
      return;
    }

    secondCard = card;
    moves += 1;
    statusPanel.setMoves(moves);

    if (firstCard.key === secondCard.key) {
      firstCard.match();
      secondCard.match();
      matches += 1;
      statusPanel.setMatches(matches);
      firstCard = null;
      secondCard = null;
    } else {
      isLocked = true;
      board.lock();
      mismatchTimeoutId = setTimeout(() => {
        firstCard?.unflip();
        secondCard?.unflip();
        firstCard = null;
        secondCard = null;
        isLocked = false;
        board.unlock();
        mismatchTimeoutId = null;
      }, 1000);
    }
  };

  const header = createHeader({
    onNewGame: resetGame,
    onLeaderboard: () => {},
  });

  const statusPanel = createStatusPanel();

  const board = createBoard({
    items: ITEMS,
    onCardClick: handleCardClick,
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
