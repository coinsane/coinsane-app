import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Header, Left, Right, Title, Body, Container, Content, Icon, Text, List, ListItem, Button, Thumbnail } from 'native-base';
import Spacer from '../../Spacer/Spacer.component';
import SearchBar from '../../_Molecules/SearchBar/SearchBar.component';
import { Actions } from 'react-native-router-flux';
import Modal from '../../modal/BaseModal.component';
import { clearMarkets } from '../../../../redux/state/markets/markets.actioncreators';
import { updateProccessTransaction } from '../../../../redux/state/inProcess/inProcess.actioncreators';
import SelectorListItem from '../../_Molecules/CoinCell/CoinCell.component';
import styles from './CoinsaneList.styles';
import { colors, base } from '../../../styles';

class Selector extends Component {
  componentWillMount() {
    if (this.props.preLoad) {
      this.props.preLoad(); // from top container
    }
  }

  close() {
    if (this.props.clear) {
      this.props.clear(); // from top container
    }
    Actions.pop()
  }

  renderSearchBar() {
    if (!this.props.searchBar) return;
    return <SearchBar />;
  }

  renderLeft() {
    if (this.props.navigationType === 'back') {
      return(
        <Button transparent onPress={() => this.close() }>
          <Icon name='ios-arrow-back' width={28} style={{ color: colors.white }} />
        </Button>
      );
    }
  }

  renderRight() {
    if (this.props.navigationType === 'close') {
      return(
        <Button transparent onPress={() => this.close() }>
          <Icon name='md-close' width={28} style={{ color: colors.white }} />
        </Button>
      );
    }
  }

  render() {
    return (
      <Modal hideClose>
        <Container>
          <Header style={styles.headerContainer}>
            <StatusBar barStyle="light-content"/>
            <Left>{ this.renderLeft() }</Left>
            <Body>
              <Title>{this.props.title}</Title>
            </Body>
            <Right>{ this.renderRight() }</Right>
          </Header>
          <Content padder style={{ backgroundColor: colors.bgGray }}>
            { this.renderSearchBar() }
            <List style={ styles.ListContainer }>
              { this.props.state[this.props.listName].list.map(item => {
                return(
                  <SelectorListItem key={item._id} listItemType={this.props.listItemType} item={item} selectAction={ () => this.props.selectAction(item) } />
                );
              }) }
            </List>
          </Content>
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { state };
}

export default connect(mapStateToProps, { clearMarkets })(Selector);
