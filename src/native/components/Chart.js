import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';

import { AreaChart, YAxis } from 'react-native-svg-charts'
import { LinearGradient, Stop, G, Line } from 'react-native-svg'
import * as shape from 'd3-shape'

const data = [ 500, 100, 400, 950, 50, 850, 910, 350, 530, 40, 240, 500, 900, 1500, 400, 950, 50, 850, 910, 350, 530, 40, 240, 500, 930, 1400, 2320, 4100, 6730, 3750, 4500 ];
const contentInset = { top: 20, bottom: 20 };

const CustomGrid = ({ x, y, dataPoints, ticks }) => (
  <G>
    {
      [ 50, 3200, 6730 ].map(tick => (
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

const Chart = ({ size }) => (
  <View style={{ height: 170, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, position: 'relative' }}>
    <YAxis
      style={{ position: 'absolute', top: 0, bottom: 0, left: 5 }}
      dataPoints={data}
      numberOfTicks={3}
      contentInset={contentInset}
      labelStyle={{ color: '#8D8A96' }}
      formatLabel={value => `${value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}
    />
    <AreaChart
      style={{ flex: 1 }}
      dataPoints={data}
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
);

Chart.propTypes = {
  size: PropTypes.number,
};

Chart.defaultProps = {
  size: 170,
};

export default Chart;
