import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";

const App = () => {
  const { users, addUser, updateUserById, deleteUserById } =
    useContext(UserContext);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleAddUser = () => {
    const user = {
      name: newUserName,
      email: newUserEmail,
    };
    addUser(user);
    setNewUserName("");
    setNewUserEmail("");
  };

  const handleEditUser = (id, name, email) => {
    setSelectedUserId(id);
    setNewUserName(name);
    setNewUserEmail(email);
  };

  const handleUpdateUser = () => {
    const user = {
      name: newUserName,
      email: newUserEmail,
    };
    updateUserById(selectedUserId, user);
    setNewUserName("");
    setNewUserEmail("");
    setSelectedUserId(null);
  };

  const handleDeleteUser = (id) => {
    deleteUserById(id);
  };

  return (
    <div className="container mt-4 ">
      <h1 className="mb-5">
        <span className="h1 text-success">C</span>
        <span className="h4 text-secondary">REATE</span>
        <span className="h1 text-success"> R</span>
        <span className="h4 text-secondary">EAD</span>
        <span className="h1 text-success"> U</span>
        <span className="h4 text-secondary">PDATE</span>
        <span className="h1 text-success"> D</span>
        <span className="h4 text-secondary">ELETE</span>
      </h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />
      </div>
      {selectedUserId ? (
        <button className="btn btn-warning mb-3" onClick={handleUpdateUser}>
          Update User
        </button>
      ) : (
        <button className="btn btn-primary mb-3" onClick={handleAddUser}>
          Add User
        </button>
      )}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-success me-2"
                  onClick={() => handleEditUser(user.id, user.name, user.email)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
