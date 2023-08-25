import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [imgUpload, setImgUpload] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const AddEmployee  = async() => {

        if (!name || !email || !mobileNumber || !designation || !gender || !course || !imgUpload || !createdate) {
            setError(true)
            return false
        }

        console.log(name, email, mobileNumber, designation, gender, course, imgUpload, createdate );
        let userId = JSON.parse(localStorage.getItem("user"))._id;
        console.log(userId);
        let result = await fetch("http://localhost:5000/add-employee", {
            method: "post",
            body: JSON.stringify({name,email,mobileNumber,designation,gender,course,imgUpload,userId}),
            headers: {
                "Content-type" : "application/json"
            }
        })
        result = await result.json();
        console.log(result);
        navigate("/list");
    }
     return (
        <div className="product">
            <h1>Add Employee</h1>
            <div> Name:<input className="" type="text" placeholder="Employee Name" onChange={(e) => setName(e.target.value)} />
            <br />
            {error && !name && <span className="invalid-input">Enter Valid Name</span>}
            </div> <br />
            <div> Email:<input className="" type="email" placeholder="Employee Email" onChange={(e) => setEmail(e.target.value)} />
            <br />
            {error && !email && <span className="invalid-input">Enter Valid Email</span>}
            </div> <br />
            <div> Mobile No:<input className="" type="number" placeholder="Employee Number" onChange={(e) => setMobileNumber(e.target.value)} />
            <br/>
            {error && !mobileNumber && <span className="invalid-input">Enter Valid Number</span> }
            </div> <br />
            <div onChange={(e) => setDesignation(e.target.value)}> Designation:
                <select>
                    <option value="select">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="sales">Sales</option>
                </select>
            </div> <br />
            <div onChange={(e) => setGender(e.target.value)}> Gender:
                <input type="radio" value="gender" name="gender" /> Male
                <input type="radio" value="gender" name="gender" /> Female
            </div> <br />
            <div onChange={(e) => setCourse(e.target.value)}> Course:
                Select your Course:
                <input type="checkbox" name="MCA" value="MCA" /> MCA
                <input type="checkbox" name="BCA" value="BCA" /> BCA 
                <input type="checkbox" name="B.Tech" Value="B.Tech" /> B.Tech
                <input type="checkbox" name="BSC" value="BSC" /> BSC
            </div> <br />
            <div onChange={(e) => setImgUpload(e.target.value)}> Img Upload:
                <input type="file" accept="image/png , image/jpeg"/>
            </div> <br/>
            <button className="appButton" onClick={AddEmployee}>Add Employee</button>
        </div>
    )
}

export default AddEmployee;