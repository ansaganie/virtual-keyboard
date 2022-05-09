import './styles/index.scss';
import { KEYBOARD_ROWS, CONTROL_KEYS } from './scripts/keyboard-rows';
import createElementFromString from './scripts/create-element-from-string';
import compose from './scripts/compose';

const CAPS_LOCK = 'CapsLock';
const SHIFT_LEFT = 'ShiftLeft';
const SHIFT_RIGHT = 'ShiftRight';
const TAB = 'Tab';
class Keyboard {
  constructor(keyboardRows, rootElement) {
    this.keyboardRows = keyboardRows;
    this.keyboardRowsFlat = keyboardRows.flat();
    this.letterKeys = this.keyboardRowsFlat.filter(({ isLetter }) => isLetter);
    this.nonLetterKeys = this.keyboardRowsFlat.filter(({ isLetter }) => !isLetter);

    this.lang = localStorage.getItem('keyboard-lang') || 'en';
    this.capsLock = false;

    this.root = rootElement;
    this.keyElements = {};
    this.textarea = null;
    this.keyboardContainer = null;
  }

  init() {
    this.renderHeader();
    this.renderMain();
    this.textarea = document.querySelector('#text');
    this.keyboardContainer = document.querySelector('#keyboard-container');
    this.activatePhysicalKeyboardHandlers();
    this.activateVirtualKeyboardHandlers();
  }

  handleKeyboardHighlight(code, method) {
    const element = this.keyElements[code];

    if (element && code !== CAPS_LOCK) {
      element.classList[method]('key--active');
    }
  }

