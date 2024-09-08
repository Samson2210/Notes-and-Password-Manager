import React, { useState } from "react";
import PasswordContext from "./PasswordContext";
import { AES, enc } from "crypto-js";
import host from "../../Utility";

const secretKey = sessionStorage.getItem("key");

const encryptPass = (password) => {
    if (!secretKey) throw new Error("Secret key is missing!");
    return AES.encrypt(password, secretKey).toString();
};

const decryptPass = (encryptedPassword) => {
    if (!secretKey) throw new Error("Secret key is missing!");
    const bytes = AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(enc.Utf8);
};

const PasswordState = (props) => {
    const [passwords, setPasswords] = useState([]);
    

    // Get all passwords
    const getPasswords = async () => {
        try {
            const response = await fetch(`${host}/api/passwords/all`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch passwords.");
            }

            const json = await response.json();
            const decryptedPasswords = json.map((entry) => ({
                ...entry,
                password: decryptPass(entry.encryptedPassword),
            }));

            setPasswords(decryptedPasswords);
        } catch (error) {
            console.error("Error fetching passwords:", error);
        }
    };

    // Add a password
    const addPassword = async (credential) => {
        try {
            const { website, username, password } = credential;
            const encryptedPassword = encryptPass(password);

            const response = await fetch(`${host}/api/passwords/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ website, username, encryptedPassword }),
            });

            if (!response.ok) {
                throw new Error("Failed to save password.");
            }

            getPasswords();
        } catch (error) {
            console.error("Error adding password:", error);
        }
    };

    // Delete a password
    const deletePassword = async (id) => {
        try {
            const response = await fetch(`${host}/api/passwords/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete password.");
            }

            getPasswords();
        } catch (error) {
            console.error("Error deleting password:", error);
        }
    };

    // Edit a password
    const editPassword = async (id, credential) => {
        try {
            const { website, username, password } = credential;
            const encryptedPassword = encryptPass(password);

            const response = await fetch(`${host}/api/passwords/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ website, username, encryptedPassword }),
            });

            if (!response.ok) {
                throw new Error("Failed to update password.");
            }

            getPasswords();
        } catch (error) {
            console.error("Error editing password:", error);
        }
    };

    return (
        <PasswordContext.Provider value={{ passwords, addPassword, deletePassword, getPasswords, editPassword }}>
            {props.children}
        </PasswordContext.Provider>
    );
};

export default PasswordState;
