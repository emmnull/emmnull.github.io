import type { ValueOf } from 'type-fest';

/**
 * CSS Cursor names.
 */
export const CURSORS = {
  ADD: 'add',
  ALIAS: 'alias',
  AUTO: 'auto',
  CELL: 'cell',
  COPY: 'copy',
  CROSSHAIR: 'crosshair',
  DEFAULT: 'default',
  DRAG: 'drag',
  GRAB: 'grab',
  GRABBING: 'grabbing',
  HELP: 'help',
  MOVE: 'move',
  NONE: 'none',
  PROGRESS: 'progress',
  POINTER: 'pointer',
  TEXT: 'text',
  URL: 'URL',
  WAIT: 'wait',
  INITIAL: 'initial',
  INHERIT: 'inherit',
  COL_RESIZE: 'col-resize',
  CONTEXT_MENU: 'context-menu',
  E_RESIZE: 'e-resize',
  EW_RESIZE: 'ew-resize',
  N_RESIZE: 'n-resize',
  NE_RESIZE: 'ne-resize',
  NESW_RESIZE: 'nesw-resize',
  NS_RESIZE: 'ns-resize',
  NW_RESIZE: 'nw-resize',
  NWSE_RESIZE: 'nwse-resize',
  NO_DROP: 'no-drop',
  NOT_ALLOWED: 'not-allowed',
  ROW_RESIZE: 'row-resize',
  S_RESIZE: 's-resize',
  SE_RESIZE: 'se-resize',
  SW_RESIZE: 'sw-resize',
  VERTICAL_TEXT: 'vertical-text',
  W_RESIZE: 'w-resize',
  ZOOM_IN: 'zoom-in',
  ZOOM_OUT: 'zoom-out',
} as const;

export type Cursor = ValueOf<typeof CURSORS>;

export const KEYS_MODIFIER = {
  ALT: 'Alt',
  META: 'Meta',
  CONTROL: 'Control',
  SHIFT: 'Shift',
} as const;

export type KeyModifier = ValueOf<typeof KEYS_MODIFIER>;

export const KEYS_MISC = {
  UNDEFINED: 'Undefined',
  SPACE: ' ',
  ALT_GRAPH: 'AltGraph',
  CAPS_LOCK: 'CapsLock',
  FN: 'Fn',
  FN_LOCK: 'FnLock',
  HYPER: 'Hyper',
  NUM_LOCK: 'NumLock',
  SCROLL_LOCK: 'ScrollLock',
  SUPER: 'Super',
  SYMBOL: 'Symbol',
  SYMBOL_LOCK: 'SymbolLock',
  ENTER: 'Enter',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  END: 'End',
  HOME: 'Home',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
  BACKSPACE: 'Backspace',
  CLEAR: 'Clear',
  COPY: 'Copy',
  CR_SEL: 'CrSel',
  CUT: 'Cut',
  DELETE: 'Delete',
  ERASE_EOF: 'EraseEof',
  EX_SEL: 'ExSel',
  INSERT: 'Insert',
  PASTE: 'Paste',
  REDO: 'Redo',
  UNDO: 'Undo',
  CANCEL: 'Cancel',
  CONTEXT_MENU: 'ContextMenu',
  ESCAPE: 'Escape',
  EXECUTE: 'Execute',
  FIND: 'Find',
  HELP: 'Help',
  FINISH: 'Finish',
  PAUSE: 'Pause',
  PLAY: 'Play',
  SELECT: 'Select',
  ZOOM_IN: 'ZoomIn',
  ZOOM_OUT: 'ZoomOut',
} as const;

export type KeyMisc = ValueOf<typeof KEYS_MISC>;

export const KEYS_NUMERIC = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0': '0',
} as const;

export type KeyNumeric = ValueOf<typeof KEYS_NUMERIC>;

export const KEYS_ALPHABETICAL = {
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
  F: 'f',
  G: 'g',
  H: 'h',
  I: 'i',
  J: 'j',
  K: 'k',
  L: 'l',
  M: 'm',
  N: 'n',
  O: 'o',
  P: 'p',
  Q: 'q',
  R: 'r',
  S: 's',
  T: 't',
  U: 'u',
  V: 'v',
  W: 'w',
  X: 'x',
  Y: 'y',
  Z: 'z',
} as const;

export type KeyAlphabetical = ValueOf<typeof KEYS_ALPHABETICAL>;

export const KEYS = {
  ...KEYS_MODIFIER,
  ...KEYS_MISC,
  ...KEYS_ALPHABETICAL,
  ...KEYS_NUMERIC,
} as const;

export type Key = ValueOf<typeof KEYS>;
