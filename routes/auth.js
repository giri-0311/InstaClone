const express=require("express");
const router =express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require("bcrypt")

//json requirements 
const jwt =  require("jsonwebtoken");
const {Jwt_secret} =  require("../keys");

router.post("/signup",(req,res)=>{
    const {name,userName,email,password} = req.body;

    if(!name || !userName || !email || !password){
        return res.status(422).json({error:"Please add all the fields"});
    }

    USER.findOne({$or:[{email:email},{userName:userName}]}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User Already exists with email or userName"})
        }
        bcrypt.hash(password,12).then((hashedPassword)=>{
            const user = new USER({
                name,
                email,
                userName,
                password:hashedPassword
            })
            user.save()
            .then(user =>
                res.json({message:"saved successfully"})
            )
            .catch(err=>console.log(err))
        })
        
    });

})

router.post("/signin",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please enter email and password"})
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({
                error:"Email is not registered"
            })
        }
        bcrypt.compare(password,savedUser.password).then((match)=>{
            if(match){
                const token=jwt.sign({_id:savedUser.id},Jwt_secret);
                const {_id,name,email,userName} = savedUser;
                res.status(200).json({
                    token:token,
                    message:"Signed in succesfully",
                    user:{_id,name,email,userName}
                });
            }
            else{
                return res.status(422).json({
                    error:"password does not match"
                })
            }
        })
    })
})

module.exports = router;
