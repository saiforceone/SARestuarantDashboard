import React from 'react';
import { TestInput } from './TestInput';

export default {
  title: 'TestInput',
  component: TestInput,
};

const Template = (args) => <TestInput {...args} />;
export const Main = Template.bind({});
