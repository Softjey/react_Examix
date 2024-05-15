import { CSSObject } from '@emotion/react';
import { ComponentPropsWithoutRef, ElementType } from 'react';

interface CssProps {
  css?: CSSObject;
}

export type ComponentProps<T extends ElementType> = ComponentPropsWithoutRef<T> & CssProps;
