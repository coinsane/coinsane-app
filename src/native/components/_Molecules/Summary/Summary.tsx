import React from 'react';
import { View, Text } from 'native-base';

import TextPct from 'src/native/components/_Atoms/TextPct';
import CoinsaneSummaryText from 'src/native/components/_Atoms/CoinsaneSummaryText/CoinsaneSummaryText.component';
import CoinsaneButton from 'src/native/components/_Atoms/CoinsaneButton/CoinsaneButton.component';
import Loading from 'src/native/components/Loading/Loading.component';

import styles from './Summary.styles';

interface IProps {
  value: number;
  subValue: number | string;
  currency: any;
  updateCurrency: (key: string) => void;
  buttons: [string],
  leftTitle?: string;
  leftValue?: number;
  rightTitle?: string;
  rightValue?: number;
}

class Summary extends React.PureComponent<IProps> {
  render () {
    const {
      value,
      subValue,
      currency,
      updateCurrency,
      buttons,
      leftTitle,
      leftValue,
      rightTitle,
      rightValue,
    } = this.props;
    if (!currency || !currency.code) return <Loading size={25} />;
    return (
      <View style={styles.totalContainer}>
        <View style={styles.total__buttons}>
          {buttons.map(key => (
            <CoinsaneButton
              key={key}
              type="currency"
              value={key}
              uppercase
              onPress={() => updateCurrency(key)}
              active={currency.code === key}
            />
          ))}
        </View>
        <View style={styles.total__summaryContainer}>
          {
            !!leftValue &&
            <View style={styles.total__summaryLeft}>
              <Text style={styles.total__summaryText}>{leftTitle && leftTitle.toUpperCase()}</Text>
              <TextPct style={styles.total__summaryText} size={11} value={leftValue} negative />
            </View>
          }
          <View style={styles.total__summaryBody}>
            <CoinsaneSummaryText value={value} />
            {
              typeof subValue === 'number' ?
                <TextPct style={styles.subValue} value={subValue} symbol="%" /> :
                <Text style={styles.subValue}>{subValue}</Text>
            }
          </View>
          {
            !!rightValue &&
            <View style={styles.total__summaryRight}>
              <Text style={styles.total__summaryText}>{rightTitle && rightTitle.toUpperCase()}</Text>
              <TextPct style={styles.total__summaryText} size={11} value={rightValue} positive />
            </View>
          }
        </View>
      </View>
    );
  }
}

export default Summary;
