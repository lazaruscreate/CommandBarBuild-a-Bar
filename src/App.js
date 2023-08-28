import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import Villains from './Villians'; 
import Family from './Family'; 
import Sidekicks from './Sidekicks'; 

import { init } from 'commandbar';
init('f25889c2');

import React, { useState } from 'react';
import './App.css';

function App() {
  const loggedInUserId = '12345'; // Example
  window.CommandBar.boot(loggedInUserId);




  const [tableData, setTableData] = useState([
    { id: 1, name: 'Superman', superpower: 'Flight', city: 'Metropolis' },
    { id: 2, name: 'Batman', superpower: 'Intelligence and Wealth', city: 'Gotham' },
    // Add more initial data here
  ]);

  const [newMember, setNewMember] = useState({ name: '', superpower: '', city: '' });
  const [editingMemberId, setEditingMemberId] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMember((prevMember) => ({ ...prevMember, [name]: value }));
  };

  const handleAddMember = () => {
    setTableData([...tableData, { ...newMember, id: Date.now() }]);
    setNewMember({ name: '', superpower: '', city: '' });
  };

  const handleEditClick = (memberId) => {
    setEditingMemberId(memberId);
    const memberToEdit = tableData.find((member) => member.id === memberId);
    if (memberToEdit) {
      setNewMember({ ...memberToEdit });
    }
  };

  const handleUpdateMember = () => {
    setTableData((prevData) =>
      prevData.map((member) =>
        member.id === editingMemberId ? { ...newMember, id: editingMemberId } : member
      )
    );
    setEditingMemberId(null);
    setNewMember({ name: '', superpower: '', city: '' });
  };




  return (
    <div className="App">
      <Router>
        <div className="sidebar">
          <h1>Navigation</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/villains">Villains</Link>
            </li>
            <li>
              <Link to="/family">Family</Link>
            </li>
            <li>
              <Link to="/sidekicks">Sidekicks</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Switch>
            <Route path="/villains">
              <Villains />
            </Route>
            <Route path="/family">
              <Family />
            </Route>
            <Route path="/sidekicks">
              <Sidekicks />
            </Route>
            <Route path="/">
              <h1>Superhero Table</h1>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Superpower</th>
                    <th>City</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((member) => (
                    <tr key={member.id}>
                      <td>{member.id === editingMemberId ? <input type="text" name="name" value={newMember.name} onChange={handleInputChange} /> : member.name}</td>
                      <td>{member.id === editingMemberId ? <input type="text" name="superpower" value={newMember.superpower} onChange={handleInputChange} /> : member.superpower}</td>
                      <td>{member.id === editingMemberId ? <input type="text" name="city" value={newMember.city} onChange={handleInputChange} /> : member.city}</td>
                      <td>
                        {member.id === editingMemberId ? (
                          <button onClick={handleUpdateMember}>Save</button>
                        ) : (
                          <button onClick={() => handleEditClick(member.id)}>Edit</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="add-form">
                <h2>Add New Hero</h2>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={newMember.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="Superpower"
                  name="superpower"
                  value={newMember.superpower}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={newMember.city}
                  onChange={handleInputChange}
                />
                <button onClick={handleAddMember}>Add Hero</button>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
