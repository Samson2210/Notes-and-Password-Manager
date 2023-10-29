import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoteState from './context/notes/NotesState';
import { useState } from 'react';
import Notes from './components/Notes';
import PasswordManager from './context/passwordmanager/passwordmange';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500)
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/notes" element={<Notes showAlert={showAlert}/>} />
              <Route exact path="/passwordmanger" element={<PasswordManager showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
