import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, TouchableOpacity, Animated } from 'react-native';
import { View } from 'native-base';
import Interactable from 'react-native-interactable';

import styles from './SwipeRow.styles';
import { colors } from '../../../styles';
import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

class SwipeRow extends Component {
  static propTypes = {
    damping: PropTypes.number,
    tension: PropTypes.number,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string,
      color: PropTypes.string,
      onPress: PropTypes.func,
    })),
    children: PropTypes.node.isRequired,
    height: PropTypes.number,
    right: PropTypes.number,
    backgroundColor: PropTypes.string,
    noActions: PropTypes.bool,
  };

  static defaultProps = {
    buttons: [],
    damping: 1 - 0.6,
    tension: 300,
    height: 60,
    right: 10,
    backgroundColor: colors.bgPrimary,
    noActions: false,
  };

  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
    this.state = { isMoving: false, position: 1 };
    this.onSnap = this.onSnap.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onStopMoving = this.onStopMoving.bind(this);
    this.onRowPress = this.onRowPress.bind(this);
  }

  onSnap({ nativeEvent }) {
    const { index } = nativeEvent;
    this.setState({ position: index });
  }

  onRowPress() {
    const { isMoving, position } = this.state;
    if (!isMoving && position !== 1) {
      this.interactableElem.snapTo({ index: 1 });
    }
  }

  onDrag({ nativeEvent }) {
    const { state } = nativeEvent;
    if (state === 'start') {
      this.setState({ isMoving: true });
    }
  }

  onStopMoving() {
    this.setState({ isMoving: false });
  }

  render() {
    const {
      damping,
      tension,
      buttons,
      backgroundColor,
      height,
      right,
      children,
      noActions,
    } = this.props;

    if (noActions) return children;

    const ActionButtons = () => {
      if (!buttons.length) return null;
      return (
        <View style={[styles.buttons, { width: -height * buttons.length, height, right }]}>
          {
            buttons.map(({ icon, color, onPress }, i) => (
              <View style={[styles.iconContainer, { height }]} key={`${icon + i}`}>
                <TouchableOpacity onPress={onPress}>
                  <CoinsaneIcon name={icon} fill={color} width={28} />
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      );
    };

    const activeOpacity = this.state.position !== 1 ? 0.5 : 1;
    return (
      <View style={[styles.row, { backgroundColor }]}>
        <ActionButtons />
        <Interactable.View
          ref={(e) => {
            this.interactableElem = e;
          }}
          horizontalOnly
          snapPoints={[
            { x: 0, damping: 1 - damping, tension },
            { x: -70 * buttons.length, damping: 1 - damping, tension },
          ]}
          onSnap={this.onSnap}
          onDrag={this.onDrag}
          onStop={this.onStopMoving}
          dragToss={0.01}
          animatedValueX={this._deltaX}
        >
          <TouchableHighlight onPress={this.onRowPress} activeOpacity={activeOpacity}>
            {children}
          </TouchableHighlight>
        </Interactable.View>
      </View>
    );
  }
}

export default SwipeRow;
