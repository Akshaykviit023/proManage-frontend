import React, { useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useNavigate } from "react-router-dom";
import { register, login } from '../services/auth';

const Auth = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            if(isLogin){
                if (!userData.email || !userData.password) {
                    return;
                }
                const { email, password } = userData;
                const response = await login({ email, password })
                console.log(response);
                if (response.status === 200) {
                    navigate('/dashboard');
                    alert('User logged in successfully');
                }
            }
            else{
                if (!userData.name || !userData.email || !userData.password || !userData.confirmPassword) {
                    return;
                }
                const { name, email, password, confirmPassword } = userData;
                const response = await register({ name, email, password, confirmPassword })
                console.log(response);
                if (response.status === 201) {
                    navigate('/dashboard');
                    alert('User created successfully');
                }
            }
            
        }
        catch (error) {

            console.log(error.message);
        }
        finally {
            setLoading(false);
        }
    }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ backgroundColor: "#17A2B8", flexGrow: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <div style={{ position: "relative" }}>
                <img style={{ position: "absolute", left: "1rem", top: "3rem" }} src="authImg.png" alt="" />
                <div style={{ width: "300px", height: "300px", backgroundColor: "#317F8B", borderRadius: "999px" }} />
                
            </div>

            <div style={{ marginTop: "3rem", color: "white", textAlign: "center" }}>
                <h2 style={{ fontWeight: 600, fontSize: "33px" }}>Welcome aboard my friend</h2>
                <h3 style={{ fontWeight: 400, fontSize: "20px" }}>just a couple of clicks and we start</h3>
            </div>
            
            
        </div>
        <div style={{ padding: "0 4rem", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div>
                <h1 style={{ textAlign: "center", fontSize: "33px", fontWeight: "600", marginBottom: "4rem" }}>{isLogin ? "Login" : "Register"}</h1>
            <form onSubmit={handleSubmit}>
                {!isLogin && <InputField name="name" value={userData.name} onChange={handleChange} placeholder="Name" inputType="text" leftIcon="nameIcon.svg" />}
                
                <InputField name="email" value={userData.email} onChange={handleChange} placeholder="Email" inputType="email" leftIcon="mailIcon.svg" />
                <InputField name="password" value={userData.password} onChange={handleChange} placeholder="Password" inputType="password" leftIcon="passwordIcon.svg" />

                {!isLogin && <InputField name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" inputType="password" leftIcon="passwordIcon.svg" />}
                
                <div style={{ marginTop: "3rem"}}>
                    <Button btnName={isLogin ? "Log In" : "Register"} bgColor="#17A2B8" color="white" borderRadius="55px" width="493px" />
                </div>

            </form>
                <p style={{ textAlign: "center", fontSize: "20px", color: "#828282" }}>{isLogin ? "Have no account yet?" : "Have an account?"}</p>
                <Button btnName={isLogin ? "Register" : "Login"} bgColor="white" color="#17A2B8" borderRadius="55px" width="493px" isBorder={true} action={() => setIsLogin(e => !e)} />
            </div>
            
        </div>
    </div>
  )
}

export default Auth