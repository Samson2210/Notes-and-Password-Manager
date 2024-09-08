import { createContext, useContext, useState,useCallback } from "react";
import host from "../../Utility";
const AuthContext = createContext();
import CryptoJS from "crypto-js";

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthState = (props) => {
    const [user, setUser] = useState();
    const [salt, setSalt] = useState();
    const [validationToken, setValidationToken] = useState();

    const login = useCallback(async(username, password) => {
        const response = await fetch(`${host}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
        });

        try{
        const status = await response.status;
        const json = await response.json();
        if (status==200) {
            setUser(username);
            setSalt(json.salt);
            setValidationToken(json.validationToken);
            console.log("User authenticated")
            localStorage.setItem('token', json.jwtToken);            
            return true;
        }
        else {
            return false;
        }
        }
        catch{
            return false;
        }
    },[]);

    const logout = () => {
        localStorage.removeItem('token');
        sessionStorage.clear();
        setUser(null);
    };

    const signup = async (credential) => {
        const { username, email, password, masterKey } = credential;
        const salt =  CryptoJS.lib.WordArray.random(128 / 8).toString();  
        const key = CryptoJS.PBKDF2(masterKey, CryptoJS.enc.Hex.parse(salt), {
            keySize: 512 / 32
          });
        const validationToken  = CryptoJS.SHA256(key).toString();
        
        const response = await fetch(`${host}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password , salt , validationToken }),
        });

        console.log(response);
        if (response.ok) {
            return true;
        }
        else {
            return false;
        }
    }

    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token'); // Retrieve the JWT from storage
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
            const currentTime = Date.now();

            if (currentTime > expirationTime) {
                logout();
            }
        }
    }



    return (
        <AuthContext.Provider value={{login, logout,signup ,checkTokenExpiration}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
