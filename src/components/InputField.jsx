import React, { useState } from 'react';

const InputField = ({ inputType, placeholder, leftIcon, rightIcon, value, onChange, name }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prevState => !prevState);
  };

  return (
    <div style={{ border: "1px solid #D0D0D0", borderRadius: "11px", display: "flex", gap: "0.5rem", alignItems: "center", color: "#828282", padding: "0.5rem", width: "470px", marginBottom: "1.25rem" }}>
      {leftIcon && <img src={leftIcon} alt={leftIcon} height={30} width={30} />}

      <input
      name={name}
      value={value}
        type={inputType === 'password' && isPasswordVisible ? 'text' : inputType}
        placeholder={placeholder}
        style={{ border: "none", outline: "none", color: "#828282", width: "100%", fontSize: "20px" }}
        onChange={onChange}
      />

      {inputType === 'password' && (
        <img
          src={isPasswordVisible ? 'hidePassword.svg' : 'showPassword.svg'}
          alt={isPasswordVisible ? 'Hide password' : 'Show password'}
          height={30}
          width={30}
          onClick={togglePasswordVisibility}
          style={{ cursor: 'pointer' }}
        />
      )}

      {rightIcon && inputType !== 'password' && (
        <img src={rightIcon} alt={rightIcon} height={30} width={30} />
      )}
    </div>
  );
};

export default InputField;