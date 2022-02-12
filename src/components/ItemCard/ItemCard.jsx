import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/**
 * @function ItemCard
 * @param {Object} props 
 * @returns {JSX.Element}
 * @description Renders a generic card for list items
 */
const ItemCard = props => {
  
  const {imageUrl, title, subtitle, extraContent, cardActions} = props;
  
  return (
    <Card className='mb-2' style={{ width: '100%' }}>
      <Card.Body>
        <div className='d-flex align-items-center'>
          {imageUrl && (
            <div className='me-3' style={{maxWidth: '120px'}}>
              <img 
                alt={`item-image-${title}`}
                className='rounded img-fluid me-2'
                src={imageUrl}
                style={{objectFit: 'cover', height: '120px', width: '120px'}}
              />
            </div>
          )}
          <div className='flex-fill'>
            <Card.Title>{title}</Card.Title>
            {subtitle ? (
              <Card.Text>{subtitle}</Card.Text>
            ) : undefined}
            {extraContent && (
              <div className='d-flex flex-fill'>
                {extraContent}
              </div>
            )}
          </div>
          {cardActions && (
            <div className='d-flex ms-2'>
              {cardActions}
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

ItemCard.propTypes = {
  /**
   * `imageUrl` Optional image for the card
   */
  imageUrl: PropTypes.string,
  /**
   * `title` The title of the card (required)
   */
  title: PropTypes.string.isRequired,
  /**
   * `subtitle`: Optional text that will be shown below the title 
   */
  subtitle: PropTypes.string,
  /**
   * `extraContent`: Optional extra content that can be used to show extra information
   */
  extraContent: PropTypes.element,
  /**
   * `cardActions`: Optional container for actions like buttons that trigger certain actions
   */
  cardActions: PropTypes.element,
};

ItemCard.defaultProps = {
  title: 'Card Item',
  subtitle: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam',
}

export {
  ItemCard
};
