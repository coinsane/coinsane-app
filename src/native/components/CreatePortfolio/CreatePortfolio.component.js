import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import Switch from 'react-native-switch-pro';
import { Container, Content, Text, Footer, Button, Form, Item, Label, Input, View, Title } from 'native-base';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';

import styles from './CreatePortfolio.styles';
import { base } from '../../styles';
import I18n from "../../../i18n";

class CreatePortfolio extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    addPortfolio: PropTypes.func.isRequired,
    selectPortfolio: PropTypes.func.isRequired,
  };

  static defaultProps = {
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
    const { addPortfolio, selectPortfolio, list } = this.props;
    addPortfolio(this.state)
      .then(action => selectPortfolio(action.data._id))
      .then(Actions.pop)
      // .catch(e => console.log(`Error: ${e}`));
  };


  render() {
    return (
      <Container>
        <CoinsaneHeader
          leftIcon="Back"
          title={<Title>Add new portfolio</Title>}
        />
        <Content padder style={base.contentContainer}>
          <Text style={styles.content__text}>{'Basic'.toUpperCase()}</Text>
          <Form>
            <Item stackedLabel style={base.form__titleContainer}>
              <Label style={base.form__titleLabel}>Portfolio title</Label>
              <Input
                autoFocus
                onChangeText={v => this.handleChange('title', v)}
                value={this.state.title}
                style={base.form__titleInput}
              />
            </Item>
            <View style={{paddingBottom: 24, paddingTop: 24, borderBottomColor: '#2F2A40', borderBottomWidth: 1, flexDirection: 'row'}}>
              <Text style={{flex: 0.8, color: '#fff', fontFamily: 'Lato-Regular', fontSize: 17}}>Calculate amount on total</Text>
              <View style={{flex: 0.2}}>
                <Switch
                  onSyncPress={() => this.handleChange('inTotal', !this.state.inTotal)}
                  defaultValue={this.state.inTotal}
                  backgroundActive={'#31E981'}
                  backgroundInactive={'#2C263F'}
                  circleColorInactive={'#8D8A96'}
                  width={44}
                  height={23}
                  circleStyle={{ width: 18, height: 18 }}
                  style={{padding: 3, marginLeft: 'auto'}}
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
