import React,{useState, useEffect} from 'react'
import {Routes, Route,NavLink } from 'react-router-dom'
import '../styles/Header.css'
import { Posts } from './Posts'
import axios from 'axios'
import { Messages } from './Messages'
import { Notifications } from './Notifications'
import { Home } from './Home'

export const Header = () => {
    const [logout, setLogout] = useState(0);
    useEffect(()=>{
        console.log(logout)
        if(logout){
            axios.get('http://localhost:3000/logout',{
                withCredentials:true
            }).then(data=>{
                localStorage.removeItem('loggedIn');
                window.location.href='/'
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },[logout])
  return (
    <header className='header-container'>
        <nav className='nav-container'>
            <div className='logo'>
            <i className="fa-solid fa-dragon"></i>
            </div>
            <NavLink to='/'><i className="fa fa-home" aria-hidden="true"></i> Home</NavLink>
            <NavLink to='/posts'><i className="fa-solid fa-magnifying-glass"></i> Posts</NavLink>
            <NavLink to='/notifications'><i className="fa-regular fa-bell"></i> Notifications</NavLink>
            <NavLink to='/messages'><i className="fa-regular fa-message"></i> Messages</NavLink>
            <button id='chirp'>Chrip</button>
            <button id='logout' onClick={()=>{setLogout(!logout)}}>Logout</button>
        </nav>
        <div className='middle-container'>
            <div className='header-middle'>
                <p>Home</p>
                <div className='header-location'>
                    <span>Me</span>
                    <span>Others</span>
                </div>
            </div>
            <div className='posts'>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/posts' element={<Posts />}></Route>
                        <Route path='/messages' element={<Messages />}></Route>
                        <Route path='/notifications' element={<Notifications />}></Route>
                    </Routes>
                </div>
        </div>
    </header>
  )
}
