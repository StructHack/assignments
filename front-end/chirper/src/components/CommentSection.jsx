import React, { useEffect, useState } from 'react'
import '../styles/CommentSection.css'
import axios from 'axios';

export const CommentSection = ({comments, likes, shares, post_id}) => {
  const [del, setDelete] = useState(0);

  useEffect(()=>{
   if(del){
      axios.get(`http://localhost:3000/deletePost/${post_id}`,{withCredentials:true})
    .then(data=>{
      console.log(data.data)
    })
    .catch(err=>{
      if(err.response.data.status === 'fail' ){
        console.log('No permission')
      }
    })
   }
  },[del])
  return (
    <div className='comment-container'>
        <span><i className="fa-regular fa-comment"></i>{comments}</span>
       <span><i className="fa-regular fa-thumbs-up"></i>{likes}</span>
       <span><i className="fa-solid fa-share"></i>{shares}</span>
       <i class="fa-solid fa-trash-can" onClick={()=>{setDelete(!del)}}></i>
    </div>
  )
}
