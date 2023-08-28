import React, { useState } from 'react';
import NightWing from './Images/Nightwing.webp'
import Wong from './Images/Wong.webp'


function Sidekicks() {
  const [sidekicks, setSidekicks] = useState([
    {
      id: 1,
      name: 'Nightwing',
      superpower: 'Tech Genius',
      city: 'Gotham',
      photo: NightWing,
    },
    {
        id: 2,
        name: 'Wong',
        superpower: 'Magic',
        city: 'New York City',
        photo: Wong,
      },
      // Add more sidekicks here
    ]);
  
    const [newSidekick, setNewSidekick] = useState({
      name: '',
      superpower: '',
      city: '',
      photo: null, // Will be storing the photo here.
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setNewSidekick((prevSidekick) => ({ ...prevSidekick, [name]: value }));
    };
  
    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setNewSidekick((prevSidekick) => ({
          ...prevSidekick,
          photo: file,
        }));
      }
    };
  
    const handleAddSidekick = () => {
      const sidekickWithPhotoUrl = { ...newSidekick, photo: URL.createObjectURL(newSidekick.photo) };
      setSidekicks([...sidekicks, sidekickWithPhotoUrl]);
      setNewSidekick({
        name: '',
        superpower: '',
        city: '',
        photo: null,
      });
    };
  
    return (
      <div>
        <h2>Famous Sidekicks!</h2>
        <div className="add-form">
          <h3>Add New Sidekick</h3>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={newSidekick.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Superpower"
            name="superpower"
            value={newSidekick.superpower}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="City"
            name="city"
            value={newSidekick.city}
            onChange={handleInputChange}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          <button onClick={handleAddSidekick}>Add Sidekick</button>
        </div>
        <div className="sidekicks-list">
          {sidekicks.map((sidekick) => (
            <div key={sidekick.id} className="sidekick-card">
              <img src={sidekick.photo} alt={sidekick.name} />
              <h3>{sidekick.name}</h3>
              <p>Superpower: {sidekick.superpower}</p>
              <p>City: {sidekick.city}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Sidekicks;