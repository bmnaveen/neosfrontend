import React, { useState } from 'react'
import { useEffect } from 'react';
const HomePage = ({setToggle}) => {
    const Today=new Date()
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
     
    
    let accDate=formatDate(Today);
    
const [add,setAdd]=useState(false)
const [todoData,setTodoData]=useState({
    Todo:"",
    Date:"",
    User:JSON.parse(sessionStorage.getItem("id"))
})
const [getTodo,setGetTodo]=useState([]);
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
        alert("Empty Fields or invalid date format");
        return;
    }
}
if(todoData["Date"]<accDate){
    alert("Empty Fields or invalid date format");
    return;
}
let requestOptions = {
    body: JSON.stringify(todoData),
    method:"POST",
};
//https://todo-neos.herokuapp.com/addtodo
fetch("https://todo-neos.herokuapp.com/addtodo", requestOptions).then(function(u){ 
    return  u.json();
 })
 .then(function(j) { 
    
    window.location.reload()
 }).catch((err)=>{
     alert("Something went wrong try again")
     console.log(err)
     return
 });

}


useEffect(()=>{
    let v=JSON.parse(sessionStorage.getItem("id"));
    if(v!=null){
        fetchGetTodo(v)
    }
},[])

const fetchGetTodo=(v)=>{
    let requestOptions = {
        method:"POST",
        body:JSON.stringify({
            "Id":v
        })
    };
    fetch(`https://todo-neos.herokuapp.com/gettodo`, requestOptions).then(function(u){ 
        return  u.json();
     })
     .then(function(j) { 
        
        setGetTodo(j)
     }).catch((err)=>{
         console.log(err)
         return
     });
}
const deleteTodo=(v,e)=>{
    e.preventDefault()
    let requestOptions = {
        method:"POST",
        body:JSON.stringify({
            "totoId":v,
            "userId":JSON.parse(sessionStorage.getItem("id"))
        })
    };
    fetch("https://todo-neos.herokuapp.com/deletetodo", requestOptions).then(function(u){ 
    return  u.json();
 })
 .then(function(j) { 
   
    if(j=="Acess Deniend"){
        alert("Acess Deniend")
    }
 }).catch((err)=>{
     alert("Something went wrong try again")
     console.log(err)
     return
 });
}
  return (
    <div>
<button className='butto' onClick={()=>{
    setAdd(!add)
}}>{add ? "Cancel" : "Create Todo"}</button>

<div>
    {
        add ? <div className='createTodo'>
        <label >Todo:</label>
        <br />
        <input  onChange={changetodoData} id='Todo' type="text" />
        <br />
        <label >Date:</label>
        <br />
        <input onChange={changetodoData}   type={"date"} min={accDate} id="Date" />
        <br />
        <div className='signOption'> <button onClick={fetchAddTodo} >Add Todo</button></div>
    </div> :null
    }
</div>
<>
{
    getTodo.length>=1 ? <table className='mainTable'>
    <tr>
        <th>NO</th>
        <th>Title</th>
        <th>Scheduled Date</th>
        <th>Status</th>
    </tr>
    
{
    getTodo.map((x,i)=>{
        return <tr>
<td>{i+1}</td>
<td>{x.Todo}</td>
<td>{x.Date}</td>
<td>{x.Date==accDate ? "Alive" :x.Date<accDate ? "Expired" : "Upcoming"}</td>
<td><button onClick={(e)=>{
    deleteTodo(x.id,e)
}}>Delete</button></td>
        </tr>
    }) 
}
        </table> :<h2>Nothing to show</h2>
}
</>

    </div>
  )
}

export default HomePage