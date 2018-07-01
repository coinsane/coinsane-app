import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';
import CoinsanePctText from '../../_Atoms/CoinsanePctText/CoinsanePctText.atom';
import CoinsaneSummaryText from '../../_Atoms/CoinsaneSummaryText/CoinsaneSummaryText.component';
import CoinsaneButton from '../../_Atoms/CoinsaneButton/CoinsaneButton.component';
import Loading from '../../Loading/Loading.component';
import styles from './CoinsaneSummary.styles';

const CoinsaneSummary = ({
  value,
  subValue,
  currency,
  updateCurrency,
  buttons,
  leftTitle,
  leftValue,
  rightTitle,
  rightValue,
  loading,
  error,
}) => {
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
      {
        loading ?
          <Loading style={styles.loading} size={25} /> :
          <View style={styles.total__summaryContainer}>
            {
              leftValue &&
              <View style={styles.total__summaryLeft}>
                <Text style={styles.total__summaryText}>{leftTitle.toUpperCase()}</Text>
                <CoinsanePctText style={styles.total__summaryText} size={11} value={leftValue} symbol="" negative />
              </View>
            }
            <View style={styles.total__summaryBody}>
              <CoinsaneSummaryText value={value} />
              {
                typeof subValue === 'number' ?
                  <CoinsanePctText style={styles.subValue} value={subValue} /> :
                  <Text style={styles.subValue}>{subValue}</Text>
              }
            </View>
            {
              rightValue &&
              <View style={styles.total__summaryRight}>
                <Text style={styles.total__summaryText}>{rightTitle.toUpperCase()}</Text>
                <CoinsanePctText style={styles.total__summaryText} size={11} value={rightValue} symbol="" positive />
              </View>
            }
          </View>
      }
    </View>
  );
};

CoinsaneSummary.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  subValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  currency: PropTypes.shape({}).isRequired,
  updateCurrency: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string).isRequired,
  leftTitle: PropTypes.string,
  leftValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  rightTitle: PropTypes.string,
  rightValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

CoinsaneSummary.defaultProps = {
  leftTitle: null,
  leftValue: null,
  rightTitle: null,
  rightValue: null,
  value: 0,
  loading: false,
  error: null,
};

export default CoinsaneSummary;
