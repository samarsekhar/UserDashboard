import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateComponent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [imgUpload, setImgUpload] = useState("");

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(params);
        getEmployeeDetails();
    }, [])

    const getEmployeeDetails = async () => {
        console.log(params);
        let result = await fetch(`http://localhost:5000/employee/${params.id}`);
        result = await result.json();
        console.log(result);
        setName(result.name);
        setEmail(result.email);
        setMobileNumber(result.mobileNumber);
        setDesignation(result.designation);
        setGender(result.gender);
        setCourse(result.course);
        setImgUpload(result.imgUpload);
    }

    const updateEmployee = async () => {
        console.log(name, email, mobileNumber, designation, gender, course, imgUpload);
        let result = await fetch(`http://localhost:5000/employee/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, email, mobileNumber, designation, gender, course, imgUpload }),
            headers: {
                "Content-Type": "Application/json"
            }
        });
        result = await result.json();
        console.log(result);
        if (result) {
            navigate("/list")
        }
    }

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <div> Name:<input className="" type="text" placeholder="Employee Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div> <br />
            <div> Email:<input className="" type="email" placeholder="Employee Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div> <br />
            <div> Mobile No:<input className="" type="number" placeholder="Employee Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </div> <br />
            <div value={designation} onChange={(e) => setDesignation(e.target.value)}> Designation:
                <select>
                    <option value="select">Select Designation</option>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="sales">Sales</option>
                </select>
            </div> <br />
            <div value={gender} onChange={(e) => setGender(e.target.value)}> Gender:
                <input type="radio" value="gender" name="gender" /> Male
                <input type="radio" value="gender" name="gender" /> Female
            </div> <br />
            <div value={course} onChange={(e) => setCourse(e.target.value)}> Course:
                Select your Course:
                <input type="checkbox" name="MCA" value="MCA" /> MCA
                <input type="checkbox" name="BCA" value="BCA" /> BCA 
                <input type="checkbox" name="B.Tech" value="B.Tech" /> B.Tech
                <input type="checkbox" name="BSC" value="BSC" /> BSC
            </div> <br />
            <div onChange={(e) => setImgUpload(e.target.value)}> Img Upload:
                <input type="file" id="image" name="imgUplord" />
            </div> <br/>

            <button onClick={updateEmployee} className='appButton'>Update Product</button>
        </div>
    )
}

export default UpdateComponent;