/* eslint-disable tailwindcss/no-custom-classname */
import type { ReactNode } from 'react';

import HeaderWrapper from './style';

type HeaderProps = {
  children?: ReactNode;
};

const Header = (props: HeaderProps) => {
  return <HeaderWrapper className="bg-gray-900">{props.children}</HeaderWrapper>;
};

export default Header;
