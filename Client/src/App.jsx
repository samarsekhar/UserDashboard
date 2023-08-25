import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login";
import UpdateComponent from "./Components/UpdateComponent";
import Profile from "./Components/Profile";
import AddEmployee from "./Components/AddEmployee";
import EmployeesList from "./Components/EmployeesList";

function App() {
    return (
        <div className="app">
             <Router>
            <Navbar/>
            <Routes>
                <Route element={<PrivateComponent/>}>
                <Route path="/list" element={<EmployeesList />} />
                <Route path="/add" element={<AddEmployee />} />
                <Route path="/update/:id" element={<UpdateComponent/>} />
                <Route path="/logout" element={<h1>LogOut</h1>} />
                <Route path="/" element={<Profile/>} />
                </Route>
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/login" element={<Login/>} />
             </Routes>
             </Router>
        </div>
    )
}

export default App;