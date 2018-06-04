import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, List, ListItem, Button, Footer, Title } from 'native-base';
import I18n from '../../../i18n';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import Modal from './BaseModal.component';
import styles from './Portfolios.styles';
import { base } from '../../styles';

const PortfoliosModal = ({
  portfolios,
  selectPortfolio,
}) => {
  return (
    <Modal hideClose>
      <Container>
        <CoinsaneHeader
          leftIcon="Back"
          title={<Title>{I18n.t('portfolios.titleChoose')}</Title>}
        />
        <Content style={base.contentContainer}>
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
            {Object.keys(portfolios).map(key => (
              <ListItem
                key={key}
                button
                style={styles.listItem__portfolio}
                onPress={() => {
                  selectPortfolio(key);
                  Actions.pop();
                }}
              >
                <Text style={styles.listItem__text}>{portfolios[key].title}</Text>
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
  portfolios: PropTypes.shape({}).isRequired,
  selectPortfolio: PropTypes.func.isRequired,
};

PortfoliosModal.defaultProps = {
};

export default PortfoliosModal;
