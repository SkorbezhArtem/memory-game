import { createElement } from '../utils/dom.js';

export const createCard = ({ id, key, name, image, onCardClick } = {}) => {
  const itemKey = key || String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const frontImg = createElement('img', {
    className: ['card__img', 'card__img--front'],
    attributes: {
      src: image,
      alt: name || 'Item',
      draggable: 'false',
    },
  });

  const slot = createElement('div', {
    className: 'card__slot',
    children: [frontImg],
  });

  const nameBadge = createElement('div', {
    className: 'card__name',
    text: name,
  });

  const frontFace = createElement('div', {
    className: ['card__face', 'card__face--front'],
    children: [slot, nameBadge],
  });

  const backImg = createElement('img', {
    className: 'card__img',
    attributes: {
      src: './assets/card-back.jpg',
      alt: 'Card Back',
      draggable: 'false',
    },
  });

  const backFace = createElement('div', {
    className: ['card__face', 'card__face--back'],
    children: [backImg],
  });

  const inner = createElement('div', {
    className: 'card__inner',
    children: [frontFace, backFace],
  });

  const card = {
    id,
    key: itemKey,
    name,
    image,
    element: null,
  };

  const handleAction = () => {
    if (card.isMatched() || card.isFlipped()) return;
    onCardClick?.(card);
  };

  const element = createElement('div', {
    className: 'card',
    dataset: {
      id: String(id),
      key: itemKey,
      name: String(name),
    },
    attributes: {
      role: 'button',
      tabindex: '0',
      'aria-label': 'Card: face down',
    },
    events: {
      click: handleAction,
      keydown: (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleAction();
        }
      },
    },
    children: [inner],
  });

  card.element = element;

  card.flip = () => {
    element.classList.add('is-flipped');
    element.setAttribute('aria-label', name ? ('Card: ' + name) : 'Card: face up');
  };

  card.unflip = () => {
    element.classList.remove('is-flipped');
    element.setAttribute('aria-label', 'Card: face down');
  };

  card.match = () => {
    element.classList.add('is-matched');
    element.setAttribute('aria-label', name ? ('Matched card: ' + name) : 'Matched pair');
  };

  card.isFlipped = () => element.classList.contains('is-flipped');
  card.isMatched = () => element.classList.contains('is-matched');

  card.reset = () => {
    element.classList.remove('is-flipped', 'is-matched');
    element.setAttribute('aria-label', 'Card: face down');
  };

  return card;
};
