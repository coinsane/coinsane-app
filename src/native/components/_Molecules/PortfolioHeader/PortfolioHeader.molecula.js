import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Body, Text, Icon, Right, View, Button } from 'native-base';

import { nFormat, cFormat } from '../../../../lib/utils';
import I18n from '../../../../i18n';
import Spacer from '../../Spacer/Spacer.component';
import styles from './PortfolioHeader.styles';
import { colors, typography } from '../../../styles';

const PortfolioHeader = ({
  id,
  show,
  title,
  count,
  addCoin,
  changePct,
  amount,
  currency,
  updateCollapsed,
  isCollapsed,
  isLoading,
}) => {
  if (!show) return <Spacer size={0} />;

  const textPlaceholder = isLoading && typography.textPlaceholder;
  const icon = isCollapsed ? 'ios-arrow-up' : 'ios-arrow-down';

  const totalDisplay = cFormat(nFormat(amount, currency.decimal), currency.symbol);

  const changeColor = changePct < 0 ? colors.primaryPink : colors.primaryGreen;
  const changePctDisplay = `${changePct}%`;

  return (
    <View style={styles.container}>
      <ListItem style={styles.listItem} onPress={() => updateCollapsed(id)}>
        <Body style={styles.body}>
          <Icon name={icon} style={styles.body__arrowIcon} />
          <Text numberOfLines={1} style={styles.body__text}>{title}</Text>
        </Body>
        <Right style={styles.right}>
          {
            !!amount &&
            <Text style={[styles.right__text, textPlaceholder]} numberOfLines={1}>
              <Text style={[styles.right__text, textPlaceholder]}>{totalDisplay}</Text>
              &nbsp;
              <Text
                style={[
                  styles.right__text,
                  { color: changeColor },
                  textPlaceholder,
                ]}
              >
                {changePctDisplay}
              </Text>
            </Text>
          }
        </Right>
      </ListItem>
      {
        !count && !isCollapsed &&
        <Button
          small
          bordered
          full
          style={styles.headerBtn}
          onPress={() => addCoin(id)}
        >
          <Text style={styles.headerBtn__text}>{I18n.t('coins.addButton')}</Text>
        </Button>
      }
    </View>
  );
};

PortfolioHeader.propTypes = {
  show: PropTypes.bool,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  addCoin: PropTypes.func.isRequired,
  updateCollapsed: PropTypes.func.isRequired,
  changePct: PropTypes.number,
  amount: PropTypes.number,
  currency: PropTypes.shape({}).isRequired,
  isCollapsed: PropTypes.bool,
  isLoading: PropTypes.bool,
};

PortfolioHeader.defaultProps = {
  show: null,
  amount: 0,
  changePct: 0,
  isCollapsed: false,
  isLoading: false,
};

export default PortfolioHeader;
