import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';

const Chart = ({ size }) => (
  <View style={{ flex: 1, height: size, borderColor: '#2F2A40', borderBottomWidth: 1, borderTopWidth: 1, marginBottom: 10 }} />
);

Chart.propTypes = {
  size: PropTypes.number,
};

Chart.defaultProps = {
  size: 170,
};

export default Chart;
