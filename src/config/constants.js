import { bool, func, shape, string, number } from 'prop-types';

const add = require('../assets/icon-add.png');
const alert = require('../assets/icon-alert.png');
const menu = require('../assets/icon-menu.png');

export default {
  DEFAULT_FAVORITES: [{
    active: true,
    id: 1182,
    image: 'https://www.cryptocompare.com/media/19633/btc.png',
    name: 'Bitcoin',
    symbol: 'BTC',
    usd: 0,
  }, {
    id: 7605,
    image: 'https://www.cryptocompare.com/media/20646/eth.png',
    name: 'Ethereum',
    symbol: 'ETH',
    usd: 0,
  }, {
    id: 3808,
    image: 'https://www.cryptocompare.com/media/19782/litecoin-logo.png',
    name: 'Litecoin',
    symbol: 'LTC',
    usd: 0,
  }],

  FEEDBACK: {
    MAIL: 'hello@soyjavi.com',
    SUBJECT: 'Feedback',
  },

  ICON: { add, alert, menu },

  SHAPE: {
    CURRENCY: shape({
      name: string,
      rank: number,
      symbol: string,
      usd: number,
      btc: number,
    }),
    FAVORITE: shape({
      active: bool,
      name: string,
      symbol: string,
      usd: number,
    }),
    NAVIGATION: shape({
      navigate: func,
    }),
    SNAPSHOT: shape({
      PRICE: number,
    }),
    HISTORY: shape({
      timestamp: number,
      value: number,
    }),
  },

  STORAGE: {
    CURRENCIES: 'cryptos',
    FAVORITES: 'favorites',
  },

  STORE_URL: {
    ANDROID: 'http://play.google.com/store/apps/details?id=com.google.android.apps.maps',
    IOS: 'http://soyjavi.com',
  },

  TIMELINES: ['1h', 'LAST 2 DAYS', 'LAST 3 MONTHS'],
};
