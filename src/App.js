import './App.css';
import React from "react";
import { UserProvider } from "./context/UserContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signin from './components/Signin';
import Signup from './components/Signup';
import Addproducts from './components/Addproducts';
import Makepayment from './components/Makepayment';
import Getgames from './components/Getgames';
// Import Bootstrap classes
import 'bootstrap/dist/css/bootstrap.min.css'
import Homepage from './components/Homepage';
function App() {
  return (
    <UserProvider>

    <Router>
    {/* <div className="App"> 
      <header className="App-header">
      <h1 className='header'>ToyTopia</h1>
      </header>     */}
      {/* Routes  */}
      <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/addproducts' element={<Addproducts/>}/>
          <Route path='/' element={<Homepage/>}/>    
          <Route path='/getgames' element={<Getgames/>}/>
          <Route path='/makepayment' element={<Makepayment/>}/>
      </Routes>
    {/* </div> */}
    </Router>
      </UserProvider>
  );
}

export default App;
