import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'react-native-svg-icon';
import svgs from './assets/svgs';

const Icon = (props) => <SvgIcon {...props} svgs={svgs} />;

Icon.propTypes = {
  color: PropTypes.string,
};

Icon.defaultProps = {
  color: '#fff',
};

export default Icon;
