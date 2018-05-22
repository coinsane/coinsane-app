import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, List, ListItem, Button, Footer } from 'native-base';
import I18n from '../../../i18n';
import Spacer from '../Spacer/Spacer.component';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import Modal from './BaseModal.component';
import styles from './Portfolios.styles';
import { colors, base } from '../../styles';

const PortfoliosModal = ({
  portfolios,
  selectPortfolio,
}) => {
  return (
    <Modal hideClose>
      <Container>
        <CoinsaneHeader
          leftIcon="Back"
          title={<Text>{I18n.t('portfolios.title')}</Text>}
        />
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
              <Text style={styles.listItem__text}>{I18n.t('portfolios.all')}</Text>
            </ListItem>
            {portfolios.map(portfolio => (
              <ListItem
                key={portfolio._id}
                button
                style={styles.listItem__portfolio}
                onPress={() => {
                  selectPortfolio(portfolio._id);
                  Actions.pop();
                }}
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
            <Text style={base.footer__buttonText}>{I18n.t('portfolios.addButton')}</Text>
          </Button>
        </Footer>
      </Container>
    </Modal>
  );
};

PortfoliosModal.propTypes = {
  selectPortfolio: PropTypes.func.isRequired,
  portfolios: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

PortfoliosModal.defaultProps = {
};

export default PortfoliosModal;
