import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Body, Right } from 'native-base';
import { TouchableHighlight, TouchableOpacity, Animated } from 'react-native';
import moment from 'moment';
import Interactable from 'react-native-interactable';

import I18n from '../../../../i18n';
import { nFormat, cFormat } from '../../../../lib/utils';
import styles from './TransactionItem.styles';
import { colors } from '../../../styles';
import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';

class TransactionItem extends Component {
  static propTypes = {
    category: PropTypes.shape({}),
    amount: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    pair: PropTypes.shape({}).isRequired,
    pairSymbol: PropTypes.string,
    type: PropTypes.oneOf(['buy', 'sell', 'exchange']).isRequired,
    date: PropTypes.string.isRequired,
  };

  static defaultProps = {
    category: null,
    pairSymbol: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      damping: 1 - 0.6,
      tension: 300,
    };
  }

  render() {
    const {
      category,
      amount,
      total,
      pair,
      pairSymbol,
      type,
      date,
    } = this.props;

    let pairDisplay = cFormat(nFormat(Math.abs(total), 2), pair.symbol);
    let amountDisplay = `+${Math.abs(amount)}`;

    if (type === 'exchange') {
      if (pairSymbol) {
        if (amount < 0) {
          amountDisplay = `-${Math.abs(total)}`;
          pairDisplay = cFormat(nFormat(Math.abs(amount), 8), pairSymbol);
        } else {
          amountDisplay = `+${Math.abs(amount)}`;
          pairDisplay = cFormat(nFormat(Math.abs(total), 8), pair.symbol);
        }
      } else {
        amountDisplay = Math.abs(total);
        pairDisplay = cFormat(nFormat(Math.abs(amount), 8), pair.symbol);
      }
    } else if (type === 'sell') {
      amountDisplay = `-${amount}`;
    }

    const time = moment(date).format('HH:mm');

    const categoryTitle = type === 'exchange' ?
      I18n.t('categories.exchange') :
      category ?
        category.title :
        I18n.t('categories.empty');
    const categoryColor = type === 'exchange' ? colors.mediumGray : colors.iconDark;
    const categoryIcon = type === 'exchange' ? '↔' : categoryTitle.charAt(0);

    return (
      <View style={styles.container}>
        <Row damping={this.state.damping} tension={this.state.tension}>
          <Body style={styles.body}>
            <View style={styles.iconContainer}>
              <CoinsaneIcon name="Category" fill={categoryColor} width={36} />
              <Text style={styles.iconText}>{categoryIcon}</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.category}>{categoryTitle}</Text>
              <Text style={styles.time}>{time}</Text>
            </View>
          </Body>
          <Right style={styles.right}>
            <Text style={styles.amount}>{amountDisplay}</Text>
            <Text style={styles.text}>{pairDisplay}</Text>
          </Right>
        </Row>
      </View>
    );
  };
}

class Row extends Component {
  static propTypes = {
    damping: PropTypes.number.isRequired,
    tension: PropTypes.number.isRequired,
  };

  static defaultProps = {
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

  onButtonPress(name) {
    alert(`Button ${name} pressed`);
  }

  render() {
    const { damping, tension } = this.props;
    const activeOpacity = this.state.position !== 1 ? 0.5 : 1;
    return (
      <View style={styles.row}>
        <View style={styles.buttons}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={this.onButtonPress}>
              <CoinsaneIcon name="Edit" fill={colors.white} width={28} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={this.onButtonPress}>
              <CoinsaneIcon name="Close" fill={colors.primaryPink} width={28} />
            </TouchableOpacity>
          </View>
        </View>

        <Interactable.View
          ref={(e) => {
            this.interactableElem = e;
          }}
          horizontalOnly
          snapPoints={[
            { x: 0, damping: 1 - damping, tension },
            { x: -140, damping: 1 - damping, tension },
          ]}
          onSnap={this.onSnap}
          onDrag={this.onDrag}
          onStop={this.onStopMoving}
          dragToss={0.01}
          animatedValueX={this._deltaX}
        >
          <TouchableHighlight onPress={this.onRowPress} activeOpacity={activeOpacity}>
            <View style={styles.item}>
              {this.props.children}
            </View>
          </TouchableHighlight>
        </Interactable.View>

      </View>
    );
  }
}

export default TransactionItem;
