import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, List } from 'native-base';
import SearchBar from '../../_Molecules/SearchBar/SearchBar.molecula';
import Modal from '../../modal/BaseModal.component';
import { clearMarkets } from '../../../../redux/state/markets/markets.actioncreators';
import SelectorListItem from '../../_Molecules/CoinCell/CoinCell.component';
import CoinsaneHeader from '../../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import Loading from '../../Loading/Loading.component';
import styles from './CoinsaneList.styles';
import { colors } from '../../../styles';

class CoinsaneList extends Component {
  static propTypes = {
    navigationType: PropTypes.string.isRequired,
    searchBar: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    listName: PropTypes.string.isRequired,
    listItemType: PropTypes.string.isRequired,
    selectAction: PropTypes.func.isRequired,
    preLoad: PropTypes.func,
    clear: PropTypes.func,
    state: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    preLoad: () => {},
    clear: () => {},
  };

  componentWillMount() {
    this.props.preLoad();
  }

  close() {
    if (this.props.clear) {
      this.props.clear(); // from top container
    }
    Actions.pop();
  }

  render() {
    const {
      navigationType,
      searchBar,
      title,
      listName,
      listItemType,
      selectAction,
      state,
    } = this.props;

    return (
      <Modal hideClose>
        <Container>
          <CoinsaneHeader
            leftIcon="Close"
            leftAction={() => this.close()}
            title={<Text>{title}</Text>}
          />
          <Content style={{ backgroundColor: colors.bgGray }}>
            { searchBar && <SearchBar /> }
            {
              state[listName].loading ?
                <Loading /> :
                <List style={styles.ListContainer}>
                  { state[listName].list.map(item => (
                    <SelectorListItem
                      key={item._id}
                      listItemType={listItemType}
                      item={item}
                      selectAction={() => selectAction(item)}
                    />
                  )) }
                </List>
            }
          </Content>
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = {
  clearMarkets,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinsaneList);
