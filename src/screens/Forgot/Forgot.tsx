import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { i18n } from 'src/services';

import Header from 'src/components/_Organisms/Header';
import { Logo } from 'src/components/Svg';
import CoinsaneIcon from 'src/components/_Atoms/CoinsaneIcon/CoinsaneIcon.component';

import { base, colors } from 'src/styles';

import styles from './Forgot.styles';

interface IState {
  email: string;
}

class Forgot extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name: string, val: string) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  };

  handleSubmit = () => {
    // this.props.onFormSubmit(this.state)
    //   .then(() => Actions.login())
    // // .catch(e => console.log(`Error: ${e}`));
  };

  render () {
    return (
      <Container>
        <Header
          leftIcon="Back"
          title=""
        />
        <Content scrollEnabled={false} style={base.contentContainer} contentContainerStyle={styles.content}>
          <View style={styles.body}>
            <Logo />
            <Text style={styles.headTitle}>{i18n.t('auth.forgot.title')}</Text>
            <Item style={styles.input}>
              <CoinsaneIcon name="Email" fill={colors.textGray} width={28} height={28} />
              <Input
                placeholder={i18n.t('auth.form.email')}
                placeholderTextColor={colors.textGray}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
                style={styles.inputText}
              />
            </Item>
            <Item style={styles.input}>
              <CoinsaneIcon name="Password" fill={colors.textGray} width={28} height={28} />
              <Input
                placeholder={i18n.t('auth.form.password')}
                placeholderTextColor={colors.textGray}
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
                style={styles.inputText}
              />
            </Item>
            <Text style={styles.link}>{i18n.t('auth.forgot.text')}</Text>
          </View>
          <View style={styles.footer}>
            <Button
              small
              full
              onPress={this.handleSubmit}
              style={base.action__button}
            >
              <Text style={base.footer__buttonText}>{i18n.t('auth.forgot.button')}</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Forgot;