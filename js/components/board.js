import { createElement, clearElement } from '../utils/dom.js';
import { shuffle } from '../utils/shuffle.js';
import { createCard } from './card.js';

export const createBoard = ({ items = [], onCardClick } = {}) => {
  let cards = [];

  const element = createElement('div', {
    className: 'board',
    attributes: { 'aria-label': 'Card grid 4 by 4' },
  });

  const render = () => {
    clearElement(element);
    cards = [];

    const pairs = [...items, ...items];
    const shuffledPairs = shuffle(pairs);

    shuffledPairs.forEach((item, index) => {
      const card = createCard({
        id: index,
        key: item.key,
        name: item.name,
        image: item.image,
        onCardClick,
      });
      cards.push(card);
      element.appendChild(card.element);
    });
  };

  const getCards = () => cards;

  const lock = () => {
    element.classList.add('is-locked');
  };

  const unlock = () => {
    element.classList.remove('is-locked');
  };

  const reset = () => {
    cards.forEach((card) => card.reset());
    unlock();
  };

  render();

  return {
    element,
    render,
    getCards,
    lock,
    unlock,
    reset,
  };
};
