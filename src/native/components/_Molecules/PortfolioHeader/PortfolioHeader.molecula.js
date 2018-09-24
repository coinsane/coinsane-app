import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Body, Text, Icon, Right, View, Button } from 'native-base';

import { Spacer } from 'src/native/components/Base';

import { nFormat, cFormat } from '../../../../lib/utils';
import I18n from '../../../../i18n';
import styles from './PortfolioHeader.styles';
import CoinsaneIcon from '../../_Atoms/CoinsaneIcon/CoinsaneIcon.component';
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
  hideAddButton,
  provider,
}) => {
  if (!show) return <Spacer />;

  const textPlaceholder = isLoading && typography.textPlaceholder;
  const icon = isCollapsed ? 'ios-arrow-up' : 'ios-arrow-down';

  const totalDisplay = cFormat(nFormat(amount, currency.decimal), currency.symbol);

  const changeColor = changePct < 0 ? colors.primaryPink : colors.primaryGreen;
  const changePctDisplay = `${changePct}%`;

  const ButtonPortfolio = () => {
    if (count || isCollapsed || hideAddButton) return null;
    return (
      <Button
        small
        bordered
        full
        style={styles.headerBtn}
        onPress={() => addCoin(id)}
      >
        <Text style={styles.headerBtn__text}>{I18n.t('coins.addButton')}</Text>
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <ListItem style={styles.listItem} onPress={() => updateCollapsed(id)}>
        <Body style={styles.body}>
          <Icon name={icon} style={styles.body__arrowIcon} />
          { provider && <CoinsaneIcon name={provider} width={18} height={18} /> }
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
      <ButtonPortfolio />
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
  hideAddButton: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  isLoading: PropTypes.bool,
  provider: PropTypes.string,
};

PortfolioHeader.defaultProps = {
  show: null,
  amount: 0,
  changePct: 0,
  isCollapsed: false,
  isLoading: false,
  hideAddButton: false,
  provider: null,
};

export default PortfolioHeader;
