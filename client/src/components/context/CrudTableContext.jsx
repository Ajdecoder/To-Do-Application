import React, { createContext, useState } from "react";

const AdminContext = createContext();

export const CrudTableContext = ({ children }) => {

  const [edittableRights, seteditableRights] = useState(false);

  return (
    <AdminContext.Provider value={{ edittableRights, seteditableRights }}>
      {children}
    </AdminContext.Provider>
  )
};

export { AdminContext };
