import React, {createContext, useMemo, useReducer} from 'react';
import {reducer, initialState} from './reducer';

export const SchemasContext = createContext({});

export default function SchemasProvider({children}) {

  const [schemas, dispatch] = useReducer(reducer, initialState);
  const setFilterValue = value => dispatch({type: 'SET_FILTER_VALUE', value});
  const setSearchValue = value => dispatch({type: 'SET_SEARCH_VALUE', value});
  const setSchemas = data => dispatch({type: 'SET_SCHEMAS', data});
  const setSchemasTypes = data => dispatch({type: 'SET_SCHEMAS_TYPES', data});

  const result = useMemo(() => {
    const {filterValue, searchValue, data} = schemas;
    return data.filter(({attributes, name}) => {
      if (filterValue === "ALLE_SKJEMAER" && searchValue.trim().length === 0) {
        return true
      } else if (filterValue !== "ALLE_SKJEMAER" && searchValue.trim().length === 0) {
        return attributes[filterValue]
      } else if (searchValue.trim().length !== 0 && filterValue === "ALLE_SKJEMAER") {
        return name.toLowerCase().includes(searchValue.toLowerCase())
      } else {
        return attributes[filterValue] && name.toLowerCase().includes(searchValue.toLowerCase());
      }
    });
  }, [schemas]);

  return (
    <SchemasContext.Provider
      value={{
        schemas: result,
        searchValue: schemas.searchValue,
        filterValue: schemas.filterValue,
        types: schemas.types,
        setFilterValue,
        setSearchValue,
        setSchemas,
        setSchemasTypes
      }}
    >
      {children}
    </SchemasContext.Provider>
  )
};