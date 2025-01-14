import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PORT } from "./common";

export const EditUser = () => {
  const navigate = useNavigate();
  const { task_id } = useParams(); 
  console.log(task_id)
  const [user, setUser] = useState({
    Name: "",
    User_name: "",
    Email: "",
    Address: "",
    Desc: "",
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${PORT}/api/readOne/${task_id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    if (task_id) {
      fetchUser();
    }
  }, [task_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${PORT}/api/update/${task_id}`, user);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 pt-6 pb-8 bg-white rounded shadow-md  relative top-7"
      onSubmit={handleUpdateUser}
    >
      <div className="mb-4 relative">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Enter name"
          name="Name"
          value={user.Name}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Enter Username"
          name="User_name"
          value={user.User_name}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="text"
          placeholder="Enter your email"
          name="Email"
          value={user.Email}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="address"
        >
          Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Enter your Address"
          name="Address"
          value={user.Address}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          type="text"
          placeholder="Enter Description"
          name="Desc"
          value={user.Desc}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex justify-center mb-4">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Update User
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};
