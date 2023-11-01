import React, { useState } from "react";
import PasswordContext from "./PasswordContext";
import { AES, enc } from 'crypto-js';

const secretKey =process.env.REACT_APP_SECRET_KEY
const encryptPass = (password) => {
    return AES.encrypt(password, secretKey).toString();
};


const decryptPass = (encryptedPassword) => {
    const bytes = AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(enc.Utf8);
};
const PasswordState = (props) => {
    const passwordInitial = [];
    const [passwords, setPasswords] = useState(passwordInitial);

    //Get all passwords
    const getPasswords = async () => {
        const response = await fetch('/api/passwords/all', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        });
        const json = await response.json();
        console.log(json);
        const decryptedPasswords = json.map((entry) => ({
            ...entry,
            password: decryptPass(entry.encryptedPassword),
          }));
        setPasswords(decryptedPasswords);
    };

    //Add a password
    const addPassword = async (credential) => {
        console.log(credential);
        const { website, username, password } = credential; 
        const encryptedPassword = encryptPass(password);
        const response = await fetch('/api/passwords/save', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ website, username, encryptedPassword }), // body data type must match "Content-Type" header
        });
        console.log(response);
        getPasswords();
    };

    //Delete a password
    const deletePassword = async (id) => {

        console.log(id);
        const response = await fetch(`/api/password/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        });
        console.log(response);
        getPasswords();
    }


    //Edit Password
    const editPassword = async (credential) => {
        const { id, website, username, password } = credential;
        console.log(credential)
        const response = await fetch(`/api/password/update/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ website, username, password }), // body data type must match "Content-Type" header
        });
        console.log(response);
        getPasswords();
    }
    return (
        <PasswordContext.Provider value={{ passwords, addPassword, deletePassword, getPasswords, editPassword }}>
            {props.children}
        </PasswordContext.Provider>
    )
}

export default PasswordState;
