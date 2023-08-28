import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import { init } from "commandbar";
init("f25889c2");

import React, { useState } from "react";

import Villains from "./Villians";
import Family from "./Family";
import Sidekicks from "./Sidekicks";
import "./App.css";

function App() {
  // Booting Up CommandBar, the user records, the hero records

  const loggedInUserId = "12345"; // Example
  window.CommandBar.boot(loggedInUserId);
  window.CommandBar.setTheme("#e3d0e0");

  window.CommandBar.addComponent(
    "record-preview-with-image",
    "Basic Record Preview with an image",
    {
      mount: (elem) => ({
        render: (data, metadata) => {
          elem.innerHTML =
            "<div>" +
            "<h3>" +
            data.label +
            "</h3>" +
            '<div><img src="' +
            data.photo +
            '" /></div>' +
            "</div>";
        },
        unmount: (elem) => {},
      }),
    }
  );

  // Adding the videogame characters and their photos for the preview
  window.CommandBar.addRecords(
    "users",
    [
      {
        label: "Johnny Silverhand",
        id: "1",
        photo:
          "https://assetsio.reedpopcdn.com/cyberpunk-2077-breathtaking-johnny-silverhand-items-5077-1608314374838.jpg?width=300&quality=75&format=jpg&dpr=2&auto=webp",
      },
      {
        label: "Lara Croft",
        id: "2",
        photo:
          "https://www.syfy.com/sites/syfy/files/styles/scale_1280/public/2021/03/lara-croft-tomb-raider-25th-via-square-enix.jpg",
      },
      {
        label: "Master Chief",
        id: "3",
        photo:
          "https://images.immediate.co.uk/production/volatile/sites/3/2021/12/Halo-Infinite-campaign-length-hours-a667c98.jpg?quality=90&resize=620,414",
      },
      {
        label: "Duke Nukem",
        id: "4",
        photo:
          "https://cdn.vox-cdn.com/thumbor/ZId-HkoCmR5-E67LsEVQY5EEvOs=/0x0:1440x810/1400x1050/filters:focal(578x203:808x433):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/54697717/duke-nukem-3d-art_1440.0.0.jpg",
      },
    ],
    {
      content: { type: "component", value: "record-preview-with-image" },
      renderAs: { type: "component", value: "grid" },
    }
  );

  // Adding another record of heroes
  window.CommandBar.addRecords("heroes", [
    { label: "Wanda", id: "foo42" },
    { label: "Peter", id: "bar43" },
    { label: "Hal", id: "baz44" },
  ]);

  // Adding hero filler for the website
  const [tableData, setTableData] = useState([
    { id: 1, name: "Superman", superpower: "Flight", city: "Metropolis" },
    {
      id: 2,
      name: "Batman",
      superpower: "Intelligence and Wealth",
      city: "Gotham",
    },
    // Add more initial data here
  ]);

  const [newMember, setNewMember] = useState({
    name: "",
    superpower: "",
    city: "",
  });
  const [editingMemberId, setEditingMemberId] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMember((prevMember) => ({ ...prevMember, [name]: value }));
  };

  const handleAddMember = () => {
    setTableData([...tableData, { ...newMember, id: Date.now() }]);
    setNewMember({ name: "", superpower: "", city: "" });
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
        member.id === editingMemberId
          ? { ...newMember, id: editingMemberId }
          : member
      )
    );
    setEditingMemberId(null);
    setNewMember({ name: "", superpower: "", city: "" });
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
                      <td>
                        {member.id === editingMemberId ? (
                          <input
                            type="text"
                            name="name"
                            value={newMember.name}
                            onChange={handleInputChange}
                          />
                        ) : (
                          member.name
                        )}
                      </td>
                      <td>
                        {member.id === editingMemberId ? (
                          <input
                            type="text"
                            name="superpower"
                            value={newMember.superpower}
                            onChange={handleInputChange}
                          />
                        ) : (
                          member.superpower
                        )}
                      </td>
                      <td>
                        {member.id === editingMemberId ? (
                          <input
                            type="text"
                            name="city"
                            value={newMember.city}
                            onChange={handleInputChange}
                          />
                        ) : (
                          member.city
                        )}
                      </td>
                      <td>
                        {member.id === editingMemberId ? (
                          <button onClick={handleUpdateMember}>Save</button>
                        ) : (
                          <button onClick={() => handleEditClick(member.id)}>
                            Edit
                          </button>
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
