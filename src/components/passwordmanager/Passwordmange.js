import React, { useState, useContext, useEffect } from 'react';
import './password.css';
import { useNavigate } from 'react-router-dom';
import PasswordContext from '../../context/passwords/PasswordContext';

const PasswordManager = () => {
  // const [passwords, setPasswords] = useState([]);
  const [newWebsite, setNewWebsite] = useState('');
  // const [passwordId, setPasswordId] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const navigator = useNavigate();
  const passwordContext = useContext(PasswordContext);

  const {passwords, addPassword, deletePassword, getPasswords , editPassword} = passwordContext;


  // Check if the user is not logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getPasswords();
    } else {
      navigator('/login');
    }
  }, []);

  const [password, setPassword] = useState({ id: '', website: '', username: '', password: '' })


  const addPass = () => {
    if (newWebsite.trim() !== '' && newUsername.trim() !== '' && newPassword.trim() !== '') {
      if (editIndex !== -1) {
        const updatedPasswords = [...passwords];
        updatedPasswords[editIndex] = {
          website: newWebsite,
          username: newUsername,
          password: newPassword,
        };
        setPassword(updatedPasswords);

        editPassword(passwords[editIndex].id,updatedPasswords[editIndex]);
        setEditIndex(-1);
      } else {
        const newPasswordEntry = { website: newWebsite, username: newUsername, password: newPassword };
        addPassword(newPasswordEntry);
        setPassword([...passwords, newPasswordEntry]);
      }

      setNewWebsite('');
      setNewUsername('');
      setNewPassword('');
    }
  };

  const editPass = (index) => {
    const passwordToEdit = passwords[index];
    setNewWebsite(passwordToEdit.website);
    setNewUsername(passwordToEdit.username);
    setNewPassword(passwordToEdit.password);
    setEditIndex(index);
  };

  const deletePass = (index) => {
    const updatedPasswords = passwords.filter((_, i) => i !== index);
    deletePassword(passwords[index].id);
    setPassword(updatedPasswords);
  };

  return (
    <div className="password-manager">
      
      <h2>Password Manager</h2>
      <div className="form-container">
        <input
          type="text"
          placeholder="Website Name"
          value={newWebsite}
          onChange={(e) => setNewWebsite(e.target.value)}
          className="text-input"
        />
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="text-input"
        />
        <div className="password-input-container">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="text-input"
          />
          <i
            className={`password-visibility-icon ${isPasswordVisible ? 'visible' : 'hidden'}`}
            onClick={() => setPasswordVisibility(!isPasswordVisible)}
          >
            👁️
          </i>
        </div>
        <button onClick={(e)=>addPass(e)} className="action-button">
          {editIndex !== -1 ? 'Update Password' : 'Add Password'}
        </button>
      </div>
      <div className="list-container">
        <h2>Password Lists</h2>
        <ul>
          {passwords.map((entry, index) => (
            <li id={entry.id} key={index} className="list-item">
              <span>
                Website: {entry.website}, Username: {entry.username}, Password: {isPasswordVisible ? entry.password : '••••••••'}
              </span>
              <button onClick={() => editPass(index)} className="action-button">
                Edit
              </button>
              <button onClick={() => deletePass(index)} className="action-button">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PasswordManager;
