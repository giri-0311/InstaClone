import React from 'react'
import {RiCloseLine} from "react-icons/ri"
import "./Modal.css"
import { useNavigate } from 'react-router-dom'

export default function Modal({setModalOpen}) {

    const navigate=useNavigate();

  return (
    <div className="darkBg" onClick={()=>{setModalOpen(false)}}>
        <div className="centered">
        <div className="modal">
        <div className="modalHeader">
            <h5 className='heading'>Confirm</h5>
        </div>
        <button className='closeBtn'
        onClick={()=>{setModalOpen(false)}}>
                <RiCloseLine></RiCloseLine>
        </button>
        <div className="modalContent">
            Do you really want to log out?
        </div>
        <div className="modelActions">
            <div className="actionsContainer">
                <button className='logoutBtn'
                onClick={()=>{
                    setModalOpen(false);
                    localStorage.clear();
                    navigate("./signin");
                }}>Logout</button>
                <button className='cancelbtn' onClick={()=>{setModalOpen(false)}}>Cancel</button>
            </div>
        </div>
    </div>
    </div>
    </div>
    
  )
}
