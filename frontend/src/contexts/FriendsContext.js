import { createContext, useReducer } from "react";

const initialState = { fried: null };

export const FriendsContext = createContext();

export const friendsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FRIEND':
      return {
        friends: action.payload
      }
    case 'ADD_FRIEND':
      return {
        friends: [action.payload, ...state.friend]
      }
    case 'DELETE_FRIEND':
      return {
        friends: state.friends.filter((friend) => friend.username !== action.payload.username)
      }
    default:
      return state
  }
};

export const FriendsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(friendsReducer, initialState);

  return (
    <FriendsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FriendsContext.Provider>
  )
}