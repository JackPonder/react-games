import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useContext, createContext } from "react";

const userContext = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState();

  onAuthStateChanged(auth, user => {
    setUser(user);
  });

  return (
    <userContext.Provider value={{user}}>
      {props.children}
    </userContext.Provider>
  );
}

export function useUser() {
  return useContext(userContext);
}