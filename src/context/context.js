/* import { createContext } from "react";

export default createContext(null); */

import React, { useState, useContext, createContext, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const checkCookie = async () => {
      let token = cookie.get("jwt");
      if (token) {
        setLoading(true);
        try {
          const tokenRes = await axios.post(
            process.env.REACT_APP_BACKEND + "valid",
            null,
            {
              headers: { "x-auth-token": token },
            }
          );

          if (tokenRes.data) {
            console.log(tokenRes.data);
            setUserData(tokenRes.data);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    checkCookie();
  }, [setUserData]);

  return (
    <AppContext.Provider value={{ loading, userData, setUserData, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
