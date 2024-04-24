import {  useContext} from "react";
import { createContext } from "react";
import Register from "./Register";
import Header from "./Header";
import { useState, useEffect } from "react";


const contextCreate = createContext();



export  const UserProvider = ({ children }) => {

    const [formData, setFormData] = useState({username:" ",email:" ", userId: " "});

    useEffect(
    ()=>{
        console.log(formData);
    },[formData]
    )
    return(
        <contextCreate.Provider value={[formData, setFormData]}>
            {children}
        </contextCreate.Provider>
    )


}

export default contextCreate;