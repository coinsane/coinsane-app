import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UpdateProfile = ({
  Layout,
  onFormSubmit,
  auth,
  isLoading,
  errorMessage,
  successMessage,
}) => (
  <Layout
    auth={auth}
    loading={isLoading}
    error={errorMessage}
    success={successMessage}
    onFormSubmit={onFormSubmit}
  />
);

UpdateProfile.propTypes = {
  Layout: PropTypes.func.isRequired,
  auth: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

UpdateProfile.defaultProps = {
  errorMessage: null,
  successMessage: null,
};

const mapStateToProps = state => ({
  auth: state.auth || {},
  isLoading: state.status.loading || false,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
