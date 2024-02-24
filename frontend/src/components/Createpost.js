import React,{useState, useEffect} from 'react'
import "./Createpost.css"
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

export default function Createpost() {

    const loadfile = (event)=>{
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
        URL.revokeObjectURL(output.src);
        }
    }   
    
    const [body,setBody] = useState("");
    const [image,setImage] = useState("");
    const [url, setUrl] = useState("");
    const notifyA = (message)=> toast.error(message)
    const notifyB = (message)=> toast.success(message)
    const navigate=useNavigate();

    useEffect(() => {
      //saving  post to mongodb
        if(url){
            fetch("/createPost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization" :"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    body,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=>{if(data.error){
                notifyA(data.error)
            }else {
                notifyB("Successfully posted");
                navigate("/");
            }})
            .catch(err => console.log(err));
        }
    }, [url])
    

    //posting image to cloudinary
    const postDetails = () => {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "insta-clone");
        data.append("cloud_name", "girirajcloud");
    
        fetch("https://api.cloudinary.com/v1_1/girirajcloud/image/upload", {
            method: "post",
            body: data,
        })
        .then((res) => res.json())  // Add this return statement
        .then((data) => setUrl(data.url))
        .catch((err) => console.log(err));
    };
    

    return (
    <div className="createPost">

        <div className="post-header">
            <h4 style={{margin:"3px auto"}}>Create new Post</h4>
            <button id="post-btn" onClick={()=>{
                postDetails();
            }}>Share</button>
        </div>

        <div className="main-div">
        <img id="output" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/224px-Picture_icon_BLACK.svg.png?20180309172929" alt=""/>

            <input type="file" accept="image/*" onChange={(event)=>{
            loadfile(event)
            setImage(event.target.files[0])
            }} style={{margin:"0px 10px 10px 10px", border:"1px solid rgb(173,173,173)"}} />

        </div>

        <div className="details">

            <div className="card-header">
                <div className="card-pic">
                    <img src="https://plus.unsplash.com/premium_photo-1697729758146-9aa25d423094?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    <h5>Giriraj</h5>
                </div>
            </div>
                {/* caption */}
                <textarea 
                type="text" placeholder='Write a caption' value={body} onChange={(e)=>{setBody(e.target.value)}}></textarea>
        </div>

    </div>
  )
}
