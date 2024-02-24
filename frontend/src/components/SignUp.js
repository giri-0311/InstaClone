import React from 'react'
import logo from "../img/logo.png"
import "../components/SignUp.css"
import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";
import { toast } from 'react-toastify';


export default function SignUp() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const notifyA = (message)=> toast.error(message)
  const notifyB = (message)=> toast.success(message)
  const navigate=useNavigate();
  const emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const passRegex=/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

  const postData=()=>{
    //checking email
    if(!emailRegex.test(email)){
       notifyA("email is not valid")
       return
    }
    else if(!passRegex.test(password)){
      notifyA("password must contain minimum eight characters, at least one letter and one number and one special character")
      return
    }
    //Sending data to server

    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        userName:userName,
        password:password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        notifyA(data.error);
      }
      else{
        notifyB(data.message);
        navigate("/signin");
      }
      console.log(data)});
  }


  return (
    <div className="SignUp">
      <div className="form-container">
      <div className="form">
      <img className="signupLogo" src={logo} alt="" />
        <p className="loginpara">
          Sign up to see photos and videos <br/> from your friends
        </p>
        <div className='itemstogether'>


              <input
        type="text"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Corrected
        placeholder="Email"
      />
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)} // Corrected
        placeholder="FullName"
      />
      <input
        type="text"
        name="username"
        id="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)} // Corrected
        placeholder="UserName"
      />
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Corrected
        placeholder="PassWord"
      />



        </div>


        <p className="loginpara" style={{fontSize:"12px",margin:"10px 0px", color:"black"}}>
          By Signing Up , you agree to our terms <br/>privacy and cookies.
        </p>


        <input type="submit" id='submit-btn' value="Sign Up" onClick={()=>{postData()}} />


      </div>
      <div className="form2">
        Already Have an Account? 
        <Link to="/signin">
        <span style={{fontSize:"16px", color:'blue',}}> SignIn</span>
        </Link>
      </div>
      </div>
    </div>
  )
}
