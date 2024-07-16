import { useEffect, useReducer, createContext } from 'react';

const initialState = { state: null };
export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  };
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: user
      })
    };
  }, []);

  const updateUser = (updatedUser) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: updatedUser
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, updateUser }}>
      { children }
    </AuthContext.Provider>
  )
};