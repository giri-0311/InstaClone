import Navbar from './components/navbar.jsx'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./components/Home.js";
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import Profile from './components/Profile.js';
import "../src/App.css"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './components/Createpost.js';
import React,{createContext,useState} from "react";
import {LoginContext} from "./context/LoginContext.js"
import Modal from "./components/Modal.js"

function App() {
  const [userLogin, setuserLogin] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <BrowserRouter>
    <LoginContext.Provider value={{ setuserLogin,setModalOpen }}>
    <Navbar login={userLogin} />
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/createpost" element={<Createpost/>}></Route>
    </Routes>
    <ToastContainer theme="dark"/>
    {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
    </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
