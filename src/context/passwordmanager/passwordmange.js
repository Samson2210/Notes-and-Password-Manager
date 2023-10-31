import React, { useState } from 'react';
import './PasswordManager.css';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState([]);
  const [newWebsite, setNewWebsite] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const addPassword = () => {
    if (newWebsite.trim() !== '' && newUsername.trim() !== '' && newPassword.trim() !== '') {
      if (editIndex !== -1) {
        const updatedPasswords = [...passwords];
        updatedPasswords[editIndex] = {
          website: newWebsite,
          username: newUsername,
          password: newPassword,
        };
        setPasswords(updatedPasswords);
        setEditIndex(-1);
      } else {
        const newPasswordEntry = { website: newWebsite, username: newUsername, password: newPassword };
        setPasswords([...passwords, newPasswordEntry]);
      }

      setNewWebsite('');
      setNewUsername('');
      setNewPassword('');
    }
  };

  const editPassword = (index) => {
    const passwordToEdit = passwords[index];
    setNewWebsite(passwordToEdit.website);
    setNewUsername(passwordToEdit.username);
    setNewPassword(passwordToEdit.password);
    setEditIndex(index);
  };

  const deletePassword = (index) => {
    const updatedPasswords = passwords.filter((_, i) => i !== index);
    setPasswords(updatedPasswords);
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
        <button onClick={addPassword} className="action-button">
          {editIndex !== -1 ? 'Update Password' : 'Add Password'}
        </button>
      </div>
      <div className="list-container">
        <h2>Password Lists</h2>
        <ul>
          {passwords.map((entry, index) => (
            <li key={index} className="list-item">
              <span>
                Website: {entry.website}, Username: {entry.username}, Password: {isPasswordVisible ? entry.password : '••••••••'}
              </span>
              <button onClick={() => editPassword(index)} className="action-button">
                Edit
              </button>
              <button onClick={() => deletePassword(index)} className="action-button">
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
