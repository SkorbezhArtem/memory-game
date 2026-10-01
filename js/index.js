import { createElement } from './utils/dom.js';
import { createHeader } from './components/header.js';
import { createStatusPanel } from './components/status.js';
import { createBoard } from './components/board.js';
import { createModal } from './components/modal.js';
import { saveScore } from './state/storage.js';
import { showLeaderboardModal } from './components/leaderboard.js';

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

const TOTAL_PAIRS = ITEMS.length;

const initApp = () => {
  let firstCard = null;
  let secondCard = null;
  let isLocked = false;
  let moves = 0;
  let matches = 0;
  let mismatchTimeoutId = null;
  let winTimeoutId = null;

  const resetGame = () => {
    if (mismatchTimeoutId) {
      clearTimeout(mismatchTimeoutId);
      mismatchTimeoutId = null;
    }
    if (winTimeoutId) {
      clearTimeout(winTimeoutId);
      winTimeoutId = null;
    }
    firstCard = null;
    secondCard = null;
    isLocked = false;
    moves = 0;
    matches = 0;
    statusPanel.reset();
    board.unlock();
    board.render();
  };

  const showWinModal = (finalMoves) => {
    saveScore({ moves: finalMoves });

    const text = createElement('p', {
      className: 'win-modal__text',
      text: 'Congratulations! You have restored all 8 ancient artifacts!',
    });

    const label = createElement('span', {
      className: 'win-modal__label',
      text: 'TOTAL MOVES:',
    });

    const value = createElement('span', {
      className: 'win-modal__value',
      text: String(finalMoves),
    });

    const scorePlaque = createElement('div', {
      className: 'win-modal__score',
      children: [label, value],
    });

    const content = createElement('div', {
      className: 'win-modal__content',
      children: [text, scorePlaque],
    });

    const modal = createModal({
      title: 'VICTORY!',
      content,
      buttons: [
        {
          text: 'PLAY AGAIN',
          className: 'btn--new-game',
          onClick: (_, { close }) => {
            close();
            resetGame();
          },
        },
        {
          text: 'CLOSE',
          className: 'btn--leaderboard',
          onClick: (_, { close }) => {
            close();
          },
        },
      ],
    });

    modal.open();
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

      if (matches === TOTAL_PAIRS) {
        winTimeoutId = setTimeout(() => {
          showWinModal(moves);
          winTimeoutId = null;
        }, 500);
      }
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
    onLeaderboard: () => {
      showLeaderboardModal();
    },
  });

  const statusPanel = createStatusPanel({ totalPairs: TOTAL_PAIRS });

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