  activatePhysicalKeyboardHandlers() {
    const handleHighlightKeydown = (evt) => {
      this.handleKeyboardHighlight(evt.code, 'add');
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

    const handleTabKeydown = (evt) => {
      if (evt.code === TAB) {
        evt.preventDefault();

        if (document.activeElement === this.textarea) {
          this.printText(evt.code, '\t');
        }
      }
    };

    const handleHighlightKeyup = (evt) => {
      this.handleKeyboardHighlight(evt.code, 'remove');
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
      handleTabKeydown,
    ];

    const keyupHandlers = [
      handleHighlightKeyup,
      handleShiftUp,
    ];

    window.addEventListener('keydown', compose(keydownHandlers));
    window.addEventListener('keyup', compose(keyupHandlers));
  }

  activateVirtualKeyboardHandlers() {
    const handleHighlightMousedown = (evt) => {
      this.handleKeyboardHighlight(evt.target.id, 'add');
    };

    const handleShiftMousedown = (evt) => {
      const code = evt.target.id;

      if (code === SHIFT_LEFT || code === SHIFT_RIGHT) {
        this.handleShift('shift');
      }
    };

    const handleCapsLockClick = (evt) => {
      if (evt.target.id === CAPS_LOCK) {
        this.capsLock = !this.capsLock;
        this.handleCapsLock();
      }
    };

    const handleTextPrintClick = (evt) => {
      const code = evt.target.id;
      const canPrintText = code && code !== 'keyboard-container' && !CONTROL_KEYS.has(code);

      if (canPrintText) {
        this.printText(code, evt.target.textContent);
      }
    };

    const handleArrowKeysClick = (evt) => {
      const code = evt.target.id;

      if (code.startsWith('Arrow')) {
        this.changeCursorPosition(code);
      }
    };

    const handleHighlightMouseup = (evt) => {
      this.handleKeyboardHighlight(evt.target.id, 'remove');
    };

    const handleShiftMouseup = (evt) => {
      const code = evt.target.id;

      if (code === SHIFT_LEFT || code === SHIFT_RIGHT) {
        this.handleShift('main');
      }
    };

    this.keyboardContainer.addEventListener('click', compose([
      handleCapsLockClick,
      handleTextPrintClick,
      handleArrowKeysClick,
    ]));
    this.keyboardContainer.addEventListener('mousedown', compose([
      handleHighlightMousedown,
      handleShiftMousedown,
    ]));
    this.keyboardContainer.addEventListener('mouseup', compose([
      handleHighlightMouseup,
      handleShiftMouseup,
    ]));
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

  printText(code, letter) {
    let cursorStart = this.textarea.selectionStart;
    const cursorEnd = this.textarea.selectionEnd;

    const firstPart = this.textarea.value.slice(0, cursorStart);
    const secondPart = this.textarea.value.slice(cursorEnd);

    switch (code) {
      case 'Tab':
        this.textarea.value = `${firstPart}\t${secondPart}`;
        cursorStart += 1;

        break;

      case 'Space':
        this.textarea.value = `${firstPart} ${secondPart}`;
        cursorStart += 1;

        break;

      case 'Backspace':
        this.textarea.value = firstPart.slice(0, -1) + secondPart;
        cursorStart += 1;

        break;

      case 'Delete':
        this.textarea.value = firstPart + secondPart.slice(1);
        break;

      case 'Enter':
        this.textarea.value = `${firstPart}\n${secondPart}`;
        cursorStart += 1;

        break;
      default:
        this.textarea.value = `${firstPart}${letter}${secondPart}`;
        cursorStart += 1;
    }

    this.textarea.focus();
    this.textarea.setSelectionRange(cursorStart, cursorStart);
  }

  changeCursorPosition(code) {
    let cursorStart = this.textarea.selectionStart;

    const firstPart = this.textarea.value.slice(0, cursorStart);
    const secondPart = this.textarea.value.slice(cursorStart);

    switch (code) {
      case 'ArrowLeft':
        cursorStart = cursorStart - 1 >= 0 ? cursorStart - 1 : 0;
        break;

      case 'ArrowRight':
        cursorStart += 1;
        break;

      case 'ArrowUp': {
        const upperLines = firstPart.split('\n');

        if (upperLines.length > 1) {
          const upperLineLength = upperLines[upperLines.length - 2].length;
          const currentLinePosition = upperLines[upperLines.length - 1].length;

          if (upperLineLength < currentLinePosition) {
            cursorStart = upperLines
              .slice(0, upperLines.length - 1)
              .reduce((acc, val) => acc + val.length + 1, 0) - 1;
          } else {
            const upperLinesLength = upperLines
              .slice(0, upperLines.length - 2)
              .reduce((acc, val) => acc + val.length + 1, 0);
            cursorStart = upperLinesLength + currentLinePosition;
          }
        }

        break;
      }

      case 'ArrowDown': {
        const belowLines = secondPart.split('\n');

        if (belowLines.length > 1) {
          const upperLines = firstPart.split('\n');
          const currentLineIndex = upperLines.length - 1;
          const currentLinePosition = upperLines[currentLineIndex].length;
          const belowLineLength = belowLines[1].length;
          const allLines = this.textarea.value.split('\n');

          if (belowLineLength < currentLinePosition) {
            cursorStart = allLines.slice(0, upperLines.length + 1)
              .reduce((acc, val) => acc + val.length + 1, 0) - 1;
          } else {
            const upperLinesLength = allLines.slice(0, currentLineIndex + 1)
              .reduce((acc, val) => acc + val.length + 1, 0);

            cursorStart = upperLinesLength + currentLinePosition;
          }
        }

        break;
      }

      default:
        break;
    }

    this.textarea.focus();
    this.textarea.setSelectionRange(cursorStart, cursorStart);
  }

  getKeyboardElement() {
    const keyboard = createElementFromString('<div class="keyboard"></div>');
    const keyboardContainer = createElementFromString('<div class="keys-container" id="keyboard-container"></div>');

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
    this.textarea = Keyboard.getTextAreaElement().querySelector('textarea');
    wrapper.append(Keyboard.getTextAreaElement());
    wrapper.append(this.getKeyboardElement());
    wrapper.append(Keyboard.getKeyboardTipElement());
    main.append(wrapper);

    this.root.append(main);
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

new Keyboard(KEYBOARD_ROWS, document.querySelector('#root')).init();
