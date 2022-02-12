import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import {
  ArrowLeftCircleFill as ArrowLeftIcon
} from 'react-bootstrap-icons';

/**
 * @function PageHeader
 * @param {Object} props 
 * @returns {JSX.Element}
 * @description Renders a reusable page header component
 */
const PageHeader = props => {
  const {backButtonAction, heading, subheading, actionsContainer} = props;

  return (
    <Card className='mb-4'>
      <Card.Body>
        <div className='d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            {backButtonAction && (
              <Button className='me-4' onClick={backButtonAction}>
                <ArrowLeftIcon />
              </Button>
            )}
            <div>
              <h2>{heading}</h2>
              {subheading && (
                <small><strong>{subheading}</strong></small>
              )}
            </div>
          </div>
          {actionsContainer && (
            <div className='d-flex'>
              {actionsContainer}
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

PageHeader.propTypes = {
  /**
   * `heading` The text shown as the main heading
   */
  heading: PropTypes.string.isRequired,
  /**
   * `subheading` Optional subheading shown below the heading
   */
  subheading: PropTypes.string,
  /**
   * `actionsContainer` Optional actions container for things like buttons, etc
   */
  actionsContainer: PropTypes.element,
  /**
   * `backButtonAction` Optional back button function to navigate to previous page
   */
  backButtonAction: PropTypes.func,
}

export default PageHeader;
