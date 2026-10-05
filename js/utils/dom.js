export const createElement = (tag, options = {}) => {
  const element = document.createElement(tag);

  if (options.className) {
    const classes = []
      .concat(options.className)
      .filter(Boolean)
      .flatMap((c) => String(c).split(/\s+/))
      .filter(Boolean);
    if (classes.length) {
      element.classList.add(...classes);
    }
  }

  if (options.text !== undefined && options.text !== null) {
    element.textContent = String(options.text);
  }

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      if (value === undefined || value === null || value === false) return;
      element.setAttribute(key, value === true ? '' : String(value));
    });
  }

  if (options.dataset) {
    Object.assign(element.dataset, options.dataset);
  }

  if (options.events) {
    Object.entries(options.events).forEach(([event, handler]) => {
      if (typeof handler === 'function') {
        element.addEventListener(event, handler);
      }
    });
  }

  if (options.children) {
    const children = Array.isArray(options.children) ? options.children : [options.children];
    element.append(...children.filter((child) => child != null && child !== false));
  }

  return element;
};

export const clearElement = (element) => {
  element?.replaceChildren();
};
