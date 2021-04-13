import {useContext} from 'react';
import {SchemasContext} from "./index";

export const useSchemas = () => {
  const {
    schemas,
    setFilterValue,
    setSearchValue,
    filterValue,
    searchValue,
    setSchemas,
    setSchemasTypes,
    types
  } = useContext(SchemasContext);
  return {
    schemas,
    setFilterValue,
    setSearchValue,
    filterValue,
    searchValue,
    setSchemas,
    setSchemasTypes,
    types
  };
};