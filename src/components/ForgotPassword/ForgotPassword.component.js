import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Loading, Spacer } from 'src/components/Base';
import Messages from 'src/components/Messages/Messages.component';
import Lead from 'src/components/Lead/Lead.component';

import { base } from 'src/styles';

class ForgotPassword extends React.Component {
  static propTypes = {
    auth: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    auth: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.auth && props.auth.email) ? props.auth.email : '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => Actions.login())
      // .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const { loading, error } = this.props;

    // Loading
    if (loading) return <Loading />;

    return (
      <Container>
        <Content padder style={base.contentContainer}>
          <Lead
            title="Reset your Password"
            content="No stress, no stress. We'll get you back into your account."
          />

          {
            !!error &&
            <Messages message={error} />
          }

          <Form>
            <Item stackedLabel>
              <Label>Email</Label>
              <Input
                autoCapitalize="none"
                value={this.state.email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Spacer size={20} />

            <Button block onPress={this.handleSubmit}><Text>Reset Password</Text></Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default ForgotPassword;
