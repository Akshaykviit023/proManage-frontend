import React, { useState } from 'react';
import InputField from './InputField.jsx';
import Button from './Button.jsx';
import { updateUser } from '../services/auth.js';
import Loader from './Loader.jsx';

const PersonalInfo = () => {
  const [userData, setUserData] = useState({
    name: "",
    updatedEmail: "",
    oldPassword: "",
    newPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const updateInfo = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message
    setLoading(true)
    try {
      const response = await updateUser(userData);
      if (response.status === 200) {
        setSuccessMessage("User information updated successfully!");
      } else {
        setErrorMessage(response.data.message || "An error occurred during the update.");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      setErrorMessage("Failed to update user information. Please try again.");
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <h1>Settings</h1>

      <form onSubmit={updateInfo}>
        <InputField
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Name"
          inputType="text"
          leftIcon="nameIcon.svg"
        />
        <InputField
          name="updatedEmail"
          value={userData.updatedEmail} // Fixed to match the state
          onChange={handleChange}
          placeholder="Update Email"
          inputType="email"
          leftIcon="mailIcon.svg"
        />
        <InputField
          name="oldPassword"
          value={userData.oldPassword} // Fixed to match the state
          onChange={handleChange}
          placeholder="Old Password"
          inputType="password"
          leftIcon="passwordIcon.svg"
        />
        <InputField
          name="newPassword"
          value={userData.newPassword} // Fixed to match the state
          onChange={handleChange}
          placeholder="New Password"
          inputType="password"
          leftIcon="passwordIcon.svg"
        />
        <Button
          btnName="Update"
          bgColor="#17A2B8"
          color="white"
          borderRadius="55px"
          width="493px"
          action={() => updateInfo()} // Action is now called within the form submission
        />
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default PersonalInfo;