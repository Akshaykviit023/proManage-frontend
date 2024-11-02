import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { useNavigate } from "react-router-dom";
import { register, login } from '../services/auth';
import '../styles/Auth.css';

const Auth = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                if (!userData.email || !userData.password) return;
                const { email, password } = userData;
                const response = await login({ email, password });
                if (response.status === 200) {
                    navigate('/dashboard');
                    alert('User logged in successfully');
                }
            } else {
                if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) return;
                const { name, email, password, confirmPassword } = userData;
                const response = await register({ name, email, password, confirmPassword });
                if (response.status === 201) {
                    navigate('/dashboard');
                    alert('User created successfully');
                }
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-image-section">
                <div className="auth-image-wrapper">
                    <img className="auth-icon" src="authImg.png" alt="" />
                    <div className="auth-circle" />
                </div>
                <div className="auth-welcome-text">
                    <h2>Welcome aboard my friend</h2>
                    <h3>just a couple of clicks and we start</h3>
                </div>
            </div>

            <div className="auth-form-section">
                <div>
                    <h1 className="auth-title">{isLogin ? "Login" : "Register"}</h1>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && <InputField name="name" value={userData.name} onChange={handleChange} placeholder="Name" inputType="text" leftIcon="nameIcon.svg" />}
                        <InputField name="email" value={userData.email} onChange={handleChange} placeholder="Email" inputType="email" leftIcon="mailIcon.svg" />
                        <InputField name="password" value={userData.password} onChange={handleChange} placeholder="Password" inputType="password" leftIcon="passwordIcon.svg" />
                        {!isLogin && <InputField name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" inputType="password" leftIcon="passwordIcon.svg" />}
                        
                        <div className="auth-button">
                            <Button btnName={isLogin ? "Log In" : "Register"} bgColor="#17A2B8" color="white" borderRadius="55px" width="493px" />
                        </div>
                    </form>
                    <p className="auth-switch-text">{isLogin ? "Have no account yet?" : "Have an account?"}</p>
                    <Button btnName={isLogin ? "Register" : "Login"} bgColor="white" color="#17A2B8" borderRadius="55px" width="493px" isBorder={true} action={() => setIsLogin((prev) => !prev)} />
                </div>
            </div>
        </div>
    );
};

export default Auth;