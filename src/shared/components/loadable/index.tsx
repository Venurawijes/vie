import { ComponentType, LazyExoticComponent, PropsWithoutRef, Suspense } from 'react';

import Loader from '../loader';

const Loadable =
  <T extends object>(Component: LazyExoticComponent<ComponentType<T>>) =>
  (props: PropsWithoutRef<T>) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
