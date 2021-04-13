export const initialState = {
  username: '',
  email: '',
  id: '',
  avatar: '',
  loggedIn: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        loggedIn: true,
        ...action.user,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        ...action.data,
      };

    case 'DELETE_USER':
      return {
        ...state,
        ...initialState,
        loggedIn: false,
      };
    default:
      throw new Error();
  }
}