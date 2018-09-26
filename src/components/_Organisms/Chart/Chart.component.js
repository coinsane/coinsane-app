import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { LinearGradient, Stop, G, Line, Defs } from 'react-native-svg';
import * as shape from 'd3-shape';
import { AreaChart } from 'react-native-svg-charts';

import YAxis from './YAxis.component';

import { Loading } from 'src/components/Base';
import { math } from 'src/services';

import { colors } from 'src/styles';
import styles from './Chart.styles';

class Chart extends Component {
  static propTypes = {
    data: PropTypes.shape({}).isRequired,
    currency: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };

  render() {
    const {
      data,
      loading,
      currency,
    } = this.props;

    const chartInset = {
      top: 2,
      bottom: 2,
      left: -1,
      right: -1,
    };

    const axisInset = {
      top: 8,
      bottom: 6,
      left: 0,
      right: 0,
    };

    const dataPoints = data && Object.keys(data).length ?
      Object.keys(data).map((time) => {
        if (typeof data[time] === 'number') return data[time];
        return data[time].avg;
      }) : [];

    const dataColor = dataPoints[0] > dataPoints[dataPoints.length - 1] ?
      colors.primaryPink : colors.primaryGreen;

    const CustomGrid = () => (
      <G>
        <Line x1="0%" x2="100%" y1={1} y2={1} stroke={colors.blackBorder} />
        <Line x1="0%" x2="100%" y1={66} y2={66} stroke={colors.blackBorder} />
        <Line x1="0%" x2="100%" y1={119} y2={119} stroke={colors.blackBorder} />
      </G>
    );

    const Gradient = ({ index }) => (
      <Defs key={index}>
        <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <Stop offset="0%" stopColor={dataColor} stopOpacity={0.3} />
          <Stop offset="100%" stopColor={dataColor} stopOpacity={0} />
        </LinearGradient>
      </Defs>
    );

    if (loading) return <Loading style={styles.loading} size={25} />;

    return (
      <View style={styles.container}>
        <YAxis
          style={styles.axis}
          data={dataPoints}
          contentInset={axisInset}
          svg={{
            fill: colors.textGray,
            fontSize: 10,
          }}
          formatLabel={value => math.nFormat(value, currency.decimal)}
        />
        <AreaChart
          // animate
          style={{ flex: 1 }}
          data={dataPoints}
          svg={{
            stroke: dataColor,
            fill: 'url(#gradient)',
          }}
          contentInset={chartInset}
          curve={shape.curveLinear}
        >
          <Gradient />
          <CustomGrid belowChart />
        </AreaChart>
      </View>
    );
  }
}

export default Chart;
