import React, { createContext, useContext, useState, useEffect } from 'react';
import { Router } from '@routo/core';

export const context = createContext(null);

export const Provider = ({ router, children }) => (
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
