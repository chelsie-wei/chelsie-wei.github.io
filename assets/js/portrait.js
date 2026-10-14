// Mouse labels follow the pointer; touch and keyboard labels stay anchored.
(() => {
  document.querySelectorAll('.interactive-portrait').forEach(portrait => {
    const buttons = [...portrait.querySelectorAll('.portrait-hotspot')];

    const clear = () => {
      buttons.forEach(button => {
        button.setAttribute('aria-pressed', 'false');
      });
    };

    const reset = button => {
      button.classList.remove('tracking-pointer');

      const label = button.querySelector('.portrait-label');
      label.style.removeProperty('left');
      label.style.removeProperty('top');
    };

    const follow = (button, event) => {
      if (event.pointerType !== 'mouse') return;

      const label = button.querySelector('.portrait-label');
      const hotspot = button.getBoundingClientRect();
      const gap = 12;

      button.classList.add('tracking-pointer');

      label.style.left = `${event.clientX - hotspot.left + gap}px`;
      label.style.top = `${event.clientY - hotspot.top + gap}px`;
    };

    buttons.forEach(button => {
      button.addEventListener('pointerenter', event => {
        follow(button, event);
      });

      button.addEventListener('pointermove', event => {
        follow(button, event);
      });

      button.addEventListener('focus', () => {
        reset(button);
      });

      button.addEventListener('click', () => {
        const selected = button.getAttribute('aria-pressed') === 'true';

        clear();
        button.setAttribute('aria-pressed', String(!selected));
      });
    });

    document.addEventListener('click', event => {
      if (!portrait.contains(event.target)) {
        clear();
      }
    });

    portrait.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        clear();
        event.target.blur();
      }
    });
  });
})();

(() => {
  const name = document.getElementById('author-name');
  const label = name?.querySelector('.name-tooltip-label');

  if (!name || !label) return;

  const follow = event => {
    if (event.pointerType !== 'mouse') return;

    const bounds = name.getBoundingClientRect();

    label.style.left = `${event.clientX - bounds.left + 12}px`;
    label.style.top = `${event.clientY - bounds.top + 12}px`;
  };

  name.addEventListener('pointerenter', follow);
  name.addEventListener('pointermove', follow);

  // Keep the keyboard-focus label beneath your name.
  name.addEventListener('focus', () => {
    label.style.removeProperty('left');
    label.style.removeProperty('top');
  });
})();