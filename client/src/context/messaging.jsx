import React, { createContext, useReducer, useContext } from "react";
const MessagingStateContext = createContext();
const MessagingDispatchContext = createContext();
let recipient;

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return {
        // When action is initiated, it responds with the person you're recipient's details
        // Put the data into a state
        ...state,
        recipient: action.payload,
      };
    default:
      throw new Error(`Unknown action type:  ${action.type}`);
  }
};

export const MessagingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { recipient });

  return (
    <MessagingDispatchContext.Provider value={dispatch}>
      <MessagingStateContext.Provider value={state}>
        {children}
      </MessagingStateContext.Provider>
    </MessagingDispatchContext.Provider>
  );
};

export const useMessagingState = () => useContext(MessagingStateContext);
export const useMessagingDispatch = () => useContext(MessagingDispatchContext);
