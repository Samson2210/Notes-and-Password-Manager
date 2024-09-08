import { useState, createContext, useContext, useCallback } from "react";
import host from "../../Utility";

const ValidateContext = createContext();

const ValidateState = (props) => {
    const [theme, setTheme] = useState('light');
    const getValidationToken = useCallback(async () => {
        const response = await fetch(`${host}/api/user/getvalidationtoken`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const { salt, validationToken } = await response.json();
        sessionStorage.setItem("salt", salt);
        sessionStorage.setItem("validationToken", validationToken);
    })  

    return(
        <ValidateContext.Provider value={{getValidationToken,theme}}>
            {props.children}
        </ValidateContext.Provider>
    )
}

export default ValidateState;

export const useValidate  = ()=>{
    return useContext(ValidateContext)
}