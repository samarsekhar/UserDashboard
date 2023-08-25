import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup");
    }
    return (
        <div className="">
            {
                auth ? <ul className="navbar-ul">
                    <li><Link to="/list" >Employees List</Link></li>
                    <li><Link to="/add">Add Employee</Link></li>
                    {/* <li><Link to="/update">Update Employee</Link></li> */}
                    <li><Link to="/">Profile</Link></li>
                    <li><Link onClick={logout} tp="/signup">LogOut ({JSON.parse(auth).name})</Link></li>
                </ul>
                    : <ul className="navbar-ul navbar-right">
                        <li><Link to="/signup">SignUp</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }
        </div>
    )
}

export default Navbar;