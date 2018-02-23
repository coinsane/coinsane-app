import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';

import { AreaChart, YAxis } from 'react-native-svg-charts'
import { LinearGradient, Stop, G, Line } from 'react-native-svg'
import * as shape from 'd3-shape'

const contentInset = { top: 20, bottom: 20 };

function maxAvgMin(arr) {
    var max = arr[0];
    var min = arr[0];
    var sum = arr[0]; //changed from original post
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
        sum = sum + arr[i];
    }
    return [max, sum/arr.length, min]; //changed from original post
}

const CustomGrid = ({ x, y, dataPoints, ticks }) => (
  <G>
    {
      maxAvgMin(ticks).map(tick => (
        <Line
          key={tick}
          x1={'0%'}
          x2={'100%'}
          y1={y(tick)}
          y2={y(tick)}
          stroke={'#2F2A40'}
        />
      ))
    }
  </G>
)

const Chart = ({ dataPoints }) => {
  const dataArray = dataPoints && Object.keys(dataPoints).length ? Object.keys(dataPoints).map(time => {
    if (typeof dataPoints[time] === 'number') return dataPoints[time];
    return dataPoints[time].avg;
  }) : [];

  return (
    <View style={{ height: 170, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, position: 'relative' }}>
      <YAxis
        style={{ position: 'absolute', top: 0, bottom: 0, left: 5 }}
        dataPoints={dataArray}
        numberOfTicks={3}
        contentInset={contentInset}
        labelStyle={{ color: '#8D8A96' }}
        formatLabel={value => `${value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
      />
      <AreaChart
        style={{ flex: 1 }}
        dataPoints={dataArray}
        svg={{ stroke: '#31E981' }}
        contentInset={contentInset}
        curve={shape.curveLinear}
        renderGradient={({ id }) => (
          <LinearGradient id={id} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
            <Stop offset={'0%'} stopColor={'#31E981'} stopOpacity={0.2}/>
            <Stop offset={'100%'} stopColor={'#31E981'} stopOpacity={0}/>
          </LinearGradient>
        )}
        renderGrid={CustomGrid}
      />
    </View>
  )
};

Chart.propTypes = {
  dataPoints: PropTypes.shape({}),
};

Chart.defaultProps = {
  dataPoints: {}
};

export default Chart;
