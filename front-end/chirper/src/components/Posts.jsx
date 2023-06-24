import { useState, useEffect } from "react"
import axios from 'axios';
import '../styles/Post.css'
import { CommentSection } from "./CommentSection";

export const Posts = () => {
    const [posts, setPosts] = useState(null);
    const [chrip, setChirp] = useState('');

    const changeHandler = (event)=>{
        setChirp(event.target.value);
    }

    const chripPost = async ()=>{
        axios.post('http://localhost:3000/posts',{
            post:chrip
        },{withCredentials:true},{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(data=>{
            if(data.data.msg === 'success'){
                console.log(data.data)
                console.log('Post updated');
            }else{
                console.log('There were some errors');
            }
        }).catch(err=>{
            console.log('error')
        })
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/posts',{
            withCredentials:true
        })
        .then(data=>{
            console.log(data.data)
            setPosts(data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (
    <div>
        {
            posts ? <ul className="post-list">
                <li className="post-individual">
                    <textarea placeholder="What's happening?" value={chrip} onChange={changeHandler}></textarea>
                    <div className='chirp'>
                        <button onClick={chripPost}>Chirp</button>
                    </div>
                </li>
                {
                (posts.data.map(
                    post=>
                    <li key={post.post_id} className="post-individual">
                        <div className="post-name">
                            <div className="profile-image">
                                <i className="fa fa-user" aria-hidden="true"></i>
                            </div>
                            <div className="profile-name">
                                <span className="handle">{post.email}</span>
                                <div className="post-content">
                                    {post.posts}
                                </div>
                                <CommentSection comments={240} likes={120} shares={220} post_id={post.post_id}/>
                            </div>
                        </div>

                    </li>))
            }</ul>: 'Something went wrong'
        }
    </div>
  )
}
