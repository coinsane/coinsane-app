import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Body, Text } from 'native-base';
import Spacer from '../Spacer';

const PortfolioHeader = ({ show, title }) => {
  if (!show) return <Spacer size={0} />;
  return (
    <ListItem style={{ marginLeft: 0, marginRight: 0, backgroundColor: 'transparent', borderBottomWidth: 0, marginBottom: 6 }}>
      <Body>
        <Text style={{ marginLeft: 0, marginRight: 0, fontSize: 16 }}>{title}</Text>
      </Body>
    </ListItem>
  );
};

PortfolioHeader.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
};

PortfolioHeader.defaultProps = {
  show: null,
};

export default PortfolioHeader;
