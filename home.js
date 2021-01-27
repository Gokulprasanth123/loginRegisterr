import React from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';



const Home=(props)=>{
    const myStyle={
        float:"right",
        borderRadius:"25%",
        backgroundColor:"blue",
        color:"white"
    }
    return <div>
        <h1 style={{textAlign:"center"}}>HOME PAGE</h1>
        <button style={myStyle} onClick={()=>{localStorage.clear();props.history.push('/login')}}>logout</button>
    </div>
}

export default Home