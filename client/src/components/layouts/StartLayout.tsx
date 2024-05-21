import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';
import Header from '../common/Header';
import { center, columnCenter } from '../../styles/flex';
import { ComponentProps } from '../../types/utils/ComponentProps';

export interface Props extends ComponentProps<'div'> {
  header?: boolean;
  backBtn?: boolean;
}

const StartLayout: React.FC<Props> = ({ children, css, header = true, backBtn = false }) => (
  <div css={{ minHeight: '100vh', ...center, ...css }}>
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
