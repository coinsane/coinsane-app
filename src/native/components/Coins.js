import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListView, SectionList, TouchableOpacity, RefreshControl, Image, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Left, Right, List, ListItem, Separator, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';
import CoinCard from './CoinCard';
import Colors from '../../../native-base-theme/variables/commonColor';

class CoinListing extends Component {
  static propTypes = {
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
    activePortfolio: PropTypes.string,
  }

  static defaultProps = {
    portfoliosError: null,
    portfoliosFetch: null,
    coinsError: null,
    coinsFetch: null,
  }

  constructor(props) {
    super(props);

    this._handleIconTouch = this._handleIconTouch.bind(this);
    this._renderRightButton = this._renderRightButton.bind(this);
  }

  componentWillMount() {
    // Actions.refresh({ right: this._renderRightButton });
  }

  _renderRightButton = () => {
    // const activePortfolio = this.props.activePortfolio();
    // console.log('activePortfolio', activePortfolio)
    return (<TouchableOpacity onPress={() => this._handleIconTouch() } style={styles.rightButton}>
      <Text>{this.props.activePortfolio || 'All Portfolios'}</Text>
    </TouchableOpacity>)
  };

  _handleIconTouch = () => Actions.portfolioSelect();

  componentDidMount = () => {
    // Actions.refresh({ right: this._renderRightButton });
  };

  render() {
    const {
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
      activePortfolio,
    } = this.props;

    // Loading
    if (portfoliosLoading) return <Loading />;

    // // Error
    if (portfoliosError) return <Error content={error} />;

    const keyExtractor = item => item.id;

    const showCoin = item => Actions.coin({ match: { params: { id: String(item.id) } } });

    const portfoliosList = activePortfolio ? portfolios.filter(portfolio => portfolio.id === activePortfolio) : portfolios;

    return (
      <Container>
        <Content padder style={{ backgroundColor: '#232033' }}>
          <Header
            title={activePortfolio ? portfoliosList[0].title : 'All Portfolios'}
          />
          <Spacer size={10} />
            {
              portfoliosList.length ? portfoliosList.map(portfolio => (
                <List key={portfolio.id}>
                  {activePortfolio ? (<Spacer size={0} />) : (<ListItem itemDivider>
                    <Body>
                      <Text>{portfolio.title}</Text>
                    </Body>
                    <Right>
                      <Button small onPress={() => removePortfolio(portfolio.id)}>
                        <Icon name='close' />
                      </Button>
                    </Right>
                  </ListItem>)}
                  {
                    portfolio.coins && portfolio.coins.length ? portfolio.coins.map(coin => (
                      <CoinCard
                        key={coin.id}
                        coin={coin}
                        showCoin={showCoin}
                        removeCoin={removeCoin}
                      ></CoinCard>
                    )) : (
                      <ListItem>
                        <Text>No coins here</Text>
                      </ListItem>
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
          <Spacer size={50} />
        </Content>
      </Container>
    );
  }
}

export default CoinListing;
