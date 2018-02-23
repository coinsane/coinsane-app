import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Header, Left, Right, Title, Body, Container, Content, Text, List, ListItem, Button, Footer } from 'native-base';
import Spacer from '../Spacer';
import Icon from '../Icon';
import { Actions } from 'react-native-router-flux';
import Modal from './BaseModal';

const PortfoliosModal = ({
  portfolios,
  selectPortfolio,
  selected
}) => {
  return (
    <Modal hideClose>
      <Container>
        <Header style={{ backgroundColor: '#1B152D', borderBottomWidth: 0 }}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='Back' width={28} fill={'#fff'} />
            </Button>
          </Left>
          <Body>
            <Title>{'Choose portfolio'}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder style={{ backgroundColor: '#1B152D' }}>

          <Spacer size={30} />
          <List>
            <ListItem
              button
              style={{ paddingBottom: 25, marginLeft: 0 }}
              onPress={() => {
                selectPortfolio(null);
                Actions.pop();
              }}
            >
              <Text style={{ fontSize: 17, fontFamily: 'Lato-Regular' }}>All portfolios</Text>
            </ListItem>
            {portfolios.map(portfolio => (
              <ListItem
                key={portfolio.id}
                button
                style={{ borderTopWidth: 1, borderTopColor: '#2F2A40', paddingTop: 25, paddingBottom: 25, marginLeft: 0 }}
                onPress={() => {
                  selectPortfolio(portfolio.id);
                  Actions.pop();
                }}
              >
                <Text style={{ fontSize: 17, fontFamily: 'Lato-Regular' }}>{portfolio.title}</Text>
              </ListItem>
            ))}
          </List>
        </Content>
        <Footer style={{ backgroundColor: '#1B152D', marginBottom: 15, paddingBottom: 15, borderTopWidth: 0 }}>
          <Button small full
            onPress={() => {
              Actions.pop();
              Actions.createPortfolio();
            }}
            style={{ flex: 1, backgroundColor: '#282239', borderRadius: 5, marginTop: 15, marginBottom: 15, paddingTop: 25, paddingBottom: 15, marginLeft: 15, marginRight: 15 }}>
            <Text style={{ color: '#8D8A96', fontFamily: 'Lato-Medium' }}>+ ADD NEW PORTFOLIO</Text>
          </Button>
        </Footer>
      </Container>
    </Modal>
  );
};

PortfoliosModal.propTypes = {
  selected: PropTypes.string,
  selectPortfolio: PropTypes.func.isRequired,
  portfolios: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

PortfoliosModal.defaultProps = {
};

export default PortfoliosModal;
