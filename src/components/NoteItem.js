import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';


const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const { note, updateNote } = props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
            <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note.stringId); props.showAlert("Deleted sucessfully", "success")}}></i>
            
            <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div> 
  )
}

export default NoteItem