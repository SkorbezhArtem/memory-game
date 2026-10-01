import { createElement } from '../utils/dom.js';

export const createStatusPanel = ({ totalPairs = 8 } = {}) => {
  const movesValue = createElement('span', {
    className: 'status-panel__value',
    text: '0',
    attributes: {
      'aria-live': 'polite',
      'aria-atomic': 'true',
    },
  });

  const matchesValue = createElement('span', {
    className: 'status-panel__value',
    text: '0 / ' + totalPairs,
    attributes: {
      'aria-live': 'polite',
      'aria-atomic': 'true',
    },
  });

  const movesItem = createElement('div', {
    className: 'status-panel__item',
    children: [
      createElement('span', {
        className: 'status-panel__label',
        text: 'MOVES:',
      }),
      movesValue,
    ],
  });

  const matchesItem = createElement('div', {
    className: 'status-panel__item',
    children: [
      createElement('span', {
        className: 'status-panel__label',
        text: 'MATCHES:',
      }),
      matchesValue,
    ],
  });

  const element = createElement('section', {
    className: 'status-panel',
    attributes: {
      'aria-label': 'Game statistics',
    },
    children: [movesItem, matchesItem],
  });

  const setMoves = (count) => {
    movesValue.textContent = String(count);
  };

  const setMatches = (count) => {
    matchesValue.textContent = count + ' / ' + totalPairs;
  };

  const reset = () => {
    setMoves(0);
    setMatches(0);
  };

  return {
    element,
    movesValue,
    matchesValue,
    setMoves,
    setMatches,
    reset,
  };
};
