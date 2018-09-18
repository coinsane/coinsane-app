import React from 'react';
import { View } from 'native-base';

import SummaryInfo from './components/SummaryInfo';
import styles from './SummaryCell.styles';

export interface ISummaryCell {
  label: string;
  value: number;
  symbol: string;
}

interface IProps {
  summaryList: [ISummaryCell];
  background?: string;
  borderBottom?: string;
  loading?: boolean;
}

class SummaryCell extends React.PureComponent<IProps> {
  render() {
    const {
      summaryList,
      background = '',
      borderBottom = '',
      loading = false,
    } = this.props;
    return (
      <View
        style={[
          styles.container,
          !!background && styles.background,
          !!borderBottom && styles.borderBottom,
        ]}
      >
        {
          !loading && summaryList.map(({ label, value, symbol }, i) => (
            <SummaryInfo
              key={label}
              label={label}
              value={value}
              symbol={symbol}
              isLast={i === summaryList.length - 1}
            />
          ))
        }
      </View>
    );
  }
}

export default SummaryCell;
