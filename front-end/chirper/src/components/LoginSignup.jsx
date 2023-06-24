import React, { useEffect, useState } from 'react'
import '../styles/ls.css'
import axios from 'axios'

export const LoginSignup = (props) => {

    const [user, setUser] = useState({
        username:'',
        email:'',
        password:'',
        phone_number:''
    });

    const changeHandler = (event)=>{
        setUser({...user, [event.target.name]:event.target.value})
    }
    
    const loginSubmit = async (event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/login',{
            email: user.email,
            password: user.password
        },{withCredentials:true},{
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(data=>{
            console.log(data)
            if(data.data.status == 'success'){
                props.setloggedIn(!props.loggedIn);
                localStorage.setItem('loggedIn',1);
            }
        })
    }


    const signupSubmit = async (event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/signup',{
            username: user.username,
            email: user.email,
            password: user.password,
            phone_number: user.phone_number
        },{withCredentials:true},{
            headers:{
                'Content-Type': 'application/json',
            }
        })
        .then(data=>{
            console.log(data)
            if(data.data.status == 'success'){
                alert('Successfully Signed up')
            }
        })
    }

  return (
    <div className='loginsignup-container'>
        <div className='signup-container'>
            <h2>Sign up</h2>
            <form onSubmit={signupSubmit}>
                <label htmlFor='username'>Username</label><br />
                <input type="text" name="username" id="username" placeholder='username' onChange={changeHandler} required/>
                <br />
                <label htmlFor='email'>Email</label><br />
                <input type="email" name="email" id="email" placeholder='user@example.com'  onChange={changeHandler} required/>
                <br />
                <label htmlFor='password'>Password</label><br />
                <input type='password' name='password' id='password' placeholder='password'  onChange={changeHandler} required/>
                <br />
                <label htmlFor='phone_number'>Phone</label><br />
                <input type='tel' name='phone_number' id='phone_number' placeholder='+977 9854635245'  onChange={changeHandler} required/>
                <br />
                <input type='submit' value='Signup'/>
            </form>
        </div>
        <div className='login-container'>
        <h2>Login</h2>
            <form onSubmit={loginSubmit}>
                <label htmlFor='email_login'>Email</label><br />
                <input type="email" name="email" id="email_login" placeholder='user@example.com'  onChange={changeHandler} required/>
                <br />
                <label htmlFor='password_login'>Password</label><br />
                <input type='password' name='password' id='password_login' placeholder='password'  onChange={changeHandler} required/>
                <br />
                <input type='submit' value='Login'/>
            </form>
        </div>
    </div>
  )
}
