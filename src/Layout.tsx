// import { CSSObject } from '@emotion/react';
import { CSSObject } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';

interface Props {
  children: React.ReactNode;
  style?: CSSObject;
}

const Layout: React.FC<Props> = ({ children, style }) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      ...style,
    }}
  >
    {children}
  </div>
);

export default Layout;
