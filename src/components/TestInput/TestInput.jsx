import PropTypes from 'prop-types';
import React from 'react';

/**
 * This is a test component
 */
export const TestInput = ({disabled, ...props}) => {
  return (
    <div>
      <input disabled={disabled} {...props} />
    </div>
  );
};

TestInput.propTypes = {
  /**
   * Determines if the field is editable
   */
  disabled: PropTypes.bool,
};

TestInput.defaultProps = {
  disabled: false,
};
