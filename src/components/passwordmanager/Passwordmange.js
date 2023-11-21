import React, { useState, useContext, useEffect } from 'react';
import './password.css';
import { useNavigate } from 'react-router-dom';
import PasswordContext from '../../context/passwords/PasswordContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../context/auth/AuthContext';

const PasswordManager = () => {
  const {checkTokenExpiration, isAuthenticated} = useAuth();
  const [newWebsite, setNewWebsite] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [passwordVisibility, setPasswordVisibility] = useState({});

  const navigator = useNavigate();
  const passwordContext = useContext(PasswordContext);

  const { passwords, addPassword, deletePassword, getPasswords, editPassword } = passwordContext;

  // Check if the user is not logged in
  useEffect(() => {
    checkTokenExpiration();
    if(localStorage.getItem('token')){
        getPasswords();
    }
    else{
        navigator("/login")
    }
}, [])

  const togglePasswordVisibility = (passwordId) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [passwordId]: !prevVisibility[passwordId],
    }));
  };

  const addPass = () => {
    if (newWebsite.trim() !== '' && newUsername.trim() !== '' && newPassword.trim() !== '') {
      if (editIndex !== -1) {
        const updatedPasswords = [...passwords];
        updatedPasswords[editIndex] = {
          id: passwords[editIndex].id,
          website: newWebsite,
          username: newUsername,
          password: newPassword,
        };
        editPassword(passwords[editIndex].stringId, updatedPasswords[editIndex]);
        setEditIndex(-1);
      } else {
        const newPasswordEntry = { website: newWebsite, username: newUsername, password: newPassword };
        addPassword(newPasswordEntry);
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
    deletePassword(passwords[index].stringId);
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
            type={passwordVisibility ?"text":"password"}
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="text-input"
          />
          <i
            className={`password-visibility-icon hidden`}
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          >
            {passwordVisibility ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </i>
        </div>
        <button onClick={(e) => addPass(e)} className="btn btn-primary">
          {editIndex !== -1 ? 'Update Password' : 'Add Password'}
        </button>
      </div>
      <div className="list-container">
        <h2>Password Lists</h2>
        <ul className='list-group'>
          {passwords.map((entry, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <span>
                Website: {entry.website}, Username: {entry.username}, Password:{' '}
                {passwordVisibility[entry.id] ? entry.password : '••••••••'}
              </span>
              <i
                className={`password-visibility-icon ${passwordVisibility[entry.id] ? 'visible' : 'hidden'}`}
                onClick={() => togglePasswordVisibility(entry.id)}
              >
                {passwordVisibility[entry.id] ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
              </i>

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
