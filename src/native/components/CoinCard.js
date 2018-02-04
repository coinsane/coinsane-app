import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { ListItem, View, Button, Text, Icon, Body, Right, SwipeRow } from 'native-base';
import ErrorMessages from '../../constants/errors';

const CoinCard = ({
  coin,
  showCoin,
  removeCoin
}) => {
  if (!coin) return (
    <ListItem>
      <Text>{ErrorMessages.coin404}</Text>
    </ListItem>
  );

  return (
    <SwipeRow
      style={styles.row}
      rightOpenValue={-75}
      body={
        <View>
          <Text button onPress={() => showCoin(coin)}>{coin.title}</Text>
        </View>
      }
      right={
        <Button danger onPress={() => removeCoin(coin.id)}>
          <Icon active name="trash" />
        </Button>
      }
    />
  );
};

CoinCard.propTypes = {
  coin: PropTypes.shape({}),
  showCoin: PropTypes.func,
  removeCoin: PropTypes.func,
};

CoinCard.defaultProps = {
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#232033',
    paddingLeft: 0
  },
})

export default CoinCard;
