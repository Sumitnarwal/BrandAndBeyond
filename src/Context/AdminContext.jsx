


import { createContext, useState } from "react";
export const AdminContext=createContext();

export const AdminAuthProvider=({children})=>{
  
const [auth,setAuth]=useState(false)

    const  handleAuthAdmin=()=>{
    
    setAuth(true)
  }
  console.log(children)
    return <AdminContext.Provider value={{auth,handleAuthAdmin}}>

  {children}
    </AdminContext.Provider>
}

 
