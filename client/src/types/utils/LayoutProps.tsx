import { Props as StartLayoutProps } from '../../components/layouts/StartLayout';
import { Props as HomeLayoutProps } from '../../components/layouts/HomeLayout';

type LayoutPropsUnion = HomeLayoutProps | StartLayoutProps;
type LayoutType<LayoutProps extends LayoutPropsUnion, Name extends string> = LayoutProps & {
  layout?: Name;
};

type HomeProps = LayoutType<HomeLayoutProps, 'home'>;
type StartProps = LayoutType<StartLayoutProps, 'start'>;

export type LayoutProps = HomeProps | StartProps;
