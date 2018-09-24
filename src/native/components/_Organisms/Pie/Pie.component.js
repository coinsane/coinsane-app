import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import { PieChart } from 'react-native-svg-charts';

import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import { Loading } from 'src/native/components/Base';
import { round } from '../../../../lib/utils';

import { colors } from '../../../styles';
import styles from './Pie.styles';

class Pie extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };

  render() {
    const {
      data,
      loading,
    } = this.props;

    const col = [
      colors.chart1,
      colors.chart2,
      colors.chart3,
      colors.chart4,
      colors.chart5,
    ];

    const pieData = data
      .map((item, index) => ({
        value: item.pct,
        svg: {
          fill: col[index],
          onPress: () => console.log('press', index),
        },
        key: `pie-${index}`,
      }));

    return (
      loading ?
        <Loading style={styles.loading} size={25} /> :
        <View style={styles.container}>
          <PieChart
            style={styles.chart}
            outerRadius={70}
            innerRadius={60}
            data={pieData}
          />
          <View style={styles.legend}>
            {
              data.map((item, index) => (
                <View key={item.symbol} style={styles.legend__item}>
                  <CoinsaneIcon name="Legend" fill={col[index]} width={12} height={12} />
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="middle"
                    style={styles.legend__title}
                  >
                    {item.symbol} ({round(+item.pct, 2)}%)
                  </Text>
                </View>
              ))
            }
          </View>
        </View>
    );
  }
}

export default Pie;
