import { createElement } from '../utils/dom.js';

export const createHeader = ({ onNewGame, onLeaderboard } = {}) => {
  const newGameBtn = createElement('button', {
    className: ['btn', 'btn--new-game'],
    attributes: {
      type: 'button',
      'aria-label': 'Start new game',
    },
    events: {
      click: (event) => onNewGame?.(event),
    },
    children: [
      createElement('img', {
        className: 'btn__icon',
        attributes: {
          src: './assets/icons/sword.svg',
          alt: '',
          'aria-hidden': 'true',
        },
      }),
      createElement('span', {
        className: 'btn__text',
        text: 'NEW GAME',
      }),
    ],
  });

  const leaderboardBtn = createElement('button', {
    className: ['btn', 'btn--leaderboard'],
    attributes: {
      type: 'button',
      'aria-label': 'View leaderboard',
    },
    events: {
      click: (event) => onLeaderboard?.(event),
    },
    children: [
      createElement('img', {
        className: 'btn__icon',
        attributes: {
          src: './assets/icons/book.svg',
          alt: '',
          'aria-hidden': 'true',
        },
      }),
      createElement('span', {
        className: 'btn__text',
        text: 'LEADERBOARD',
      }),
    ],
  });

  const controls = createElement('div', {
    className: 'header__controls',
    children: [newGameBtn, leaderboardBtn],
  });

  const title = createElement('h1', {
    className: 'header__title',
    text: 'DOTA 2 MEMORY GAME',
  });

  const element = createElement('header', {
    className: 'header',
    children: [title, controls],
  });

  return {
    element,
    newGameBtn,
    leaderboardBtn,
  };
};
