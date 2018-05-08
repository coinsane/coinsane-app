import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';
import { LinearGradient, Stop, G, Line } from 'react-native-svg';
import * as shape from 'd3-shape';
import { AreaChart } from 'react-native-svg-charts';

import YAxis from './YAxis.component';

import CoinsaneAmount from '../../_Atoms/CoinsaneAmount/CoinsaneAmount.component';

import { colors } from '../../../styles';
import styles from './Chart.styles';

const contentInset = { top: 20, bottom: 20 };

function maxAvgMin(arr) {
  let max = arr[0];
  let min = arr[0];
  let sum = arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > max) {
      max = arr[i];
    }
    if (arr[i] < min) {
      min = arr[i];
    }
    sum += arr[i];
  }
  return [max, sum / arr.length, min];
}

const CustomGrid = ({ y, ticks }) => {
  if (ticks.length === 1) ticks.unshift(0);
  return (
    <G>
      {
        maxAvgMin(ticks).map(tick => (
          <Line
            key={tick}
            x1="0%"
            x2="100%"
            y1={y(tick)}
            y2={y(tick)}
            stroke={colors.blackBorder}
          />
        ))
      }
    </G>
  );
};

CustomGrid.propTypes = {
  y: PropTypes.func.isRequired,
  ticks: PropTypes.arrayOf(PropTypes.number).isRequired,
};


const formatLabel = value => <CoinsaneAmount value={value} currency="BTC" />;

const Chart = ({ dataPoints }) => {
  const dataArray = dataPoints && Object.keys(dataPoints).length ?
    Object.keys(dataPoints).map((time) => {
      if (typeof dataPoints[time] === 'number') return dataPoints[time];
      return dataPoints[time].avg;
    }) : [];
  const dataColor = dataArray[0] > dataArray[dataArray.length - 1] ?
    colors.primaryPink : colors.primaryGreen;

  return (
    <View style={styles.chartContainer}>
      <YAxis
        style={styles.axis}
        dataPoints={dataArray}
        numberOfTicks={3}
        contentInset={contentInset}
        labelStyle={{ color: colors.textGray }}
        formatLabel={formatLabel}
      />
      <AreaChart
        style={{ flex: 1 }}
        dataPoints={dataArray}
        svg={{ stroke: dataColor }}
        contentInset={contentInset}
        curve={shape.curveLinear}
        renderGradient={({ id }) => (
          <LinearGradient
            id={id}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <Stop
              offset="0%"
              stopColor={dataColor}
              stopOpacity={0.2}
            />
            <Stop
              offset="100%"
              stopColor={dataColor}
              stopOpacity={0}
            />
          </LinearGradient>
        )}
        renderGrid={CustomGrid}
      />
    </View>
  );
};

Chart.propTypes = {
  dataPoints: PropTypes.shape({}).isRequired,
};

export default Chart;
