import './styles/index.scss';
import rows from './scripts/keyboard-rows';
import createElementFromString from './scripts/create-element-from-string';

const CAPS_LOCK = 'CapsLock';

class Keyboard {
  constructor(keyboardRows) {
    this.root = document.querySelector('#root');
    this.keyboardRows = keyboardRows;
    this.keyElements = {};
    this.lang = localStorage.getItem('keyboard-lang') || 'en';
    this.textarea = null;
    this.capsLock = false;
  }

  init() {
    this.renderHeader();
    this.renderMain();
    this.activateKeyboardActiveState();
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
        const keyElement = createElementFromString('<button class="key" tabindex="-1"></button>');
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

  activateKeyboardActiveState() {
    const handleEvent = (evt, method) => {
      const element = this.keyElements[evt.code];

      if (evt.code === CAPS_LOCK) {
        if (evt.getModifierState(CAPS_LOCK)) {
          this.keyElements[CAPS_LOCK].classList.add('key--caps-active');
        } else {
          this.keyElements[CAPS_LOCK].classList.remove('key--caps-active');
        }
      } else if (element) {
        element.classList[method]('key--active');
      }
    };

    window.addEventListener('keydown', (evt) => {
      console.log(evt.code);
      handleEvent(evt, 'add');
    });

    window.addEventListener('keyup', (evt) => {
      handleEvent(evt, 'remove');
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
