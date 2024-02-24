import React,{useEffect,useState}  from 'react'
import "./Home.css"
import {useNavigate} from 'react-router-dom';

export default function Home() {
  
  const navigate = useNavigate();
  const [data, setdata] = useState([]);

  useEffect(() => {
    const token=localStorage.getItem("jwt");
    if(!token){
      navigate("./signin");
    }

    //fetching all posts
    fetch("/allposts",{
      headers:{
        "Authorization":"Bearer "+token
      }
    }).then(res => res.json())
    .then(result => setdata(result))
    .catch(err => console.log(err))

  }, [])
  

  const likePost = (id)=>{
    const token=localStorage.getItem("jwt");
    fetch("http://localhost:5004/like",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token
      },
      body:JSON.stringify({
        postId:id
      })
    })
    .then(res=>res.json())
    .then((result)=>{
      const newData=data.map((posts)=>{
        if(posts._id===result._id){
          return result;
        }
        else{
          return posts;
        }
      })
      setdata(newData);
    })
  }

  const unlikePost = (id)=>{
    const token=localStorage.getItem("jwt");
    fetch("http://localhost:5004/unlike",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token
      },
      body:JSON.stringify({
        postId:id
      })
    })
    .then(res=>res.json())
    .then((result)=>{
      const newData=data.map((posts)=>{
        if(posts._id===result._id){
          return result;
        }
        else{
          return posts;
        }
      })
      setdata(newData);
    })
  }

  return (
    <div className="home">
      {/*card*/}
      {data.map((posts)=>{
                    return (
                      <div className="card">
                  {/* card-header */}
                <div className="card-header">
                  <div className="card-pic">
                    <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                  </div>
                  <h5>{posts.postedBy.name}</h5>

                </div>
                {/* cardimahe */}
                <div className="card-image">  
                <img src={posts.photo} alt="" />
                </div>

                {/* card content */}
                <div className="card-content">
                {
                  posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)?
                <span className="material-symbols-outlined material-symbols-outlined-red" onClick={()=>{unlikePost(posts._id)}}>
            favorite
                </span>
                :
                <span className="material-symbols-outlined"
                onClick={()=>{likePost(posts._id)}}>
            favorite
                </span> 
                }
                <p className='likestext'>{posts.likes.length} Likes</p> 
                <p>{posts.body}</p>
                
                </div>
                  <div className="add-comment">
                  <span className="material-symbols-outlined">
            mood
            </span>
            <input type="text" placeholder='add a comment' />
            <button className='comment'>Post</button>
                  </div>

                </div>
        )
      })}
      
    </div>
  )
}
