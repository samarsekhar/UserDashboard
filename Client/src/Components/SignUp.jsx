import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user")
        if (auth) {
            navigate("/")
        }
    }, [])

    const collectData = async (e) => {
        e.preventDefault()
        console.log(name, email, password);

        let result = await fetch("http://localhost:5000/register", {
            method: "post",
            body: JSON.stringify({name, email, password}),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.result));
        localStorage.setItem("token", JSON.stringify(result.auth)); 
        navigate("/")
    }


    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" name="name" value={name} placeholder="Enter Name" onChange={(e) => setName(e.target.value)} /> 
            <input className="inputBox" type="email" name="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} /> 
            <input className="inputBox" type="password" name="password" value={password} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} /> 
            <button className="appButton" type="button" onClick={collectData}>Sign Up</button>
        </div>
    )
}

export default SignUp;