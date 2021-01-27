const express = require ('express');
const app = express();
const mongoose = require ('mongoose');


require('dotenv').config({path:'./config/.env'})

const port = process.env.PORT;

app.use(express.json());

mongoose.connect(process.env.MONGO_URl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( ()=>console.log("Database connected"))
    .catch((err)=>console.log(err))

    const User = require ("./models/User");

    app.post("/api/add_user", (req,res)=>{
        const {name, age, email } = req.body;
        const newUser = new User({name, age, email });
        newUser
        .save()
        .then((user)=>res.send({msg:"user added",user}))
        .catch((err)=>res.status(404).send({msg:"il y a erreur",err}))
    });

    app.get("/api/users", (req,res)=>{
        User.find()
        .then((users)=>res.send({msg:"get all users",users}))
        .catch((err)=>res.status(404).send({msg:"il y a erreur",err}));
    });
    
    app.put('/api/users/:userID', (req,res)=>{
        const id=req.params.userID;
        User.findByIdAndUpdate (id, req.body, {new:true})
        .then((user)=>res.send({msg:"user updated",user}))
        .catch((err)=>res.status(400).send({msg:"une erreur",err}))
    })

    app.delete('/api/users/:userId', (req,res)=>{
        const id = req.params.userId
        User.findByIdAndRemove (id)
        .then((user)=>
            res.send({msg:"user deleted",user}))
        .catch((err)=>res.status(400).send({msg:"une erreur",err}))
    })


app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})