import React from 'react';
import PropTypes from 'prop-types';
import { ListView, SectionList, TouchableOpacity, RefreshControl, Image, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Left, Right, List, ListItem, Separator, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';
import Colors from '../../../native-base-theme/variables/commonColor';

const CoinListing = ({
  portfoliosError,
  portfoliosLoading,
  portfolios,
  addPortfolio,
  removePortfolio,
  portfoliosFetch,
  coinsError,
  coinsLoading,
  coins,
  addCoin,
  removeCoin,
  coinsFetch,
}) => {
  // Loading
  if (portfoliosLoading) return <Loading />;

  // // Error
  if (portfoliosError) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const showCoin = item => Actions.coin({ match: { params: { id: String(item.id) } } });

  return (
    <Container>
      <Content padder>
        <Header
          title="All Portfolios"
          content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
        />
        <Button block onPress={() => addPortfolio()}>
          <Text>Create Portfolio</Text>
        </Button>
        <Spacer size={10} />
          {
            portfolios.length ? portfolios.map(portfolio => (
              <List key={portfolio.id}>
                <ListItem itemDivider>
                  <Text>{portfolio.title}</Text>
                  <Button small bordered onPress={() => removePortfolio(portfolio.id)}>
                    <Icon name='beer' />
                  </Button>
                </ListItem>
                <Spacer size={10} />
                {
                  portfolio.coins && portfolio.coins.length ? portfolio.coins.map(coin => (
                    <ListItem key={coin.id}>
                      <Text>{coin.title}</Text>
                      <Button small bordered onPress={() => removeCoin(coin.id)}>
                        <Icon name='beer' />
                      </Button>
                    </ListItem>
                  )) : (
                    <List>
                      <ListItem>
                        <Text>No coins here</Text>
                      </ListItem>
                    </List>
                  )
                }
                <Spacer size={10} />
                <Button small bordered onPress={() => addCoin(portfolio.id)}>
                  <Text>Add Coin</Text>
                </Button>
                <Spacer size={10} />
              </List>
            )) : (
              <List>
                <ListItem>
                  <Text>List is empty</Text>
                </ListItem>
              </List>
            )
          }
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    backgroundColor: Colors.brandLight,
  },
})

CoinListing.propTypes = {
  portfoliosError: PropTypes.string,
  portfoliosLoading: PropTypes.bool.isRequired,
  portfolios: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  portfoliosFetch: PropTypes.func,
  addPortfolio: PropTypes.func,
  removePortfolio: PropTypes.func,

  coinsError: PropTypes.string,
  coinsLoading: PropTypes.bool.isRequired,
  coins: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  coinsFetch: PropTypes.func,
  addCoin: PropTypes.func,
  removeCoin: PropTypes.func,
};

CoinListing.defaultProps = {
  portfoliosError: null,
  portfoliosFetch: null,
  coinsError: null,
  coinsFetch: null,
};

export default CoinListing;
