import { createContext } from "react";

export const AuthContext = createContext({
  userData: null,
  artistData: null,
  userLogIn: () => {},
  userLogOut: () => {},
  artistLogIn: () => {},
  artistLogOut: () => {},
}) 
