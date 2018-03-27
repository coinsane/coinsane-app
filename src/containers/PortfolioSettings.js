import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updatePortfolio, removePortfolio } from '../redux/state/portfolios/portfolios.actioncreators';

class PortolioSettings extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    portfolios: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    updatePortfolio: PropTypes.func.isRequired,
    removePortfolio: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  render = () => {
    const { Layout, portfolios, updatePortfolio, removePortfolio } = this.props;

    return (
      <Layout
        portfolios={portfolios.list}
        updatePortfolio={updatePortfolio}
        removePortfolio={removePortfolio}
      />
    );
  }
}

const mapStateToProps = state => {
  // console.log('portfolioSettings mapStateToProps', state)
  return {
    portfolios: state.portfolios || {},
  };
};

const mapDispatchToProps = {
  updatePortfolio,
  removePortfolio
};

export default connect(mapStateToProps, mapDispatchToProps)(PortolioSettings);
