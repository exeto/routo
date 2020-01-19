import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Router } from '@routo/core';

export const context = createContext(null);

type ProviderProps = {
  router: Router;
  children?: ReactNode;
};

export const Provider = ({ router, children }: ProviderProps) => (
  <context.Provider value={router}>{children}</context.Provider>
);

export const useRouter = (): Router => useContext(context);

export const useRouterState = () => {
  const router = useRouter();
  const [state, setState] = useState(router.getState());

  useEffect(() => {
    const unsubscribe = router.subscribe(setState);

    return unsubscribe;
  }, [router]);

  return state;
};
