import { CSSObject } from '@emotion/react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import Header from './Header';
import { center, columnCenter } from '../styles/flex';

interface Props {
  children: React.ReactNode;
  style?: CSSObject;
  header?: boolean;
  backBtn?: boolean;
}

const StartLayout: React.FC<Props> = ({ children, style, header = true, backBtn = false }) => (
  <div css={{ minHeight: '100vh', ...center, ...style }}>
    <div
      css={{
        height: '300px',
        justifyContent: 'flex-start',
        gap: '20px',
        ...columnCenter,
      }}
    >
      {header && <Header disableBackBtn={!backBtn} />}
      {children}
    </div>
  </div>
);

export default StartLayout;