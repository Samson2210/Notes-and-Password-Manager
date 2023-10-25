import React, {useState} from "react";
import NoteContext from "./NoteContext";

const NoteState = (props)=>{

    const notesInital = []
    const [ notes, setNotes] = useState(notesInital)

    //Get all notes
    const getNotes = async()=>{
      //TODO: API Call
      const response = await fetch(`/api/notes/all`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${localStorage.getItem('token')}`,
        },
      });

      const json = await response.json();
      console.log(json)
      setNotes(json);
      
    }

      //Add a Note
      const addNote = async(title, description )=>{
        console.log(title,description);
        //TODO: API Call
        const response = await fetch(`/api/notes/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({title,description}), // body data type must match "Content-Type" header
        });
        // const json = response.json(); // parses JSON response into native JavaScript objects
        // console.log(json);
      
        console.log(response);
        getNotes();

      }

      //Delete a Note
      const deleteNote =async (id)=>{
        console.log(id);
        //TODO: API Call
        const response = await fetch(`api/notes/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          },
        });
        console.log(response)

        console.log("deleting the note with id"+id);
        const newNote =notes.filter((note)=>{return note.id!==id});
        setNotes(newNote)
        
      }

      // Edit a Note
      const editNote = async(id, title, description)=>{
        // API CALL 
        const response = await fetch(`/api/notes/update/${id}`, {
          method: "PUT", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization":`Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({title:title,description:description}), // body data type must match "Content-Type" header
        });
        console.log(response)
      
        getNotes();
      }

    return(
        <NoteContext.Provider value={{notes,setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;