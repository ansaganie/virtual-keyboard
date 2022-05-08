import './styles/index.scss';
import rows from './scripts/keyboard-rows';

const createElementFromString = (str) => {
  const element = document.createElement('div');
  element.insertAdjacentHTML('afterbegin', str.trim());

  return element.firstChild;
};

class Keyboard {
  constructor(keyboardRows) {
    this.root = document.querySelector('#root');
    this.keyboardRows = keyboardRows;
    this.lang = localStorage.getItem('keyboard-lang') || 'en';
  }

  init() {
    this.renderHeader();
    this.renderMain();
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
    wrapper.append(Keyboard.getTextAreaElement());
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
        const keyElement = createElementFromString('<button class="key"></button>');
        keyElement.innerHTML = key.main[this.lang];

        if (key.className) {
          keyElement.classList.add(key.className);
        }

        rowElement.append(keyElement);
      });
      keyboardContainer.append(rowElement);
    });

    keyboard.append(keyboardContainer);

    return keyboard;
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
