import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const Protected=({component,...rest})=>{
    let RenCom=component;
    let hasToken=JSON.parse(localStorage.getItem('auth'));
    console.log(hasToken);
    return <Route
    {...rest}
    render={
        props=>{
            return hasToken!=null ?(<RenCom {...props}/>):(<Redirect to={{
                pathname
                :"/login"
            }}/>)
        }
    }
    />
}

export default Protected