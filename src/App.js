import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
firebase.initializeApp(firebaseConfig);

function App() { 
  const [user,setUser] = useState ({
  isSignedIn:false,
  name:'',
  email:'',
  photo:''

  })


  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
     const {displayName,email,photoURL} =res.user;
    const isSignedInuser ={
      isSignedIn:true,
      name:displayName,
      email:email,
      photo:photoURL
    }
    setUser(isSignedInuser);
    })
    .catch(err =>{
      console.log(err);
      console.log(err.message);
      
      

    })
  }
  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res =>{
    const signedOutUser = {
      isSignedIn: false,
      name:'',
      photo:'',
      email:'',
      passwoed:'',
     isValid:false
    
    }

    setUser(signedOutUser);
    console.log(res);     
  })
  .catch(err =>{
    
  })
} 
  const is_valid_email = email => /(.+))@(.+){2,}\.(.+){2,}/.test(email);
   const hasNumber = input =>/\d/.test(input);
  const handleChange = event =>{
    const newUserInfo = {
      ...user
    };

    //
    let isValid = true;
    if(event.target.name === 'email'){
      isValid = is_valid_email(event.target.value);
    }
    if(event.target.name = "password"){
    isValid = event.target.value >8 && hasNumber(event.target.value);
      
    }

//

    newUserInfo[event.target.name] = event.target.value;
    newUserInfo.isValid = isValid;
    setUser(newUserInfo);
    
  }
   const createAccount = () => {
   if(user.isValid){
    console.log(user.email,user.password);
   }
   
    
   }
  return (
    <div className="App">
       {  
          user.isSignedIn ? <button onClick={handleSignOut} >Sign out</button> :

         <button onClick={handleSignIn} >Sign in</button>
         
       }
      {
        user.isSignedIn &&
         <div>
            <h1>Welcome {user.name}</h1>
            <p>Your email: {user.email}</p>
           <img src={user.photo} />
         </div>
      }
    <h1>Our own Authentication</h1>
    <form onSubmit={createAccount}>
    <input type="text" onBlur={handleChange} name="email"placeholder="your Email" required/>
    <br/>
    <input type="password" onBlur ={handleChange} name="password" placeholder="Your Password" required/>
    <br/>
    <input type="submit" value="create Account"/>
    </form>
    </div>
  );
}

export default App;
