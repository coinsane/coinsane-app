import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectPortfolio, addPortfolio } from '../redux/state/portfolios/portfolios.actioncreators';

class PortolioSettings extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    portfolios: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    selectPortfolio: PropTypes.func.isRequired,
    addPortfolio: PropTypes.func.isRequired,
  }

  static defaultProps = {
  }

  selectPortfolio = (portfolioId) => {
    return this.props.selectPortfolio(portfolioId);
  }

  addPortfolio = () => {
    const title = `Portfolio ${Math.random()}`;
    const newPortfolio = { title };
    return this.props.addPortfolio(newPortfolio);
  }

  render = () => {
    const { Layout, portfolios, selected } = this.props;

    return (
      <Layout
        portfolios={portfolios.list}
        selected={portfolios.selected}
        selectPortfolio={this.selectPortfolio}
        addPortfolio={this.addPortfolio}
      />
    );
  }
}

const mapStateToProps = state => {
  console.log('coins mapStateToProps', state)
  return {
    portfolios: state.portfolios || {},
  };
};

const mapDispatchToProps = {
  selectPortfolio,
  addPortfolio,
};

export default connect(mapStateToProps, mapDispatchToProps)(PortolioSettings);
