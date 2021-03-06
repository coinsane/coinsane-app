import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Svg, Text as SVGText } from 'react-native-svg';
import * as d3Scale from 'd3-scale';
import * as array from 'd3-array';

class YAxis extends PureComponent {
  state = {
    height: 0,
  };

  getY(domain) {
    const {
      scale,
      spacingInner,
      spacingOuter,
      contentInset: {
        top = 0,
        bottom = 0,
      },
    } = this.props;

    const { height } = this.state;

    const y = scale()
      .domain(domain)
      .range([height - bottom, top]);

    if (scale === d3Scale.scaleBand) {
      // use index as domain identifier instead of value since
      // same value can occur at several places in dataPoints
      y
      // set range top to bottom - we are not sorting on values in scaleBand
        .range([top, height - bottom])
        .paddingInner([spacingInner])
        .paddingOuter([spacingOuter]);

      // add half a bar to center label
      return value => y(value) + (y.bandwidth() / 2);
    }

    return y;
  }

  _onLayout(event) {
    const { nativeEvent: { layout: { height } } } = event;
    this.setState({ height });
  }

  render() {
    const {
      style,
      data,
      scale,
      yAccessor,
      formatLabel,
      min,
      max,
      svg,
      children,
    } = this.props;

    const { height } = this.state;

    if (data.length === 0) {
      return <View style={style} />;
    }

    const values = data.map((item, index) => yAccessor({ item, index }));

    const extent = array.extent([...values, min, max]);
    const ticks = scale === d3Scale.scaleBand ?
      values :
      [extent[0], (extent[0] + extent[1]) / 2, extent[1]];

    const domain = scale === d3Scale.scaleBand ? values : extent;

    // invert range to support svg coordinate system
    const y = this.getY(domain);

    const longestValue = ticks
      .map((value, index) => formatLabel(value, index))
      .reduce((prev, curr) => prev.toString().length > curr.toString().length ? prev : curr, 0);

    return (
      <View style={[style]}>
        <View
          style={{ flexGrow: 1 }}
          onLayout={event => this._onLayout(event)}
        >
          {/* invisible text to allow for parent resizing */}
          <Text
            style={{ color: 'transparent', fontSize: svg.fontSize }}
          >
            {longestValue}
          </Text>
          <Svg style={ StyleSheet.absoluteFill }>
            {children}
            {
              // don't render labels if width isn't measured yet,
              // causes rendering issues
              height > 0 &&
              ticks.map((value, index) => {
                return (
                  <SVGText
                    originY={y(value)}
                    textAnchor="start"
                    x="4%"
                    alignmentBaseline="middle"
                    {...svg}
                    key={index}
                    y={y(value)}
                  >
                    {formatLabel(value, index)}
                  </SVGText>
                );
              })
            }
          </Svg>
        </View>
      </View>
    )
  }
}

YAxis.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  style: PropTypes.any,
  svg: PropTypes.shape({}),
  formatLabel: PropTypes.func,
  contentInset: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
  }),
  min: PropTypes.number,
  max: PropTypes.number,
  yAccessor: PropTypes.func,
  scale: PropTypes.func,
  spacingInner: PropTypes.number,
  spacingOuter: PropTypes.number,
};

YAxis.defaultProps = {
  spacingInner: 0.05,
  spacingOuter: 0.05,
  contentInset: {},
  svg: {},
  scale: d3Scale.scaleLinear,
  formatLabel: value => value && value.toString(),
  yAccessor: ({ item }) => item,
};

export default YAxis;
