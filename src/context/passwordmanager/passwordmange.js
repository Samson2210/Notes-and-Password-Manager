import React, { useState } from 'react';
import './PasswordManager.css';

const PasswordManager = () => {
  const [passwords, setPasswords] = useState({
    website: [],
    socialo: [],
    other: [],
  });
  const [newPassword, setNewPassword] = useState('');
  const [selectedWebsite, setSelectedWebsite] = useState('website');
  const [selectedtitle, setSelectedtitle] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const addPassword = () => {
    if (newPassword) {
      if (editIndex !== -1) {
        // If editIndex is set, update the existing password entry
        const updatedPasswords = [...passwords[selectedWebsite]];
        updatedPasswords[editIndex] = {
          title: selectedtitle,
          password: newPassword,
        };
        setPasswords((prevPasswords) => ({
          ...prevPasswords,
          [selectedWebsite]: updatedPasswords,
        }));
        setEditIndex(-1); // Reset the editIndex
      } else {
        // If editIndex is not set, add a new password entry
        setPasswords((prevPasswords) => ({
          ...prevPasswords,
          [selectedWebsite]: [
            ...prevPasswords[selectedWebsite],
            { title: selectedtitle, password: newPassword },
          ],
        }));
      }

      setSelectedtitle('');
      setNewPassword('');
    }
  };

  const editPassword = (index) => {
    const passwordToEdit = passwords[selectedWebsite][index];
    setSelectedtitle(passwordToEdit.title);
    setNewPassword(passwordToEdit.password);
    setEditIndex(index);
  };

  const deletePassword = (index) => {
    const updatedPasswords = passwords[selectedWebsite].filter(
      (_, i) => i !== index
    );
    setPasswords((prevPasswords) => ({
      ...prevPasswords,
      [selectedWebsite]: updatedPasswords,
    }));
  };

  return (
    <div className="password-manager">
    <h2>Password Manager</h2>
    <div className="form-container">
      <select
        value={selectedWebsite}
        onChange={(e) => {
          setSelectedWebsite(e.target.value);
          setEditIndex(-1); // Reset the editIndex when changing categories
        }}
        className="select-input"
      >
        <option value="website">Website</option>
        <option value="socialo">Social Media</option>
        <option value="other">Other</option>
      </select>

      <input
        type="text"
        placeholder="Enter title (optional)"
        value={selectedtitle}
        onChange={(e) => setSelectedtitle(e.target.value)}
        className="text-input"
      />
      <input
        type="text"
        placeholder={`Enter a new password for ${selectedWebsite}`}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="text-input"
      />
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
              Title: {entry.title || 'No title'}, Password: {entry.password}
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
