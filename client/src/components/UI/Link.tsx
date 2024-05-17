import React from 'react';
import { Link as ReactLink, LinkProps, NavLink } from 'react-router-dom';
import { ExtendsComponentProps } from '../../types/ComponentProps';

export interface Props extends ExtendsComponentProps<LinkProps> {
  activeClassnames?: string[];
}
const Link: React.FC<Props> = ({ activeClassnames, className, children }) => {
  if (activeClassnames) {
    return (
      <NavLink
        to="/"
        className={({ isActive }: { isActive: boolean }) => {
          const classStr = className ?? '';

          return isActive ? `${activeClassnames.join(' ')} ${classStr}` : classStr;
        }}
      >
        {children}
      </NavLink>
    );
  }

  return <ReactLink to="/">{children}</ReactLink>;
};

export default Link;
