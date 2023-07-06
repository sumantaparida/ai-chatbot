import type { ReactNode } from 'react';

import Header from '@/components/Header';

type IMainProps = {
  meta?: ReactNode;
  children?: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="flex w-full flex-col">
    {props.meta}
    <div className="">
      <Header />
      <main className="text-xl">{props.children}</main>
    </div>
  </div>
);

export { Main };
