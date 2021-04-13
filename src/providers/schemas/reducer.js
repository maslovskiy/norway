export const initialState = {
  data: [],
  filterValue: "ALLE_SKJEMAER",
  searchValue: "",
  types: {
    ALLE_SKJEMAER: "Alle Skjemaer"
  }
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILTER_VALUE':
      return {
        ...state,
        filterValue: action.value,
      };
    case 'SET_SCHEMAS':
      const result = action.data.map(value => {
        return ({
          ...value,
          attributes: value.attributes.reduce((obj, item) => Object.assign(obj, item), {})
        })
      })
      return {
        ...state,
        data: result,
      };
    case 'SET_SCHEMAS_TYPES':
      const types = action.data.reduce((obj, item) => Object.assign(obj, item), {});
      return {
        ...state,
        types: {
          ...state.types,
          ...types
        }
      };
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.value,
      };
    default:
      throw new Error();
  }
}