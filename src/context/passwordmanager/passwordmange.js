import React, { useState } from 'react';
import './PasswordManager.css';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState({
    website: [],
    socialMedia: [],
    other: [],
  });
  const [newPassword, setNewPassword] = useState('');
  const [selectedWebsite, setSelectedWebsite] = useState('website');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const addPassword = () => {
    if (newPassword.trim() !== '') {
      if (editIndex !== -1) {
        const updatedPasswords = [...passwords[selectedWebsite]];
        updatedPasswords[editIndex] = {
          title: selectedTitle,
          password: newPassword,
        };
        const updatedPasswordList = { ...passwords, [selectedWebsite]: updatedPasswords };
        setPasswords(updatedPasswordList);
        setEditIndex(-1);
      } else {
        const newPasswordEntry = { title: selectedTitle, password: newPassword };
        const updatedPasswordList = { ...passwords, [selectedWebsite]: [...passwords[selectedWebsite], newPasswordEntry] };
        setPasswords(updatedPasswordList);
      }

      setSelectedTitle('');
      setNewPassword('');
    }
  };

  const editPassword = (index) => {
    const passwordToEdit = passwords[selectedWebsite][index];
    setSelectedTitle(passwordToEdit.title);
    setNewPassword(passwordToEdit.password);
    setEditIndex(index);
  };

  const deletePassword = (index) => {
    const updatedPasswords = passwords[selectedWebsite].filter((_, i) => i !== index);
    const updatedPasswordList = { ...passwords, [selectedWebsite]: updatedPasswords };
    setPasswords(updatedPasswordList);
  };

  return (
    <div className="password-manager">
      <h2>Password Manager</h2>
      <div className="form-container">
        <select
          value={selectedWebsite}
          onChange={(e) => {
            setSelectedWebsite(e.target.value);
            setEditIndex(-1);
          }}
          className="select-input"
        >
          <option value="website">Website</option>
          <option value="socialMedia">Social Media</option>
          <option value="other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Enter title (optional)"
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
          className="text-input"
        />
        <div className="password-input-container">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            placeholder={`Enter a new password for ${selectedWebsite}`}
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
          {passwords[selectedWebsite].map((entry, index) => (
            <li key={index} className="list-item">
              <span>
                Title: {entry.title || 'No title'}, Password: {isPasswordVisible ? entry.password : '••••••••'}
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
