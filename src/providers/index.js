import React, { createContext } from 'react';
import ErrorProvider from './error';
import UserProvider from './user';
export const AppContext = createContext({});

export default ({ children }) => (
  <AppContext.Provider value={{}}>
    <ErrorProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ErrorProvider>
  </AppContext.Provider>
)