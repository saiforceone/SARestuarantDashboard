import React from 'react';
import { ItemCard } from './ItemCard';

export default {
  title: 'Common/ItemCard',
  component: ItemCard,
};

const Template = (args) => <ItemCard {...args} />;
export const Main = Template.bind({});