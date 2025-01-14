/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { PORT } from "./common";

export const Crudtable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    async function fetchUsers() {
      try {
        const response = await axios.get(`${PORT}/api/readAll`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, [users]);

  const handleAddUser = () => {
    navigate("/addUser");
  };

  const handleEditUser = (task_id) => {
    navigate(`/update/${task_id}`);
    console.log(task_id);
  };

  const handleReadUser = () => {
    navigate("/read");
  };

  const handleDeleteUser = async (task_id) => {
    try {
      await axios.delete(`${PORT}/api/delete/${task_id}`);
      // Remove the deleted user from the local state
      setUsers(users.filter((user) => user._id !== task_id));
      toast.success(`User deleted successfully`);
    } catch (error) {
      console.log("Error Deleting Task", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="mx-4 mt-4">
      {/* Add User Button */}
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded flex items-center mb-4 hover:scale-[0.9] transition-all"
        onClick={handleAddUser}
      >
        <IoMdAdd className="inline-block mr-2" />
        Add User
      </button>

      {/* Responsive Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-center">SR No.</th>
              <th className="px-6 py-3 text-center">Name</th>
              <th className="px-6 py-3 text-center">Username</th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">Address</th>
              <th className="px-6 py-3 text-center">Description</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {users.map((user, index) => (
              <tr key={user._id} className="border-b dark:border-gray-700">
                <td className="px-6 py-4 text-center">{index + 1}</td>
                <td className="px-6 py-4">{user.Name}</td>
                <td className="px-6 py-4">{user.User_name}</td>
                <td className="px-6 py-4">{user.Email}</td>
                <td className="px-6 py-4">{user.Address}</td>
                <td className="px-6 py-4">{user.Desc}</td>
                <td className="px-6 py-4 flex items-center justify-center space-x-3">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded transition transform hover:scale-105"
                    onClick={() => handleEditUser(user._id)}
                  >
                    <MdModeEditOutline />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition transform hover:scale-105"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    <RiDeleteBin3Fill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};
