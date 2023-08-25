import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        let result = await fetch("http://localhost:5000/employees", {
            headers: {
                authorization: JSON.parse(localStorage.getItem("token"))
            }
        });
        result = await result.json();
        setEmployees(result);
    }

    const deleteEmployee = async (id) => {
        console.log(id);
        let result = await fetch(`http://localhost:5000/employee/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getEmployees();
        }
    }

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/employee/${key}`);
            result = await result.json()
            if (result) {
                setEmployees(result)
            }
        } else {
            getEmployees();
        }
    }


    //console.log(products);

    return (
        <div className="product-list">
            <h1>Employees List</h1>
            <input type="text" className="search-product-box" placeholder="Search" onChange={searchHandle} />
            <div className="container">
                <div className="row">
                    <div className="col col-md-8">
                        <table className="table table-primary">
                            <thead className="bg-hover text-dark">
                                <tr>
                                    <th>Unique.Id</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile No</th>
                                    <th>Degisnation</th>
                                    <th>Gender</th>
                                    <th>Course</th>
                                    <th>Operation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    employees.length > 0 ? employees.map((item, index) => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.imgUpload}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobileNumber}</td>
                                                <td>{item.designation}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.course}</td>
                                                <td>
                                                    <button onClick={() => deleteEmployee(item._id)}>Delete</button>

                                                    <button><Link to={"/update/" + item._id}>Update</Link></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                        : <h1>No Result Found</h1>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <input type="" className="search-product-box" placeholder="Search" onChange={searchHandle} />
            <ul>
                <li>Unique.Id</li>
                <li>Image</li>
                <li>Name</li>
                <li>Email</li>
                <li>Mobile No</li>
                <li>Degisnation</li>
                <li>Gender</li>
                <li>Course</li>
                <li>Create Date</li>
            </ul> */}
            {/* {
                employees.length > 0 ? employees.map((item, index) => {
                    return (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.imgUpload}</li>
                        <li>{item.name}</li>
                        <li>{item.email}</li>
                        <li>{item.mobileNumber}</li>
                        <li>{item.designation}</li>
                        <li>{item.gender}</li>
                        <li>{item.course}</li>
                        <li>{item.createdate}</li>
                        <li>
                            <button onClick={() => deleteEmployee(item._id)}>Delete</button>

                            <button><Link to={"/update/"+item._id}>Update</Link></button>
                        </li>
                    </ul>
                )})
                : <h1>No Result Found</h1>
            } */}
        </div>
    )
}

export default EmployeesList;