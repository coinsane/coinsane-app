import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Container, Content, Text, List, ListItem, Button, Footer, Title } from 'native-base';
import I18n from '../../../i18n';
import Spacer from '../Spacer/Spacer.component';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';
import Modal from './BaseModal.component';
import styles from './Portfolios.styles';
import { colors, base } from '../../styles';

const PortfoliosModal = ({
  list,
  selectPortfolio,
}) => {
  return (
    <Modal hideClose>
      <Container>
        <CoinsaneHeader
          leftIcon="Back"
          title={<Title>{I18n.t('portfolios.title')}</Title>}
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
            {list.map(portfolio => (
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
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectPortfolio: PropTypes.func.isRequired,
};

PortfoliosModal.defaultProps = {
};

export default PortfoliosModal;
