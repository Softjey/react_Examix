import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => children;

export default Layout;
