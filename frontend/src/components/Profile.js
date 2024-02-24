import React,{useEffect,useState} from 'react'
import "./Profile.css"

export default function Profile() {

  const [pic, setpic] = useState([])

  useEffect(() => {
    fetch("/myposts",{
      headers:{
        Authorization:"Bearer "+localStorage.getItem("jwt")
      }
    })
    .then(res=>res.json())
    .then((result) =>{
      setpic(result);
    });
  }, [])
  

  return (
    <div className="profile">
      {/* Profile frame */}
        <div className="profile-frame">
          <div className="profile-pic">
            <img src="https://plus.unsplash.com/premium_photo-1697729758146-9aa25d423094?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="profile-data">
            <h1>Giriraj</h1>
            <div className="profile-info" style={{display:"flex"}}>
              <p>40 Posts </p>
              <p>40 Followers </p>
              <p>40 Following</p>
            </div>
          </div>
        </div>
        <hr style={{width:"90%",
        margin:"25px auto",
        opacity:"0.8"}} />
        <div className="gallery">
          {pic.map((pics)=>{
            return <img key={pics._id} src={pics.photo}></img>
          })}
        </div>
    </div>
  )
}
