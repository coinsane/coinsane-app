import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, List, Title, View } from 'native-base';

import SearchBar from '../../_Molecules/SearchBar/SearchBar.molecula';
import Modal from '../../modal/BaseModal.component';
import SelectorListItem from '../../_Molecules/CoinCell/CoinCell.component';
import CoinsaneHeader from '../../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import Loading from '../../Loading/Loading.component';
import Empty from '../../Empty/Empty.component';
import styles from './CoinsaneList.styles';
import { base } from '../../../styles';
import I18n from '../../../../i18n';

class CoinsaneList extends Component {
  static propTypes = {
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

  getList = () => {
    const { state, listName } = this.props;
    return state[listName];
  };

  close() {
    if (this.props.clear) {
      this.props.clear(); // from top container
    }
    Actions.pop();
  }

  handleRefresh = () => {
    if (!this.getList().refreshing) this.props.preLoad();
  };

  handleLoadMore = () => {
    // const {
    //   markets,
    //   changeSearchTerm,
    //   getAvailableMarkets,
    // } = this.props;
    if (!this.getList().loading) {
      if (this.getList().searchTerm) {
        // changeSearchTerm({
        //   skip: this.getList().list.length,
        //   q: this.getList().searchTerm,
        // });
      } else {
        // getAvailableMarkets({ skip: this.getList().list.length });
      }
    }
  };

  renderHeader = () => {
    const { searchBar } = this.props;
    if (!searchBar) return null;
    return (
      <View style={styles.search}>
        <SearchBar />
      </View>
    );
  };

  renderFooter = () => {
    if (!this.getList().loading) return null;
    return <Loading size={25} />;
  };

  renderEmpty = () => {
    if (this.getList().loading) return null;
    return <Empty description={I18n.t('empty.search')} />;
  };

  renderSeparator = () => <View style={styles.separator} />;

  render() {
    const {
      title,
      listItemType,
      selectAction,
    } = this.props;

    const listItem = this.getList();

    return (
      <Modal hideClose>
        <Container>
          <CoinsaneHeader
            leftIcon="Close"
            leftAction={() => this.close()}
            title={<Title>{title}</Title>}
          />
          <List style={[base.contentContainer, base.contentPadding]}>
            <FlatList
              data={listItem.list}
              renderItem={({ item, index }) => (
                <SelectorListItem
                  key={item}
                  listItemType={listItemType}
                  item={listItem.items[item]}
                  selectAction={() => selectAction(listItem.items[item])}
                />
              )}
              keyExtractor={item => item}
              ItemSeparatorComponent={this.renderSeparator}
              ListEmptyComponent={this.renderEmpty}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
              onRefresh={this.handleRefresh}
              refreshing={listItem.refreshing}
            />
          </List>
        </Container>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CoinsaneList);
