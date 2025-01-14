/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PORT } from "../common";

export const DefaultHome = () => {
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
  }, []);

  return (
    <div className="mx-4 mt-4">
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
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            {users.map((user, index) => (
              <tr key={user._id} className="border-b dark:border-gray-700">
                <td className=" text-center px-6 py-4">{index + 1}</td>
                <td className=" text-center px-6 py-4">{user.Name}</td>
                <td className=" text-center px-6 py-4">{user.User_name}</td>
                <td className=" text-center px-6 py-4">{user.Email}</td>
                <td className=" text-center px-6 py-4">{user.Address}</td>
                <td className=" text-center px-6 py-4">{user.Desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
