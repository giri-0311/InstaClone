import React from 'react'
import logo from "../img/logo.png"
import  {Link ,useNavigate} from "react-router-dom"
import "../components/SignIn.css"
import {useState , useContext}  from 'react';
import { toast } from 'react-toastify';
import { LoginContext } from '../context/LoginContext';


export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const notifyA = (message)=> toast.error(message)
  const notifyB = (message)=> toast.success(message)
  const {setuserLogin}=useContext(LoginContext)

  const loginData = ()=>{
    fetch("/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        notifyA(data.error);
      }
      else{
        notifyB(data.message);
        localStorage.setItem("jwt",data.token);
        localStorage.setItem("user",JSON.stringify(data.user));
        setuserLogin(true);
        navigate("/");
      }
    }
    )
  }

  return (

    <div className="SignUp">
      <div className="form-container">
      <div className="formx">
      <img className="signupLogo" src={logo} alt="" />
        <p className="loginpara">
          Sign In to see photos and videos <br/> from your friends
        </p>
        <div className='itemstogether'>
          <input type="text"
          name='email' id='email' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
          <input type="password"
          name='password' id='password'
          placeholder='PassWord' 
          value={password} onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <input type="submit" id='submit-btn' value="Sign In"  onClick={()=>{loginData()}}/>
      </div>
      <div className="form2">
        Don't Have an Account? 
        <Link to="/signup">
        <span style={{fontSize:"16px", color:'blue'}}> SignUp</span>
        </Link>
      </div>
      </div>
    </div>
  )
}
