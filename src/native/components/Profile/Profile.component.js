import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar, View } from 'react-native';
import { Header, Button, Title, Right, Container, Content, List, ListItem, Body, Left, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Lead from '../Lead/Lead.component';
import Icon from '../Icon/Icon.component';

import { colors, base } from '../../styles';

const Profile = ({ member, logout, drawer }) => (
  <Container>
    <Header style={base.headerContainer}>
      <StatusBar barStyle="light-content"/>
      <Left>
        <Button transparent onPress={() => drawer.open()}>
          <Icon name='Menu' width={28} fill={colors.white} />
        </Button>
      </Left>
      <Body>
        <Title>Settings</Title>
      </Body>
      <Right>
      </Right>
    </Header>
    <Content style={base.contentContainer}>
      <List>
        {(member && member.email) ?
          <View>
            <Content padder>
              <Lead
                title={`Hi ${member.firstName},`}
                content={`You are currently logged in as ${member.email}`}
              />
            </Content>

            <ListItem onPress={Actions.updateProfile} icon>
              <Left>
                {/* <Icon name="person-add" /> */}
              </Left>
              <Body>
                <Text>Update My Profile</Text>
              </Body>
            </ListItem>
            <ListItem onPress={logout} icon>
              <Left>
                {/* <Icon name="power" /> */}
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
            </ListItem>
          </View>
        :
          <View>
            <Content padder>
              <Lead
                title="Hi there,"
                content="Please login to gain extra access"
              />
            </Content>

            <ListItem onPress={Actions.login} icon>
              <Left>
                {/* <Icon name="power" /> */}
              </Left>
              <Body>
                <Text>Login</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.signUp} icon>
              <Left>
                {/* <Icon name="add-circle" /> */}
              </Left>
              <Body>
                <Text>Sign Up</Text>
              </Body>
            </ListItem>
            <ListItem onPress={Actions.forgotPassword} icon>
              <Left>
                {/* <Icon name="help-buoy" /> */}
              </Left>
              <Body>
                <Text>Forgot Password</Text>
              </Body>
            </ListItem>
          </View>
        }
      </List>
    </Content>
  </Container>
);

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
  drawer: PropTypes.shape({}),
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
