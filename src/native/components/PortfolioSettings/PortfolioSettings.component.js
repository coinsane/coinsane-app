import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Switch from 'react-native-switch-pro';
import { Container, Content, Text, Footer, Button, Form, Item, Label, Input, View, Title } from 'native-base';
import ErrorMessages from '../../../constants/errors';
import Error from '../Error/Error.component';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';

import styles from './PortfolioSettings.styles';
import { base } from '../../styles';

class PortfolioSettings extends Component {
  static propTypes = {
    error: PropTypes.string,
    portfolioId: PropTypes.string.isRequired,
    portfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    editPortfolio: PropTypes.func,
    selectPortfolio: PropTypes.func,
    removePortfolio: PropTypes.func,
  };

  static defaultProps = {
    error: null,
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
    const { portfolios, portfolioId } = this.props;
    return portfolioId && portfolios ? portfolios.find(item => item._id === portfolioId) : null;
  };

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  };

  handleSubmit = () => {
    this.props.editPortfolio(this.state)
      .then(() => Actions.pop())
      // .catch(e => console.log(`Error: ${e}`));
  };

  removePortfolioAlert = () => {
    Alert.alert(
      'Delete portfolio',
      'Are you sure?',
      [
        {
          text: 'Delete',
          onPress: () => {
            this.props.removePortfolio(this.state._id)
              .then(() => this.props.selectPortfolio())
              .then(Actions.pop)
              // .catch(e => console.log(`Error: ${e}`));
          },
          style: 'cancel'
        },
        {
          text: 'Cancel',
          onPress: () => {}
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    const {
      error,
      portfolios,
      portfolioId,
      editPortfolio,
      removePortfolio
    } = this.props;

    // Error
    if (error) return <Error content={error} />;

    // Get this Portfolio from all portfolios
    let portfolio = this.getPortfolio();

    // Portfolio not found
    if (!portfolio) return <Error content={ErrorMessages.portfolio404} />;

    return (
      <Container style={base.contentContainer}>
        <CoinsaneHeader
          leftIcon="Back"
          title={<Title>{portfolio.title}</Title>}
        />
        <Content style={styles.settings__container}>
          <Text style={styles.container__text}>{'Edit portfolio'.toUpperCase()}</Text>
          <Form>
            <Item stackedLabel style={base.form__titleContainer}>
              <Label style={base.form__titleLabel}>Portfolio title</Label>
              <Input
                onChangeText={v => this.handleChange('title', v)}
                value={this.state.title}
                style={base.form__titleInput}
              />
            </Item>
            <View style={{paddingBottom: 24, paddingTop: 24, borderBottomColor: '#2F2A40', borderBottomWidth: 1, flexDirection: 'row'}}>
              <Text style={{flex: .8, color: '#fff', fontFamily: 'Lato-Regular', fontSize: 17}}>Calculate amount on total</Text>
              <View style={{flex: .2}}>
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
          <Button style={styles.form__button} transparent onPress={() => this.removePortfolioAlert()}>
            <Text style={styles.form__buttonText}>Delete portfolio</Text>
          </Button>
        </Content>
        <Footer style={base.footer}>
          <Button
            small
            full
            onPress={() => this.handleSubmit()}
            style={styles.footer__button}
          >
            <Text style={base.footer__buttonText}>SAVE</Text>
          </Button>
        </Footer>
      </Container>
    );

  }
}

export default PortfolioSettings;
