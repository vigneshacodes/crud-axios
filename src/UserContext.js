import React, { createContext, useState, useEffect } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "./api";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (user) => {
    try {
      const response = await createUser(user);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUserById = async (id, updatedUser) => {
    try {
      await updateUser(id, updatedUser);
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUserById = async (id) => {
    try {
      await deleteUser(id);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ users, addUser, updateUserById, deleteUserById }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
