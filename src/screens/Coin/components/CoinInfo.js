import { arrayOf, bool, func, shape, string } from 'prop-types';
import { LinearGradient } from 'expo';
import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import { Amount } from '../../../components';
import Chart from './Chart';
import ChipPrice from './ChipPrice';
import TimelineOption from './TimelineOption';
import styles from './CoinInfo.style';

const { SYMBOL } = C;
const { COIN, HISTORY, SETTINGS } = SHAPE;

const CoinInfo = (props) => {
  const {
    coin: { price },
    history,
    onChange,
    refreshing,
    settings: { currency },
    timeline,
  } = props;

  let high = 0;
  let low = 0;
  if (history.length > 0) {
    high = Math.max.apply(null, history.map(({ value }) => value));
    low = Math.min.apply(null, history.map(({ value }) => value));
  }
  const symbol = SYMBOL[currency];

  return (
    <LinearGradient colors={[THEME.PRIMARY, THEME.PRIMARY, THEME.ACCENT]} style={[STYLE.LAYOUT_MAIN, styles.container]}>
      <View style={styles.prices}>
        { !refreshing && <ChipPrice caption="high" symbol={symbol} value={high} /> }
        <Amount value={price} style={styles.price} />
        { !refreshing && <ChipPrice caption="low" symbol={symbol} value={low} /> }
      </View>
      <View style={STYLE.ROW}>
        {
          C.TIMELINES.map((key) => {
            return (
              <TimelineOption
                key={key}
                caption={key}
                current={timeline}
                refreshing={refreshing}
                onPress={() => !refreshing && onChange(key)}
              />
            );
          })
        }
      </View>
      <Chart animate dataSource={history} style={styles.chart} />
    </LinearGradient>
  );
};

CoinInfo.propTypes = {
  coin: shape(COIN),
  history: arrayOf(shape(HISTORY)),
  onChange: func,
  refreshing: bool,
  settings: shape(SETTINGS),
  timeline: string,
};

CoinInfo.defaultProps = {
  coin: {},
  history: [],
  onChange: undefined,
  refreshing: false,
  settings: {},
  timeline: undefined,
};

const mapStateToProps = ({ settings }) => ({
  settings,
});

export default connect(mapStateToProps)(CoinInfo);