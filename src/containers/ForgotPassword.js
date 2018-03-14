import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ForgotPassword = ({
  Layout,
  onFormSubmit,
  auth,
  isLoading,
  errorMessage,
}) => (
  <Layout
    auth={auth}
    loading={isLoading}
    error={errorMessage}
    onFormSubmit={onFormSubmit}
  />
);

ForgotPassword.propTypes = {
  Layout: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

ForgotPassword.defaultProps = {
  errorMessage: null,
};

const mapStateToProps = state => ({
  auth: state.auth || {},
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
