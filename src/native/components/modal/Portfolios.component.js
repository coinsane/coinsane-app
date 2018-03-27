import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar } from 'react-native';
import { Header, Left, Right, Title, Body, Container, Content, Text, List, ListItem, Button, Footer } from 'native-base';
import Spacer from '../Spacer/Spacer.component';
import Icon from '../Icon/Icon.component';
import { Actions } from 'react-native-router-flux';
import Modal from './BaseModal.component';
import styles from './Portfolios.styles';
import { colors, base } from '../../styles';

const PortfoliosModal = ({
  portfolios,
  selectPortfolio,
  selected
}) => {
  return (
    <Modal hideClose>
      <Container>
        <Header style={styles.headerContainer}>
          <StatusBar barStyle="light-content"/>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name='Back' width={28} fill={colors.white} />
            </Button>
          </Left>
          <Body>
            <Title>{'Choose portfolio'}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content padder style={{ backgroundColor: colors.bgGray }}>

          <Spacer size={30} />
          <List>
            <ListItem
              button
              style={styles.listItem}
              onPress={() => {
                selectPortfolio(null);
                Actions.pop();
              }}
            >
              <Text style={styles.listItem__text}>All portfolios</Text>
            </ListItem>
            {portfolios.map(portfolio => (
              <ListItem
                key={portfolio._id}
                button
                style={styles.listItem__portfolio}
                onPress={() => { this.props.selectAction(portfolio) }}
              >
                <Text style={styles.listItem__text}>{portfolio.title}</Text>
              </ListItem>
            ))}
          </List>
        </Content>
        <Footer style={base.footer}>
          <Button
            small
            bordered
            full
            onPress={() => {
              Actions.pop();
              Actions.createPortfolio();
            }}
            style={base.footer__button}
          >
            <Text style={base.footer__buttonText}>+ ADD NEW PORTFOLIO</Text>
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
