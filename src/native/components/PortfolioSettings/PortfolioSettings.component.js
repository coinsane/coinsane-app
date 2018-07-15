import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Footer, Button, Form, Item, Label, Input, View, Title } from 'native-base';

import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import CoinsaneSwitch from '../_Atoms/CoinsaneSwitch/CoinsaneSwitch.atom';
import I18n from '../../../i18n';

import styles from './PortfolioSettings.styles';
import { base } from '../../styles';

class PortfolioSettings extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    portfolios: PropTypes.shape({}).isRequired,
    editPortfolio: PropTypes.func.isRequired,
    selectPortfolio: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.getPortfolio(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getPortfolio = () => {
    const { portfolios, id } = this.props;
    return get(portfolios, id, {});
  };

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  };

  handleSubmit = () => {
    this.props.editPortfolio(this.state);
    Actions.pop();
  };

  removePortfolioAlert = () => {
    Alert.alert(
      I18n.t('portfolios.form.fieldRemove'),
      I18n.t('portfolios.form.fieldRemoveDesc'),
      [
        {
          text: I18n.t('portfolios.form.buttonRemove'),
          onPress: () => {
            this.props.removePortfolio(this.state._id);
            this.props.selectPortfolio();
            Actions.pop();
          },
          style: 'cancel',
        },
        {
          text: I18n.t('buttons.cancel'),
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const portfolio = this.getPortfolio();

    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Back"
          title={<Title style={base.title}>{portfolio.title}</Title>}
        />
        <Content style={[base.contentContainer, base.contentPadding]}>
          <Form>
            <Text style={base.form__title}>{I18n.t('portfolios.form.labelEdit')}</Text>
            <Item stackedLabel style={base.form__titleContainer}>
              <Label style={base.form__titleLabel}>{I18n.t('portfolios.form.fieldTitle')}</Label>
              <Input
                style={base.form__titleInput}
                onChangeText={v => this.handleChange('title', v)}
                value={this.state.title}
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
            <Button
              style={styles.form__button}
              transparent
              onPress={() => this.removePortfolioAlert()}
            >
              <Text style={styles.form__buttonText}>{I18n.t('portfolios.form.fieldRemove')}</Text>
            </Button>
          </Form>
        </Content>
        <Footer style={base.footer}>
          <Button
            small
            bordered
            full
            onPress={() => this.handleSubmit()}
            style={base.footer__button}
          >
            <Text style={base.footer__buttonText}>{I18n.t('portfolios.saveButton')}</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

export default PortfolioSettings;
