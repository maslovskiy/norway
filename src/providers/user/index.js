import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer';
export const UserContext = createContext({});

export default function UserProvider({ children }) {

  const [user, dispatch] = useReducer(reducer, initialState);
  const setUser = user => dispatch({ type: 'SET_USER', user });
  const deleteUser = () => dispatch({ type: 'DELETE_USER' });
  const updateUser = data => dispatch({ type: 'UPDATE_USER', data });

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        deleteUser,
        updateUser
      }}
    >
      {children}
    </UserContext.Provider>
  )
};