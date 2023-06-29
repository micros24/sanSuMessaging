import React, { createContext, useReducer, useContext } from "react";
import jwtDecode from "jwt-decode";
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();
const token = localStorage.getItem("token");
let user;

if(token) {
    const decodedToken = jwtDecode(token);
    const expiresAt = new Date(decodedToken.exp * 1000);

    if(new Date() > expiresAt) {
        localStorage.removeItem("token");
    } else {
        user = decodedToken;
    }
}

const authReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN": 
            localStorage.setItem("token", action.payload.token);
            return {
                // When action is initiated, it responds with the user's data
                // Put the data into a state
                ...state,
                user: action.payload
            };
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                // Set user to null
                user: null
            };
        case "EDITED_USER":
            return {
                ...state,
                user: action.payload
            }
        default:
            throw new Error(`Unknown action type:  ${action.type}`);
    }
};

// children is the js markup
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user })

    return (
        <AuthDispatchContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                {children}
            </AuthStateContext.Provider>
        </AuthDispatchContext.Provider>
    )
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);