import React, { useContext } from 'react';
import logo from "../img/logo.png";
import "../components/navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from '../context/LoginContext';

export default function Navbar({ login }) {
  const { setModalOpen } = useContext(LoginContext);

  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createpost">
            <li>Create Post</li>
          </Link>
          <Link to={""}>
            <button className='primaryBtn' onClick={() => { setModalOpen(true) }}>Log Out</button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signup">
            <li>SignUp</li>
          </Link>
          <Link to="/signin">
            <li>SignIn</li>
          </Link>
        </>
      );
    }
  };

  return (
    <div className="navbar">
      <img src={logo} alt="" />
      <div></div>
      <div></div>
      <ul>
        {loginStatus()}
      </ul>
    </div>
  );
};
