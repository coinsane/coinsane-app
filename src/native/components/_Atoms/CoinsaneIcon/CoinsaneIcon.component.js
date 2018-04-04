import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from 'react-native-svg-icon';
import svgs from './svgs';

import { colors } from '../../../styles';

const CoinsaneIcon = (props) => <SvgIcon {...props} svgs={svgs} />;

CoinsaneIcon.propTypes = {
  fill: PropTypes.string,
};

CoinsaneIcon.defaultProps = {
  fill: colors.white,
};

export default CoinsaneIcon;
