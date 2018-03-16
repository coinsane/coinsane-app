import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Header, Left, Right, Title, Body, Container, Content, Icon, Text, List, ListItem, Button, Thumbnail } from 'native-base';
import Spacer from '../Spacer/Spacer.component';
import SearchBar from '../SearchBar/SearchBar.component';
import { Actions } from 'react-native-router-flux';
import Modal from '../modal/BaseModal.component';
import { getAvaliableCoins, clearCoins } from '../../../actions/coins';
import { updateProccessTransaction } from '../../../actions/inProccess';
import SearchListItem from '../SearchListItem/SearchListItem.component';
import styles from './SearchList.styles';
import { colors, base } from '../../styles';

class SearchList extends Component {
  componentWillMount() {
    this.props.getAvaliableCoins();
  }
  
  close() {
    this.props.clearCoins();
    Actions.pop()
  }
  
  onPress(coinId) {
    this.props.updateProccessTransaction({coinId});
    Actions.createNewTransaction()
  }
  
  render() {
    return (
      <Modal hideClose>
        <Container>
          <Header style={styles.headerContainer}>
            <StatusBar barStyle="light-content"/>
            <Left></Left>
            <Body>
              <Title>{'Select coin'}</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.close() }>
                <Icon name='md-close' width={28} style={{ color: colors.white }} />
              </Button>
            </Right>
          </Header>
          <Content padder style={{ backgroundColor: colors.bgGray }}>
            <SearchBar />
            <List style={ styles.ListContainer }>
              { this.props.coins.list.map(coin => {
                return(
                  <SearchListItem key={coin._id} coin={coin} onPress={ () => this.onPress(coin._id) } />
                );
              }) }
            </List>
          </Content>
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = ({ coins }) => {
  return {
    coins
  };
}

export default connect(mapStateToProps, { getAvaliableCoins, clearCoins, updateProccessTransaction })(SearchList);
