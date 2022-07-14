import logo from './logo.svg';
import './App.css';
import SignIn from './components/signIn';
import HomePage from './components/homePage';
import { useState } from 'react';
function App() {
  const [toggle,setToggle]=useState(false);
  return (
    <div className="App">
      {toggle ?<HomePage setToggle={setToggle}/> :<SignIn setToggle={setToggle}/>}
      
    </div>
  );
}

export default App;
