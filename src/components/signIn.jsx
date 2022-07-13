import React, { useEffect, useState } from 'react'

const SignIn = () => {
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

const fetchData=async()=>{
    let requestOptions = {
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
       },
        body: JSON.stringify(user),
        method:"POST",
        
    };
    if(signUp){
       await fetch('http://localhost:3333/register', requestOptions)
            .then(response =>{
console.log(response.json())
            }).catch((err)=>{
                console.log(err)
            })  
    }else{
        await fetch('http://localhost:3333/signin', requestOptions)
            .then(response =>{
console.log(response.json())
            }).catch((err)=>{
                console.log(err)
            }) 
    }
}

const reqSign=(e)=>{
e.preventDefault();
fetchData();
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
        <div className='signOption'> <button onClick={reqSign}>SignIn</button><label>Create account:</label><input onClick={(e)=>{
           e.target.checked ?  setSignUp(true):setSignUp(false)
        }} type="checkbox" /></div>
    </div>
  )
}

export default SignIn