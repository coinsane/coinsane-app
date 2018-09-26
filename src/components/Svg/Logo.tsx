import React from 'react';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient,
  Stop,
} from 'react-native-svg';

class Logo extends React.Component {
  render () {
    return (
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Defs>
          <LinearGradient x1="0%" y1="27.1620834%" x2="100%" y2="69.381654%" id="linearGradient-1">
            <Stop stopColor="#9A84FF" offset="0%" />
            <Stop stopColor="#575EF3" offset="100%" />
          </LinearGradient>
          <LinearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="linearGradient-2">
            <Stop stopColor="#FFFFFF" stopOpacity="0.35" offset="0%" />
            <Stop stopColor="#FFFFFF" stopOpacity="0.25" offset="100%" />
          </LinearGradient>
          <LinearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="linearGradient-3">
            <Stop stopColor="#FFFFFF" stopOpacity="0.7" offset="0%" />
            <Stop stopColor="#FFFFFF" stopOpacity="0.5" offset="100%" />
          </LinearGradient>
          <LinearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="linearGradient-4">
            <Stop stopColor="#FFFFFF" stopOpacity="0.95" offset="0%" />
            <Stop stopColor="#FFFFFF" stopOpacity="0.7" offset="100%" />
          </LinearGradient>
        </Defs>
        <G id="logo" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <Circle id="Oval" fill="url(#linearGradient-1)" cx="50" cy="50" r="50" />
          <Circle id="Oval-3" fill="url(#linearGradient-2)" cx="82.1428571" cy="50" r="17.8571429" />
          <Circle id="Oval-3" fill="url(#linearGradient-3)" cx="68.877551" cy="50" r="23.7244898" />
          <Circle id="Oval-3" fill="url(#linearGradient-4)" cx="50" cy="50" r="30.8673469" />
        </G>
      </Svg>
    );
  }
}

export default Logo;
