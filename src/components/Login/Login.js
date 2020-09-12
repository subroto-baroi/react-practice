import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login () {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser]=useState({
    isSignedIn: false,
    name:'',
    email:'',
    password:'',
    photo:''
  });
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true)
    })
  }
  const fbSignIn = () => {
    handleFbSignIn()
    .then(res => {
      handleResponse(res, true)
    })
  }

  const signOut=() => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false)
    })
  }
  const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
          history.replace(from);
        }
  }

  
  const handleBlur = (e) =>{    
   let isFieldValid = true;
    if(e.target.name === 'email'){
       isFieldValid=/\S+@\S+\.\S+/.test(e.target.value)
      
    }
    if(e.target.name === 'password'){
      const isPasswordValid=e.target.value.length>8;
      const passwordHasNumber =/\d{1}/.test(e.target.value)      
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
    }

    e.preventDefault();

  }
  

  return (
    <div style={{textAlign:'center', marginTop:'20px'}}>
      <h3 className='bg-secondary text-warning'>Our Own Authentication</h3>
      <h5>Sign in using</h5>      
      <br/>
      {
        user.isSignedIn ? <Button className="btn btn-primary" onClick={signOut}>Sign out using google</Button>:
        <button className="btn btn-primary" onClick={googleSignIn}> Google</button>
      }
      <br/><br/>
      <button className="btn btn-warning" onClick={fbSignIn}>Facebook</button>
      <br/>
      {
        user.isSignedIn && <div>
          <p className='text-info'>Welcome, {user.name}</p>
          <p className='text-warning'>Your email : {user.email} </p>
          <img className="img-thumbnail" src={user.photo} alt=""/>
        </div> 
      }
      <hr/>
           
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {
          newUser && <input onBlur={handleBlur}  className="btn btn-white border border-warning" name="name" type="text" placeholder="Your Name"/>
        }            
      <br/> <br/>
       
      <input className="btn btn-white border border-success" name="email" onBlur={handleBlur} type="text" placeholder="Your email address" required/>
      <br/><br/>
      <input className="btn btn-white border border-warning" name="password" onBlur={handleBlur} type="password"  placeholder="Your password" required/>
      <br/> <br/>       
      <button className="btn btn-info rounded-pill">{newUser ? 'sign up' : 'sign in'} </button>
      </form>
      <p className="text-danger">{user.error} </p>
      {
        user.success && <p className="text-success">User {newUser ? "created" : "Logged In"}  successfully </p>
      }
    </div>
  );
}

export default Login;
