import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PORT } from "./common";

export const AddTask = () => {
  const navigate = useNavigate();

  const [inpvalue, setInpValue] = useState({
    Name: "",
    User_name: "",
    Email: "",
    Address: "",
    Desc: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
     await axios.post(
        `${PORT}/api/create`,
        inpvalue
      );
      toast.success("Task added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Adding the task failed:", error);
      toast.error("Failed to add task. Please try again.");
      navigate("/");
    }

    setInpValue({
      name: "",
      username: "",
      email: "",
      address: "",
      description: "",
    });
  };

  return (
    <form
      className="w-full max-w-sm flex flex-col m-auto mt-14"
      onSubmit={handleAddTask}
    >
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="name"
          >
            Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="name"
            type="text"
            placeholder="Enter name"
            name="Name"
            value={inpvalue.Name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="username"
          >
            Username
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="username"
            type="text"
            placeholder="Enter Username"
            name="User_name"
            value={inpvalue.User_name}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="email"
          >
            Email
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="email"
            type="text"
            placeholder="Enter your email"
            name="Email"
            value={inpvalue.Email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="address"
          >
            Address
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="address"
            type="text"
            placeholder="Enter your Address"
            name="Address"
            value={inpvalue.Address}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="description"
          >
            Description
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="description"
            type="text"
            placeholder="Enter Description"
            name="Desc"
            value={inpvalue.Desc}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="md:flex md:items-center">
        <div className="md:w-1/3"></div>
        <div className="md:w-2/3">
          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add Task
          </button>
        </div>
      </div>
      <ToastContainer position="right-bottom" />
    </form>
  );
};
