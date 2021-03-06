export const CONTROL_KEYS = new Set([
  'CapsLock',
  'ShiftLeft',
  'ShiftRight',
  'ControlLeft',
  'AltLeft',
  'OSLeft',
  'OSRight',
  'MetaLeft',
  'MetaRight',
  'AltRight',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
]);

export const getKeyboardLayout = (lang = 'en') => [
  [
    {
      code: 'IntlBackslash',
      main: {
        en: '§',
        ru: '>',
      },
      shift: { en: '±', ru: '<' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Digit1',
      main: { en: '1', ru: '1' },
      shift: { en: '!', ru: '!' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Digit2',
      main: { en: '2', ru: '2' },
      shift: { en: '@', ru: '"' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Digit3',
      main: { en: '3', ru: '3' },
      shift: { en: '#', ru: '№' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Digit4',
      main: { en: '4', ru: '4' },
      shift: { en: '$', ru: '%' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Digit5',
      main: { en: '5', ru: '5' },
      shift: { en: '%', ru: ':' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Digit6',
      main: { en: '6', ru: '6' },
      shift: { en: '^', ru: ',' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Digit7',
      main: { en: '7', ru: '7' },
      shift: { en: '&', ru: '.' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Digit8',
      main: { en: '8', ru: '8' },
      shift: { en: '*', ru: ';' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Digit9',
      main: { en: '9', ru: '9' },
      shift: { en: '(', ru: '(' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Digit0',
      main: { en: '0', ru: '0' },
      shift: { en: ')', ru: ')' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Minus',
      main: { en: '-', ru: '-' },
      shift: { en: '_', ru: '_' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Equal',
      main: { en: '=', ru: '=' },
      shift: { en: '+', ru: '+' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Backspace',
      main: { en: 'Backspace', ru: 'Backspace' },
      shift: { en: 'Backspace', ru: 'Backspace' },
      isLetter: false,
      className: 'two-place',
    },
  ],
  [
    {
      code: 'Tab',
      main: { en: 'Tab', ru: 'Tab' },
      shift: { en: 'Tab', ru: 'Tab' },
      isLetter: false,
      className: 'shift-key',
    },
    {
      code: 'KeyQ',
      main: { en: 'q', ru: 'й' },
      shift: { en: 'Q', ru: 'Й' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyW',
      main: { en: 'w', ru: 'ц' },
      shift: { en: 'W', ru: 'Ц' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyE',
      main: { en: 'e', ru: 'у' },
      shift: { en: 'E', ru: 'У' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyR',
      main: { en: 'r', ru: 'к' },
      shift: { en: 'R', ru: 'К' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyT',
      main: { en: 't', ru: 'е' },
      shift: { en: 'T', ru: 'Е' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyY',
      main: { en: 'y', ru: 'н' },
      shift: { en: 'Y', ru: 'Н' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyU',
      main: { en: 'u', ru: 'г' },
      shift: { en: 'U', ru: 'Г' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyI',
      main: { en: 'i', ru: 'ш' },
      shift: { en: 'I', ru: 'Ш' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyO',
      main: { en: 'o', ru: 'щ' },
      shift: { en: 'O', ru: 'Щ' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyP',
      main: { en: 'p', ru: 'з' },
      shift: { en: 'P', ru: 'З' },
      isLetter: true,
      className: '',
    },
    {
      code: 'BracketLeft',
      main: { en: '[', ru: 'х' },
      shift: { en: '{', ru: 'Х' },
      isLetter: lang === 'ru',
      className: '',
    },
    {
      code: 'BracketRight',
      main: { en: ']', ru: 'ъ' },
      shift: { en: '}', ru: 'Ъ' },
      isLetter: lang === 'ru',
      className: '',
    },
    {
      code: 'Backslash',
      main: { en: '\\', ru: 'ё' },
      shift: { en: '|', ru: 'Ё' },
      isLetter: lang === 'ru',
      className: '',
    },
    {
      code: 'Delete',
      main: { en: 'Del', ru: 'Del' },
      shift: { en: 'Del', ru: 'Del' },
      isLetter: false,
      className: 'shift-key',
    },
  ],
  [
    {
      code: 'CapsLock',
      main: { en: 'CapsLock', ru: 'CapsLock' },
      shift: { en: 'CapsLock', ru: 'CapsLock' },
      isLetter: false,
      className: 'two-place',
    },
    {
      code: 'KeyA',
      main: { en: 'a', ru: 'ф' },
      shift: { en: 'A', ru: 'Ф' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyS',
      main: { en: 's', ru: 'ы' },
      shift: { en: 'S', ru: 'Ы' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyD',
      main: { en: 'd', ru: 'в' },
      shift: { en: 'D', ru: 'В' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyF',
      main: { en: 'f', ru: 'а' },
      shift: { en: 'F', ru: 'А' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyG',
      main: { en: 'g', ru: 'п' },
      shift: { en: 'G', ru: 'П' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyH',
      main: { en: 'h', ru: 'р' },
      shift: { en: 'H', ru: 'Р' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyJ',
      main: { en: 'j', ru: 'о' },
      shift: { en: 'J', ru: 'О' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyK',
      main: { en: 'k', ru: 'л' },
      shift: { en: 'K', ru: 'Л' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyL',
      main: { en: 'l', ru: 'д' },
      shift: { en: 'L', ru: 'Д' },
      isLetter: true,
      className: '',
    },
    {
      code: 'Semicolon',
      main: { en: ';', ru: 'ж' },
      shift: { en: ':', ru: 'Ж' },
      isLetter: lang === 'ru',
      className: '',
    },
    {
      code: 'Quote',
      main: { en: '\'', ru: 'э' },
      shift: { en: '"', ru: 'Э' },
      isLetter: lang === 'ru',
      className: '',
    },
    {
      code: 'Enter',
      main: { en: 'Enter', ru: 'Enter' },
      shift: { en: 'Enter', ru: 'Enter' },
      isLetter: false,
      className: 'two-place',
    },
  ],
  [
    {
      code: 'ShiftLeft',
      main: { en: 'Shift', ru: 'Shift' },
      shift: { en: 'Shift', ru: 'Shift' },
      isLetter: false,
      className: 'shift-key',
    },
    {
      code: 'Backquote',
      main: { en: '`', ru: ']' },
      shift: { en: '~', ru: '[' },
      isLetter: false,
      className: '',
    },
    {
      code: 'KeyZ',
      main: { en: 'z', ru: 'я' },
      shift: { en: 'Z', ru: 'Я' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyX',
      main: { en: 'x', ru: 'ч' },
      shift: { en: 'X', ru: 'Ч' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyC',
      main: { en: 'c', ru: 'с' },
      shift: { en: 'C', ru: 'С' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyV',
      main: { en: 'v', ru: 'м' },
      shift: { en: 'V', ru: 'М' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyB',
      main: { en: 'b', ru: 'и' },
      shift: { en: 'B', ru: 'И' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyN',
      main: { en: 'n', ru: 'т' },
      shift: { en: 'N', ru: 'Т' },
      isLetter: true,
      className: '',
    },
    {
      code: 'KeyM',
      main: { en: 'm', ru: 'ь' },
      shift: { en: 'M', ru: 'Ь' },
      isLetter: true,
      className: '',
    },
    {
      code: 'Comma',
      main: { en: ',', ru: 'б' },
      shift: { en: '<', ru: 'Б' },
      isLetter: lang === 'ru',
      className: '',
    },
    {
      code: 'Period',
      main: { en: '.', ru: 'ю' },
      shift: { en: '>', ru: 'Ю' },
      isLetter: lang === 'ru',
      className: '',
    },
    {
      code: 'Slash',
      main: { en: '/', ru: '/' },
      shift: { en: '?', ru: '?' },
      isLetter: false,
      className: '',
    },
    {
      code: 'ArrowUp',
      main: { en: '&uarr;', ru: '&uarr;' },
      shift: { en: '&uarr;', ru: '&uarr;' },
      isLetter: false,
      className: 'arrow-key',
    },
    {
      code: 'ShiftRight',
      main: { en: 'Shift', ru: 'Shift' },
      shift: { en: 'Shift', ru: 'Shift' },
      isLetter: false,
      className: 'shift-key',
    },
  ],
  [
    {
      code: 'ControlLeft',
      main: { en: 'Control', ru: 'Control' },
      shift: { en: 'Control', ru: 'Control' },
      isLetter: false,
      className: '',
    },
    {
      code: 'AltLeft',
      main: { en: 'Opt', ru: 'Opt' },
      shift: { en: 'Opt', ru: 'Opt' },
      isLetter: false,
      className: '',
    },
    {
      code: 'MetaLeft',
      main: { en: 'Cmd', ru: 'Cmd' },
      shift: { en: 'Cmd', ru: 'Cmd' },
      isLetter: false,
      className: '',
    },
    {
      code: 'Space',
      main: { en: 'Space', ru: 'Space' },
      shift: { en: 'Space', ru: 'Space' },
      isLetter: false,
      className: 'five-place',
    },
    {
      code: 'MetaRight',
      main: { en: 'Cmd', ru: 'Cmd' },
      shift: { en: 'Cmd', ru: 'Cmd' },
      isLetter: false,
      className: '',
    },
    {
      code: 'AltRight',
      main: { en: 'Opt', ru: 'Opt' },
      shift: { en: 'Opt', ru: 'Opt' },
      isLetter: false,
      className: '',
    },
    {
      code: 'ArrowLeft',
      main: { en: '&larr;', ru: '&larr;' },
      shift: { en: '&larr;', ru: '&larr;' },
      isLetter: false,
      className: 'arrow-key',
    },
    {
      code: 'ArrowDown',
      main: { en: '&darr;', ru: '&darr;' },
      shift: { en: '&darr;', ru: '&darr;' },
      isLetter: false,
      className: 'arrow-key',
    },
    {
      code: 'ArrowRight',
      main: { en: '&rarr;', ru: '&rarr;' },
      shift: { en: '&rarr;', ru: '&rarr;' },
      isLetter: false,
      className: 'arrow-key',
    },
  ],
];
