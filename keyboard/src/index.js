import './styles/index.scss';
import rows from './scripts/keyboard-rows';
import createElementFromString from './scripts/create-element-from-string';
import compose from './scripts/compose';

const CAPS_LOCK = 'CapsLock';
const SHIFT_LEFT = 'ShiftLeft';
const SHIFT_RIGHT = 'ShiftRight';

class Keyboard {
  constructor(keyboardRows) {
    this.root = document.querySelector('#root');
    this.keyboardRows = keyboardRows;
    this.keyboardRowsFlat = keyboardRows.flat();
    this.letterKeys = this.keyboardRowsFlat.filter(({ isLetter }) => isLetter);
    this.nonLetterKeys = this.keyboardRowsFlat.filter(({ isLetter }) => !isLetter);
    this.keyElements = {};
    this.lang = localStorage.getItem('keyboard-lang') || 'en';
    this.textarea = null;
    this.capsLock = false;
  }

  init() {
    this.renderHeader();
    this.renderMain();
    this.activateKeyboardHandlers();
  }

  renderHeader() {
    const header = createElementFromString(`
      <header>
        <div class="wrapper">
          <h1 class="site-heading">Rolling scope VIRTUAL KEYBOARD</h1>
        </div>
      </header>
    `);

    this.root.append(header);
  }

  renderMain() {
    const main = document.createElement('main');
    const wrapper = createElementFromString('<div class="wrapper"></div>');
    this.textarea = Keyboard.getTextAreaElement();
    wrapper.append(this.textarea);
    wrapper.append(this.getKeyboardElement());
    wrapper.append(Keyboard.getKeyboardTipElement());
    main.append(wrapper);

    this.root.append(main);
  }

  getKeyboardElement() {
    const keyboard = createElementFromString('<div class="keyboard"></div>');
    const keyboardContainer = createElementFromString('<div class="keys-container"></div>');

    this.keyboardRows.forEach((row) => {
      const rowElement = createElementFromString('<div class="row"></div>');
      Object.values(row).forEach((key) => {
        const keyElement = createElementFromString(`
          <button class="key" tabindex="-1" id=${key.code}></button>
        `);
        keyElement.innerHTML = key.main[this.lang];

        if (key.className) {
          keyElement.classList.add(key.className);
        }

        this.keyElements[key.code] = keyElement;
        rowElement.append(keyElement);
      });
      keyboardContainer.append(rowElement);
    });

    keyboard.append(keyboardContainer);

    return keyboard;
  }

  handleKeyboardHighlight(evt, method) {
    const element = this.keyElements[evt.code];

    if (element && evt.code !== CAPS_LOCK) {
      element.classList[method]('key--active');
    }
  }

  activateKeyboardHandlers() {
    const handleHighlightKeydown = (evt) => {
      this.handleKeyboardHighlight(evt, 'add');
    };

    const handleCapsLockKeydown = (evt) => {
      if (evt.code === CAPS_LOCK) {
        this.capsLock = evt.getModifierState(CAPS_LOCK);
        this.handleCapsLock();
      }
    };

    const handleShiftKeydown = (evt) => {
      if (evt.code === SHIFT_LEFT || evt.code === SHIFT_RIGHT) {
        this.handleShift('shift');
      }
    };

    const handleHighlightKeyup = (evt) => {
      this.handleKeyboardHighlight(evt, 'remove');
    };

    const handleShiftUp = (evt) => {
      if (evt.code === SHIFT_LEFT || evt.code === SHIFT_RIGHT) {
        this.handleShift('main');
      }
    };

    const keydownHandlers = [
      handleHighlightKeydown,
      handleCapsLockKeydown,
      handleShiftKeydown,
    ];

    const keyupHandlers = [
      handleHighlightKeyup,
      handleShiftUp,
    ];

    window.addEventListener('keydown', compose(keydownHandlers));

    window.addEventListener('keyup', compose(keyupHandlers));
  }

  handleCapsLock() {
    if (this.capsLock) {
      this.keyElements[CAPS_LOCK].classList.add('key--caps-active');
      this.letterKeys.forEach(({ code, shift }) => {
        this.keyElements[code].innerHTML = shift[this.lang];
      });
    } else {
      this.keyElements[CAPS_LOCK].classList.remove('key--caps-active');
      this.letterKeys.forEach(({ code, main }) => {
        this.keyElements[code].innerHTML = main[this.lang];
      });
    }
  }

  handleShift(mode) {
    this.updateKeySymbols(this.nonLetterKeys, mode);

    if (!this.capsLock) {
      this.updateKeySymbols(this.letterKeys, mode);
    }
  }

  updateKeySymbols(arr, mode) {
    arr.forEach((key) => {
      this.keyElements[key.code].innerHTML = key[mode][this.lang];
    });
  }

  static getKeyboardTipElement() {
    return createElementFromString(`
      <div class="keyboard-tip">
        <p>Keyboard was made for Mac OS System</p>
        <p>Input language shorthand: <code>'opt' + 'space'</code> </p>
      </div>
    `);
  }

  static getTextAreaElement() {
    return createElementFromString(`
      <div class="site-textarea">
        <textarea name="text" id="text" cols="30" rows="10"></textarea>
      </div>
    `);
  }
}

new Keyboard(rows).init();
