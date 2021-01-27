import {useFormik} from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.css';
import '../log.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ToggleButton } from 'react-bootstrap';

const Login=(props)=>{
       const formik=useFormik({
        initialValues:{
            email:'',
            password:'',
        },
        validationSchema:yup.object({
            email:yup.string()
            .email()
            .required("email is required"),
            password:yup.string()
            .required("password is required")
            .min(6,"minimum of 6 characters allowed")
            .max(10,"maximum of 10 caharcters allowed only"),
        }),
        onSubmit:(value)=>{
            console.log(value);
            axios.post("http://localhost:3002/app/login",value).then(res=>{
                console.log(res);
                localStorage.setItem('auth',JSON.stringify(res.data));
                props.history.push('/home');
            }).catch(err=>{
                toast.error(err.response.data);
            })
        }
    });
    const [hidden,Toggle]=useState(true);
    return <div className="container mt-5">
        <div className="jumbotron">
            <h4>Login</h4>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className="form-group">
            <label>Email:</label>
            <input className="form-control" type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}/>
            {formik.errors.email?<div className="text-danger">{formik.errors.email}</div>:null} 
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input className="form-control"
            type={hidden?'password':'text'}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            />
             <p id="p1" onClick={()=>{Toggle(!hidden)}}>show</p>
            {formik.errors.password?<div className="text-danger">{formik.errors.password}</div>:null} 
            </div>
            <button className="btn btn-primary">submit</button>
            <p id="l1">Don't have an account?<a href="#" onClick={()=>{
                window.location.href='register';
            }}>Register</a></p>
            
        </form>
    </div>
    </div>
}
export default Login