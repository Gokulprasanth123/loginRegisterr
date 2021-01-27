
import React from 'react';
import Login from './components/login.js';
import Register from './components/Registerr.js';
import {Switch,Route} from 'react-router-dom';
import Protected from './components/protected.js';
import Home from './components/home.js';
import {ToastContainer} from 'react-toastify';
const App=()=>{
    return  <div>
           <Switch>
               <Route exact path="/" component={Login}/>
               <Route exact path="/login" component={Login}/>
               <Route path="/register" component={Register}/>
               <Protected path="/home" component={Home}/>
           </Switch>
           <ToastContainer/>
        </div>

}

export default App