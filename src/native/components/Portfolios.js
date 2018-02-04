import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, List, ListItem, Button } from 'native-base';
import Spacer from './Spacer';
import Header from './Header';
import { Actions } from 'react-native-router-flux';

const Portfolios = ({
  portfolios,
  selectPortfolio,
  selected,
  addPortfolio
}) => {
  return (
    <Container>
      <Content padder style={{ backgroundColor: '#232033' }}>
        <Header
          title="Select portfolio"
        />
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
