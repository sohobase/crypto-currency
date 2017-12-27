const UNIT = 10;

const PRIMARY = '#852d91';
const PRIMARY_DARK = '#312a6c';
const ACCENT = '#ed1e79';

export default {
  // -- Transitions
  ANIMATION_DURATION: 400,
  ANIMATION_QUICK_DURATION: 225,
  ANIMATION_EASING: 'ease-in-out-sine',

  // -- Colors
  WHITE: '#ffffff',
  BLACK: '#000000',
  PRIMARY,
  PRIMARY_DARK,
  ACCENT,
  CONTRAST: 'rgba(255, 255, 255, 0.75)',
  COLOR_LOW: 'rgba(255,0,0,0.35)',
  COLOR_HIGH: 'rgba(0,255,0,0.35)',
  FONT_PRIMARY_COLOR: 'black',
  COLOR_SECONDARY: 'rgba(0, 0, 0, 0.5)',

  COLOR: {
    CHART: 'rgba(255, 255, 255, 0.35)',
    HIGH: '#5edeb3',
    LOW: '#F44336',
  },

  GRADIENT: [PRIMARY, PRIMARY_DARK],

  TRANSPARENT: 'transparent',
  BACKGROUND_HIGHLIGHT: 'rgba(255, 255, 255, 0.15)',
  BACKGROUND_DARK: 'rgba(0, 0, 0, 0.15)',
  BACKGROUND_DARK_HIGHLIGHT: 'rgba(0, 0, 0, 0.1)',
  MODAL_BACKDROP: 'rgba(0, 0, 0, 0.5)',

  // -- Fonts
  FONT: {
    SIZE: {
      SMALL: UNIT * 1.2,
      NORMAL: UNIT * 1.6,
      LARGE: UNIT * 2,
      EXTRA_LARGE: UNIT * 2.4,
    },
    WEIGHT: {
      LIGHT: '200',
      BOLD: '700',
    },
  },

  // -- Sizes
  UNIT,
  OFFSET: UNIT * 1.6,
  MAIN_LAYOUT_HEIGHT: '60%',
  SECOND_LAYOUT_HEIGHT: '40%',
};
