import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Login = ({
  Layout,
  onFormSubmit,
  auth,
  isLoading,
  infoMessage,
  errorMessage,
  successMessage,
}) => (
  <Layout
    auth={auth}
    loading={isLoading}
    info={infoMessage}
    error={errorMessage}
    success={successMessage}
    onFormSubmit={onFormSubmit}
  />
);

Login.propTypes = {
  Layout: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  infoMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

Login.defaultProps = {
  infoMessage: null,
  errorMessage: null,
  successMessage: null,
};

const mapStateToProps = state => ({
  auth: state.auth || {},
  isLoading: state.status.loading || false,
  infoMessage: state.status.info || null,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
