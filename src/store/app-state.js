import React, { useContext, createContext, useReducer } from "react";

const Context = createContext();

export function useAppState() {
  return useContext(Context);
}

export default function AppStateProvider({ reducer, initialState = {}, children }) {
  const value = useReducer(reducer, initialState);
  return <Context.Provider value={value} children={children} />;
}
