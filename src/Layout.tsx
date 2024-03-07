import { CSSObject } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';

export interface Props {
  children: React.ReactNode;
  css?: CSSObject;
}

const Layout: React.FC<Props> = ({ children, css }) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      ...css,
    }}
  >
    {children}
  </div>
);

export default Layout;
