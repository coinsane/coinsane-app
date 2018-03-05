import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'react-native-svg-icon';
import svgs from '../assets/svgs';

import { colors } from '../../styles';

const Icon = (props) => <SvgIcon {...props} svgs={svgs} />;

Icon.propTypes = {
  fill: PropTypes.string,
};

Icon.defaultProps = {
  fill: colors.white,
};

export default Icon;
