import { createElement } from '../utils/dom.js';

export const createModal = ({ title = '', content = null, buttons = [], onClose } = {}) => {
  let isOpen = false;

  const titleEl = createElement('h2', {
    className: 'modal__title',
    text: title,
    attributes: { id: 'modal-title' },
  });

  const closeBtn = createElement('button', {
    className: 'modal__close-btn',
    text: '×',
    attributes: {
      type: 'button',
      'aria-label': 'Close dialog',
    },
    events: {
      click: () => close(),
    },
  });

  const headerEl = createElement('div', {
    className: 'modal__header',
    children: [titleEl, closeBtn],
  });

  const contentChildren = Array.isArray(content) ? content : (content ? [content] : []);
  const bodyEl = createElement('div', {
    className: 'modal__body',
    children: contentChildren,
  });

  const actionButtons = buttons.map((btn) => {
    return createElement('button', {
      className: ['btn', btn.className || 'btn--new-game'],
      text: btn.text,
      events: {
        click: (e) => {
          btn.onClick?.(e, { close });
        },
      },
    });
  });

  const footerEl = createElement('div', {
    className: 'modal__footer',
    children: actionButtons,
  });

  const dialogEl = createElement('div', {
    className: 'modal__dialog',
    children: [headerEl, bodyEl, footerEl],
  });

  const handleBackdropClick = (e) => {
    if (e.target === backdropEl) {
      close();
    }
  };

  const handleKeydown = (e) => {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      close();
    }
  };

  const backdropEl = createElement('div', {
    className: 'modal-backdrop',
    attributes: {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'modal-title',
    },
    events: {
      click: handleBackdropClick,
    },
    children: [dialogEl],
  });

  const open = () => {
    if (isOpen) return;
    isOpen = true;
    document.body.appendChild(backdropEl);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeydown);
    requestAnimationFrame(() => {
      backdropEl.classList.add('is-open');
    });
  };

  const close = () => {
    if (!isOpen) return;
    isOpen = false;
    backdropEl.classList.remove('is-open');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeydown);
    onClose?.();
    setTimeout(() => {
      if (!isOpen && backdropEl.parentNode) {
        backdropEl.parentNode.removeChild(backdropEl);
      }
    }, 250);
  };

  const setContent = (newContent) => {
    bodyEl.replaceChildren(...(Array.isArray(newContent) ? newContent : [newContent]));
  };

  const setTitle = (newTitle) => {
    titleEl.textContent = newTitle;
  };

  return {
    element: backdropEl,
    open,
    close,
    isOpen: () => isOpen,
    setContent,
    setTitle,
  };
};
