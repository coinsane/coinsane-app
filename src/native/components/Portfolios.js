import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Header, Left, Right, Title, Body, Container, Content, Text, List, ListItem, Button } from 'native-base';
import Spacer from './Spacer';
import Icon from './Icon';
import { Actions } from 'react-native-router-flux';

const Portfolios = ({
  portfolios,
  selectPortfolio,
  selected,
  addPortfolio
}) => {
  return (
    <Container>
      <Header style={{ backgroundColor: '#1B152D', borderBottomWidth: 0 }}>
        <Left>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name='Menu' height='20' width='20' />
          </Button>
        </Left>
        <Body>
          <Title>{'Select portfolio'}</Title>
        </Body>
        <Right>
        </Right>
      </Header>
      <Content padder style={{ backgroundColor: '#1B152D' }}>

        <Spacer size={30} />
        <List>
          <ListItem button onPress={() => {
            selectPortfolio(null);
            Actions.pop();
          }}>
            <Text>All portfolios</Text>
          </ListItem>
          {portfolios.map(portfolio => (
            <ListItem key={portfolio.id} button onPress={() => {
              selectPortfolio(portfolio.id);
              Actions.pop();
            }}>
              <Text>{portfolio.title}</Text>
            </ListItem>
          ))}
        </List>
        <Button block onPress={() => addPortfolio()}>
          <Text>Create Portfolio</Text>
        </Button>
      </Content>
    </Container>
  );
};

Portfolios.propTypes = {
  selected: PropTypes.string,
  selectPortfolio: PropTypes.func.isRequired,
  portfolios: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  addPortfolio: PropTypes.func.isRequired,
};

Portfolios.defaultProps = {
};

export default Portfolios;
