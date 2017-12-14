import { arrayOf, bool, func, shape, string } from 'prop-types';
import { LinearGradient } from 'expo';
import React from 'react';
import { View } from 'react-native';
import { C, SHAPE, STYLE, THEME } from '../../../config';
import Chart from './Chart';
import ChipPrice from './ChipPrice';
import Price from './Price';
import TimelineOption from './TimelineOption';
import styles from './CurrencyContent.style';

const { CURRENCY, HISTORY } = SHAPE;

const CurrencyContent = (props) => {
  const {
    currency: { symbol, usd },
    history,
    onChange,
    refreshing,
    timeline,
  } = props;

  let high = 0;
  let low = 0;
  if (history.length > 0) {
    high = Math.max.apply(null, history.map(({ value }) => value));
    low = Math.min.apply(null, history.map(({ value }) => value));
  }

  return (
    <LinearGradient colors={[THEME.PRIMARY, THEME.PRIMARY, THEME.ACCENT]} style={[STYLE.LAYOUT_MAIN, styles.container]}>
      <View style={styles.prices}>
        { !refreshing && <ChipPrice caption="high" value={high} /> }
        <Price symbol={symbol} value={usd} />
        { !refreshing && <ChipPrice caption="low" value={low} /> }
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

CurrencyContent.propTypes = {
  currency: shape(CURRENCY),
  history: arrayOf(shape(HISTORY)),
  onChange: func,
  refreshing: bool,
  timeline: string,
};

CurrencyContent.defaultProps = {
  currency: {},
  history: [],
  onChange: undefined,
  refreshing: false,
  timeline: undefined,
};

export default CurrencyContent;