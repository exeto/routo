import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Router } from '@routo/core';

export const Context = createContext<Router | null>(null);

type Props = {
  router: Router;
  children?: ReactNode;
};

export const Provider = ({ router, children }: Props) => (
  <Context.Provider value={router}>{children}</Context.Provider>
);

export const useRouter = (): Router => {
  const router = useContext(Context);

  if (!router) {
    throw new Error(
      'Could not find @routo/react context value; please ensure the component is wrapped in a <Provider>',
    );
  }

  return router;
};

export const useRouterState = () => {
  const router = useRouter();
  const [state, setState] = useState(router.getState());

  useEffect(() => {
    const unsubscribe = router.subscribe(setState);

    return unsubscribe;
  }, [router]);

  return state;
};
