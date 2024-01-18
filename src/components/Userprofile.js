import React, { useState } from 'react';

const DynamicDropdown = () => {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState('');

  const addName = () => {
    if (newName.trim() !== '') {
      setNames([...names, newName]);
      setNewName('');
    }
  };

  return (
    <div>
      <h2>Select Profile</h2>
      
      <div>
        <label>Create a profile: </label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={addName}>Add</button>
      </div>

      <div>
        <label>Select Profile: </label>
        <select>
          {names.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DynamicDropdown;
