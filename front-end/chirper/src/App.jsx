import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { useEffect, useState } from 'react'
import { LoginSignup } from './components/LoginSignup'

function App() {
  const [loggedIn, setloggedIn] = useState(0);
  useEffect(()=>{
      if(localStorage.getItem('loggedIn') == null){
        setloggedIn(loggedIn)
      }else if(localStorage.getItem('loggedIn') == 1){
        console.log(123)
        setloggedIn(!loggedIn);
      }
  },[])
  return (
    <Router>
      <div className='main-container'>
        {!loggedIn ? <LoginSignup LoggedIn={loggedIn} setloggedIn={setloggedIn}/>
          :<Header />}
      </div>    
    </Router>
  )
}

export default App
