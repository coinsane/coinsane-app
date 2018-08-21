import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, List, Title, View, Footer, Button, Text } from 'native-base';

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
    searchBar: PropTypes.bool,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({})),
    listName: PropTypes.string,
    listItemType: PropTypes.string,
    selectAction: PropTypes.func.isRequired,
    preLoad: PropTypes.func,
    clear: PropTypes.func,
    activeItem: PropTypes.string,
    state: PropTypes.shape({}).isRequired,
    footerTitle: PropTypes.string,
    footerAction: PropTypes.func,
    headItem: PropTypes.shape({}),
  };

  static defaultProps = {
    items: null,
    listName: null,
    searchBar: false,
    activeItem: null,
    listItemType: null,
    preLoad: null,
    clear: null,
    footerTitle: null,
    footerAction: null,
    headItem: null,
  };

  componentWillMount() {
    if (this.props.preLoad) this.props.preLoad({});
  }

  getList = () => {
    const { state, listName, items } = this.props;
    if (items) {
      const itemsObj = {};
      items.forEach((item) => {
        itemsObj[item._id] = item;
      });
      return {
        items: itemsObj,
        list: items.map(item => item._id),
        refreshing: false,
      };
    }
    return state[listName];
  };

  close() {
    if (this.props.clear) this.props.clear();
    Actions.pop();
  }

  handleRefresh = () => {
    if (this.props.preLoad && !this.getList().refreshing) {
      this.props.preLoad({
        q: this.getList().searchTerm,
        skip: this.getList().list.length,
      });
    }
  };

  handleLoadMore = () => {
    if (this.props.preLoad && !this.getList().loading) {
      this.props.preLoad({
        q: this.getList().searchTerm,
        skip: this.getList().list.length,
      });
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

  renderFooterButton = () => {
    const {
      footerTitle,
      footerAction,
    } = this.props;
    if (!(footerTitle && footerAction)) return null;
    return (
      <Footer style={base.footer}>
        <Button
          small
          bordered
          full
          onPress={footerAction}
          style={base.footer__button}
        >
          <Text style={base.footer__buttonText}>{footerTitle}</Text>
        </Button>
      </Footer>
    );
  };

  renderHeadListItem = () => {
    const {
      headItem,
      listItemType,
      activeItem,
      state,
    } = this.props;
    if (!(headItem && headItem.title && headItem.selectAction)) return null;
    return (
      <View>
        <SelectorListItem
          listItemType={listItemType}
          item={headItem}
          selectAction={headItem.selectAction}
          currency={state.settings.currencies[state.settings.currency]}
          active={!activeItem}
        />
        <View style={styles.separator} />
      </View>
    );
  };

  render() {
    const {
      title,
      listItemType,
      selectAction,
      state,
      activeItem,
    } = this.props;

    const listItem = this.getList();
    console.log(listItem);

    return (
      <Modal hideClose>
        <Container>
          <CoinsaneHeader
            leftIcon="Close"
            leftAction={() => this.close()}
            title={<Title style={base.title}>{title}</Title>}
          />
          <List style={[base.contentContainer, base.contentPadding]}>
            {this.renderHeadListItem()}
            <FlatList
              data={listItem.list}
              renderItem={({ item }) => (
                <SelectorListItem
                  key={item}
                  listItemType={listItemType}
                  item={listItem.items[item]}
                  selectAction={() => selectAction(listItem.items[item])}
                  currency={state.settings.currencies[state.settings.currency]}
                  active={item === activeItem}
                />
              )}
              keyExtractor={item => item}
              ItemSeparatorComponent={this.renderSeparator}
              ListEmptyComponent={this.renderEmpty}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.01}
              onRefresh={this.handleRefresh}
              refreshing={listItem.refreshing}
            />
          </List>
        </Container>
        {this.renderFooterButton()}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CoinsaneList);
