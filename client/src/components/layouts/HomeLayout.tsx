import React, { ComponentPropsWithRef } from 'react';
import { Menu } from '../menu/Menu';

export interface Props extends ComponentPropsWithRef<'div'> {}

const HomeLayout: React.FC<Props> = ({ children, ...rest }) => (
  <div {...rest}>
    <Menu />
    {children}
  </div>
);

export default HomeLayout;
