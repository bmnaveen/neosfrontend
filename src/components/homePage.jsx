import React, { useState } from 'react'
import { useEffect } from 'react';
const HomePage = ({setToggle}) => {
const [add,setAdd]=useState(false)
const [todoData,setTodoData]=useState({
    Todo:"",
    Date:"",
    User:JSON.parse(sessionStorage.getItem("id"))
})
    useEffect(()=>{
        let v=JSON.parse(sessionStorage.getItem("id"));
        if(v==null){
            setToggle(false)
        }
    },[])

const changetodoData=(e)=>{
    e.preventDefault();
    const {id,value}=e.target;
    
    setTodoData({...todoData,[id]:value})
}

const fetchAddTodo=(e)=>{
e.preventDefault();
for(let x in todoData){
    if(todoData[x].length<=0 || todoData[x]==null ){
        alert("Empty Fields");
        return;
    }
}
let requestOptions = {
    body: JSON.stringify(todoData),
    method:"POST",
};
fetch("https://todo-neos.herokuapp.com/addtodo", requestOptions).then(function(u){ 
    return  u.json();
 })
 .then(function(j) { 
    console.log(j)
 }).catch((err)=>{
     alert("Something went wrong try again")
     console.log(err)
     return
 });

}

  return (
    <div>
<button onClick={()=>{
    setAdd(!add)
}}>{add ? "Cancel" : "Create Todo"}</button>

<div>
    {
        add ? <div className='signIn'>
        <label >Todo:</label>
        <br />
        <input  onChange={changetodoData} id='Todo' type="text" />
        <br />
        <label >Date:</label>
        <br />
        <input onChange={changetodoData}   type={"date"} id="Date" />
        <br />
        <div className='signOption'> <button onClick={fetchAddTodo} >Add Todo</button></div>
    </div> : <div>

        </div>
    }
</div>

    </div>
  )
}

export default HomePage