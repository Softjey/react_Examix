import React from 'react';
import HomeLayout, { Props as HomeLayoutProps } from '../components/layouts/HomeLayout';

interface Props extends HomeLayoutProps {}

const HomePage: React.FC<Props> = ({ ...rest }) => {
  return <HomeLayout {...rest}>Home Page</HomeLayout>;
};

export default HomePage;
