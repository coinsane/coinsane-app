import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Footer, Button, Form, Item, Label, Input, View, Title, Toast, Root } from 'native-base';

import api from '../../../api';
import ga from '../../../lib/ga';
import I18n from '../../../i18n';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import CoinsaneSwitch from '../_Atoms/CoinsaneSwitch/CoinsaneSwitch.atom';
import CoinsaneListItem from '../_Molecules/CoinsaneListItem/CoinsaneListItem.molecula';
import Loading from '../Loading/Loading.component';
import styles from './CreatePortfolio.styles';
import { base } from '../../styles';

class CreatePortfolio extends Component {
  static propTypes = {
    addPortfolio: PropTypes.func.isRequired,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      inTotal: true,
      providers: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.createPortfolio = this.createPortfolio.bind(this);
  }

  componentDidMount() {
    ga.trackScreenView('CreatePortfolio');
  }

  showExchanges() {
    this.setState({ loading: true });
    api.portfolios.getExchanges()
      .then((data) => {
        this.setState({
          providers: data.data.data,
          provider: data.data.data[0],
          loading: false,
          key: '1SeQ6m0a4gNwduwXxL41RufxCv2O6Ojkj0yvLLGhkGJBbnvyZt4xhX4b7u5nXJvs',
          secret: 'KIgbzNw1LVliFk4DJm0GxETLiVbxxHbFFU6SnWsMRQhVTvWmFLjYhfGu7frn28Vc',
        });
      });
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  };

  createPortfolio = () => {
    this.props.addPortfolio(this.state);
    ga.trackEvent('portfolios', 'createPortfolio_Success');
  };

  chooseExchange = (provider) => {
    this.setState({ provider });
  };

  exchangeSelector = (activeItem) => {
    Actions.selector({
      // listName: 'portfolios',
      items: this.state.providers,
      title: I18n.t('portfolios.titleChoose'),
      listItemType: 'check',
      activeItem,
      selectAction: (item) => {
        this.chooseExchange(item);
        Actions.pop();
      },
    });
  };

  render() {
    return (
      <Root>
        <Container>
          <CoinsaneHeader
            leftIcon="Back"
            title={<Title style={base.title}>{I18n.t('portfolios.titleAdd')}</Title>}
          />
          <Content style={[base.contentContainer, base.contentPadding]}>
            <Form>
              <Text style={styles.content__text}>{I18n.t('portfolios.form.labelAdd')}</Text>
              <Item stackedLabel style={base.form__titleContainer}>
                <Label style={base.form__titleLabel}>{I18n.t('portfolios.form.fieldTitle')}</Label>
                <Input
                  autoFocus
                  onChangeText={v => this.handleChange('title', v)}
                  value={this.state.title}
                  style={base.form__titleInput}
                />
              </Item>
              <View style={base.form__switchContainer}>
                <Text style={base.form__switchLabel}>{I18n.t('portfolios.form.fieldSwitch')}</Text>
                <View style={base.form__switchInput}>
                  <CoinsaneSwitch
                    onSyncPress={() => this.handleChange('inTotal', !this.state.inTotal)}
                    defaultValue={this.state.inTotal}
                  />
                </View>
              </View>
            </Form>
            {
              !this.state.providers.length &&
              !this.state.loading &&
              <Button
                small
                bordered
                full
                style={styles.btn}
                onPress={() => this.showExchanges()}
              >
                <Text style={styles.btn__text}>{I18n.t('portfolios.form.buttonFromExchange')}</Text>
              </Button>
            }
            { this.state.loading && <Loading /> }
            {
              this.state.providers.length &&
              <Form>
                <Text style={[styles.content__text, styles.content__text_top]}>{I18n.t('portfolios.form.labelExchange')}</Text>
                <CoinsaneListItem
                  title={this.state.provider.name}
                  onPress={() => this.exchangeSelector(this.state.provider._id)}
                />
                <Item stackedLabel style={base.form__titleContainer}>
                  <Label style={base.form__titleLabel}>{I18n.t('portfolios.form.fieldKey')}</Label>
                  <Input
                    onChangeText={v => this.handleChange('key', v)}
                    value={this.state.key}
                    style={base.form__titleInput}
                  />
                </Item>
                <Item stackedLabel style={base.form__titleContainer}>
                  <Label style={base.form__titleLabel}>{I18n.t('portfolios.form.fieldSecret')}</Label>
                  <Input
                    onChangeText={v => this.handleChange('secret', v)}
                    value={this.state.secret}
                    style={base.form__titleInput}
                  />
                </Item>
              </Form>
            }
          </Content>
          <Footer style={base.footer}>
            <Button
              small
              bordered
              full
              disabled={!this.state.title}
              onPress={this.createPortfolio}
              style={base.footer__button}
            >
              {
                this.props.loading ?
                  <Loading style={base.footer__buttonLoading} /> :
                  <Text style={base.footer__buttonText}>{I18n.t('portfolios.createButton')}</Text>
              }
            </Button>
          </Footer>
        </Container>
      </Root>
    );
  }
}

export default CreatePortfolio;
