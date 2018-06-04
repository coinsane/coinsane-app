import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, Footer, Button, Form, Item, Label, Input, View, Title } from 'native-base';

import I18n from '../../../i18n';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import CoinsaneSwitch from '../_Atoms/CoinsaneSwitch/CoinsaneSwitch.atom';
import styles from './CreatePortfolio.styles';
import { base } from '../../styles';

class CreatePortfolio extends Component {
  static propTypes = {
    addPortfolio: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      inTotal: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  };

  handleSubmit = () => {
    const { addPortfolio } = this.props;
    addPortfolio(this.state);
    Actions.pop();
  };


  render() {
    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Back"
          title={<Title>{I18n.t('portfolios.titleAdd')}</Title>}
        />
        <Content style={[base.contentContainer, base.contentPadding]}>
          <Text style={styles.content__text}>{I18n.t('portfolios.form.labelAdd')}</Text>
          <Form>
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
        </Content>
        <Footer style={base.footer}>
          <Button
            small
            bordered
            full
            onPress={() => this.handleSubmit()}
            style={base.footer__button}
          >
            <Text style={base.footer__buttonText}>{I18n.t('portfolios.createButton')}</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}

export default CreatePortfolio;
