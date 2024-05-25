import React from 'react';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';

interface Props extends HomeLayoutProps {}

const TestPage: React.FC<Props> = ({ ...rest }) => {
  return <HomeLayout {...rest}>Test Page</HomeLayout>;
};

export default TestPage;
