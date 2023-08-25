const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require('./db/User');
const Employee = require("./db/Employee")
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({result}, jwtKey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send("Something went wrong")  
        }
        resp.send({result,auth:token})
    })
})

app.post("/login", async (req, resp) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user}, jwtKey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send("Something went wrong")  
                }
                resp.send({user,auth:token})
            })
        } else {
            resp.send({ result: "No User found" })
        }
    } else {
        resp.send({ result: "No User found" })
    }
});

app.post("/add-employee", async (req, resp) => {
    let product = new Employee(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get("/employees", async (req, resp) => {
    const employees = await Employee.find();
    if (employees.length > 0) {
        resp.send(employees)
    } else {
        resp.send({ result: "No Product found" })
    }
});

app.delete("/employee/:id", async (req, resp) => {
    let result = await Employee.deleteOne({ _id: req.params.id });
    resp.send(result)
}),

app.get("/employee/:id", async (req, resp) => {
    let result = await Employee.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ "result": "No Record Found." })
    }
})

app.put("/employee/:id", async (req, resp) => {
    let result = await Employee.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.put("/employee/:id", async (req, resp) => {
    let result = await Employee.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});

app.get("/search/:key", async (req, resp) => {
    let result = await Employee.find({
        "$or": [
            {
                name: { $regex: req.params.key }  
            },
            {
                email: { $regex: req.params.key }
            },
            {
                mobileNumber: { $regex: req.params.key }
            },
            {
                designation: { $regex: req.params.key}
            }
        ]
    });
    resp.send(result);
})

app.listen(5000, function() {
    console.log("Server is running port on 5000");
});