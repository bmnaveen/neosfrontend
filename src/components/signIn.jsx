import React, { useEffect, useState } from 'react'

const SignIn = ({setToggle}) => {
    const [signUp,setSignUp]=useState(false);
    const [user,setUser]=useState({
        Email:"",
        Mobile:""
    })
const createUser=(e)=>{
    e.preventDefault();
const {id,value}=e.target;

setUser({...user,[id]:value})
}

useEffect(()=>{
    let v=JSON.parse(sessionStorage.getItem("id"));
    if(v!=null){
        setToggle(true)
    }
},[])

const fetchData=()=>{
    
    for(let x in user){
        if(user[x].length<=0){
            alert("Empty Fields");
            return;
        }
    }

    let requestOptions = {
        body: JSON.stringify(user),
        method:"POST",
    };
    if(signUp){
        fetch("https://todo-neos.herokuapp.com/register", requestOptions).then(function(u){ 
           return  u.json();
        })
        .then(function(j) { 
            if(j!="null"){
                sessionStorage.setItem("id",JSON.stringify(j))
                setToggle(true)
            }else{
                alert("Invalid Detailes or User already exist")
                return;
         }
           
        }).catch((err)=>{
            alert("Something went wrong try again")
            console.log(err)
            return
        });
          
    }else{
        
        fetch("https://todo-neos.herokuapp.com/signin", requestOptions).then(function(u){ 
           return  u.json();
        })
        .then(function(j) { 
            if(j!="null"){
                sessionStorage.setItem("id",JSON.stringify(j))
                setToggle(true)
            }else{
                alert("Invalid Detailes or User already exist")
                return;
         }
             sessionStorage.setItem("id",JSON.stringify(j))
        }).catch((err)=>{
            alert("Something went wrong try again")
            console.log(err)
            return;
        });;
    }


  
}

const  reqSign=(e)=>{
e.preventDefault();
fetchData()

 
}
  return (
    <div className='signIn'>
        <label >Email:</label>
        <br />
        <input onChange={createUser} id='Email' type="email" />
        <br />
        <label >Phone number:</label>
        <br />
        <input onChange={createUser} type="tel" id="Mobile" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>
        <br />
        <div className='signOption'> <button onClick={reqSign}>{signUp ? "signUp" :  "SignIn" }</button><label>Create account:</label><input onClick={(e)=>{
           e.target.checked ?  setSignUp(true):setSignUp(false)
        }} type="checkbox" /></div>
    </div>
  )
}

export default SignIn