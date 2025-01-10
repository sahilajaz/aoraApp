import React, { createContext, Dispatch,  SetStateAction, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../lib/appwrite";
import { Models } from "react-native-appwrite";

interface ContextType {
  isLogged: boolean,
  setIsLogged : Dispatch<SetStateAction<boolean>>,
  user: Models.Document | null,
  setUser: Dispatch<SetStateAction<Models.Document | null>>;
  loading: boolean
}

interface ChildrenType {
  children: React.ReactNode
}

const GlobalContext = createContext<ContextType | null>(null)

export const useGlobalContext = (): ContextType => {
  const context = useContext(GlobalContext)
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}

const GlobalProvider  = ({ children } : ChildrenType ) => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState<Models.Document | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrentUser()
      .then((res : any) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;