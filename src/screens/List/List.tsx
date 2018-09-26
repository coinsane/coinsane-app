import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Container, List as NativeList, Title, View, Footer, Button, Text } from 'native-base';
import get from 'lodash/get';

import Header from 'src/components/_Organisms/Header';
import { Empty, Loading } from 'src/components/Base';

import SearchBar from 'src/components/_Molecules/SearchBar/SearchBar.molecula';
import Modal from 'src/components/modal/BaseModal.component';
import SelectorListItem from 'src/components/_Molecules/CoinCell/CoinCell.component';
import { base } from 'src/styles';
import { i18n } from 'src/services';

import styles from './List.styles';

class List extends Component {
  static propTypes = {
    searchBar: PropTypes.bool,
    title: PropTypes.string.isRequired,
    items: PropTypes.shape({}),
    listName: PropTypes.string,
    listItemType: PropTypes.string,
    selectAction: PropTypes.func.isRequired,
    preLoad: PropTypes.func,
    clear: PropTypes.func,
    activeItem: PropTypes.string,
    selectedItems: PropTypes.string,
    state: PropTypes.shape({}).isRequired,
    footerTitle: PropTypes.string,
    footerTitleSelected: PropTypes.string,
    footerAction: PropTypes.func,
    headItem: PropTypes.shape({}),
  };

  static defaultProps = {
    items: null,
    listName: null,
    searchBar: false,
    activeItem: null,
    selectedItems: null,
    listItemType: null,
    preLoad: null,
    clear: null,
    footerTitle: null,
    footerTitleSelected: null,
    footerAction: null,
    headItem: null,
  };

  constructor(props) {
    super(props);
    if (props.preLoad) props.preLoad({});
  }

  getList = () => {
    const { state, listName, items } = this.props;
    if (items) {
      return {
        items,
        list: Object.keys(items),
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
    const { searchBar, listName } = this.props;
    if (!searchBar) return null;
    return (
      <View style={styles.search}>
        <SearchBar type={listName} />
      </View>
    );
  };

  renderFooter = () => {
    if (!this.getList().loading) return null;
    return <Loading size={25} />;
  };

  renderEmpty = () => {
    if (this.getList().loading) return null;
    return <Empty description={i18n.t('empty.search')} />;
  };

  renderSeparator = () => <View style={styles.separator} />;

  renderFooterButton = () => {
    const {
      footerTitle,
      footerAction,
      footerTitleSelected,
      selectedItems,
      state,
    } = this.props;
    if (!(footerAction && footerTitle)) return null;
    let title = footerTitle;
    if (selectedItems && footerTitleSelected) {
      const selected = get(state, selectedItems, null);
      title = `${title} ${Object.keys(selected).map(key => selected[key][footerTitleSelected]).join(', ')}`;
    }
    return (
      <Footer style={base.footer}>
        <Button
          small
          bordered
          full
          onPress={footerAction}
          style={base.footer__button}
        >
          <Text style={base.footer__buttonText}>{title}</Text>
        </Button>
      </Footer>
    );
  };

  renderHeadListItem = () => {
    const {
      headItem,
      listItemType,
      activeItem,
      selectedItems,
      state,
    } = this.props;

    const selected = get(state, selectedItems, {});
    const selectedIds = Object.keys(selected).map(key => selected[key].id);

    if (!(headItem && headItem.title && headItem.selectAction)) return null;
    return (
      <View>
        <SelectorListItem
          listItemType={listItemType}
          item={headItem}
          selectAction={headItem.selectAction}
          currency={state.settings.currencies[state.settings.currency]}
          active={!activeItem || selectedIds.includes(headItem._id)}
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
      selectedItems,
    } = this.props;

    const selected = get(state, selectedItems, {});
    const selectedIds = Object.keys(selected).map(key => selected[key].id);

    const listItem = this.getList();
    // console.log('listItem', listItem);
    // console.log('selectedIds', selectedIds);

    return (
      <Modal hideClose>
        <Container>
          <Header
            leftIcon="Close"
            leftAction={() => this.close()}
            title={<Title style={base.title}>{title}</Title>}
          />
          <NativeList style={[base.contentContainer, base.contentPadding]}>
            {this.renderHeadListItem()}
            <FlatList
              data={listItem.list}
              renderItem={({ item }) => (
                <SelectorListItem
                  key={item}
                  listItemType={listItemType}
                  item={listItem.items[item]}
                  selectAction={() => selectAction(listItem.items[item], selectedIds)}
                  currency={state.settings.currencies[state.settings.currency]}
                  active={item === activeItem || selectedIds.includes(item)}
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
              refreshing={listItem.refreshing || false}
              extraData={selectedIds}
            />
          </NativeList>
        </Container>
        {this.renderFooterButton()}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({ state });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(List);