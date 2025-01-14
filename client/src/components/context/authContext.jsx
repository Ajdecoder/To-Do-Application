import { createContext, useState } from "react";

const authContext = createContext();

 export const CrudAuthContext = ({ children }) => {
  const [loggedinUser, setLoggedInuser] = useState(() => {
    return Boolean(localStorage.getItem("accessToken"));
});

 const LogoutUser = () => {
    setLoggedInuser(false);
    localStorage.removeItem("accessToken");
  };

  return (
    <authContext.Provider value={{ loggedinUser, setLoggedInuser,LogoutUser }}>
      {children}
    </authContext.Provider>
  );
};

export { authContext };
