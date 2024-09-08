import React, {useState} from "react";
import NoteContext from "./NoteContext";
import host from "../../Utility";
import { AES,enc } from "crypto-js";

const secretKey = sessionStorage.getItem("key")


const NoteState = (props)=>{
  const encrypt = (password) => {
    return AES.encrypt(password, secretKey).toString();
};


const decrypt = (encryptedPassword) => {
    const bytes = AES.decrypt(encryptedPassword, secretKey);
    return bytes.toString(enc.Utf8);
};
    const notesInital = []
    const [ notes, setNotes] = useState(notesInital)

    //Get all notes
    const getNotes = async()=>{
      const response = await fetch(`${host}/api/notes/all`, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${localStorage.getItem('token')}`,
        },
      });

      const json = await response.json();
      //decrpt notes
      const descryptedNotes =  json.map(note => ({
        ...note,
        title: decrypt(note.title),
        description: decrypt(note.description),
    }));

      setNotes(descryptedNotes);
      
    }

      //Add a Note
      const addNote = async(title, description )=>{
        const encryptedTitle = encrypt(title);
        const encryptedDecription = encrypt(description);
        const response = await fetch(`${host}/api/notes/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({title:encryptedTitle,description:encryptedDecription}), 
        });
        // const json = response.json(); // parses JSON response into native JavaScript objects
        // console.log(json);
      
        // console.log(response);
        getNotes();

      }

      //Delete a Note
      const deleteNote =async (id)=>{
        // console.log(id);

        const response = await fetch(`${host}/api/notes/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          },
        });
        // console.log(response)

        // console.log("deleting the note with id"+id);
        const newNote =notes.filter((note)=>{return note.stringId!==id});
        setNotes(newNote)
        
      }

      // Edit a Note
      const editNote = async(id, title, description)=>{

        const encryptedTitle = encrypt(title);
        const encryptedDecription = encrypt(description);
        // API CALL 
        const response = await fetch(`${host}/api/notes/update/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization":`Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({title:encryptedTitle,description:encryptedDecription}), 
        });
      
        getNotes();
      }

    return(
        <NoteContext.Provider value={{notes,setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;