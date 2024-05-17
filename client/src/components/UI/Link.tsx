import React from 'react';
import { Link as ReactLink, LinkProps, NavLink } from 'react-router-dom';
import { ExtendsComponentProps } from '../../types/ComponentProps';

export interface Props extends ExtendsComponentProps<LinkProps> {
  activeClassnames?: string[];
}
const Link: React.FC<Props> = ({ activeClassnames, className, ...rest }) => {
  if (activeClassnames) {
    return (
      <NavLink
        className={({ isActive }: { isActive: boolean }) => {
          const classStr = className ?? '';

          return isActive ? `${activeClassnames.join(' ')} ${classStr}` : classStr;
        }}
        {...rest}
      />
    );
  }

  return <ReactLink {...rest} />;
};

export default Link;
