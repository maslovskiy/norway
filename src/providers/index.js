import React, {createContext} from 'react';
import SchemasProvider from './schemas';
import UserProvider from './user';

export const AppContext = createContext({});

export default ({children}) => (
  <AppContext.Provider value={{}}>
    <SchemasProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </SchemasProvider>
  </AppContext.Provider>
)