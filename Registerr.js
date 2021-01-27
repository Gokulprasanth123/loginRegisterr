import {useFormik} from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.css';
import '../log.css';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react';
const Register=(props)=>{
    const formik=useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            confirmPassword:''
        },
        validationSchema:yup.object({
            name:yup.string()
            .required("name is required")
            .min(6,"minimum 6 characters is required")
            .max(15,"maximum 15 characters allowed")
            .strict()
            .trim(),
            email:yup.string()
            .email()
            .required("email is required"),
            password:yup.string()
            .required("password is required")
            .min(6,"minimum of 6 characters allowed")
            .max(10,"maximum of 10 caharcters allowed only"),
            confirmPassword:yup.string()
            .required("confirm password is required")
            .oneOf([yup.ref('password'),null],"confirm password and password must be same")
        }),
        onSubmit:(value)=>{
            console.log(value);
            axios.post("http://localhost:3002/app/register",value).then((res)=>{
                props.history.push('/login');
            }).catch(err=>{
                toast.error(err.response.data);
            })
        }
    });
    const [hidden,toggle]=useState(true);
    const [show,showToggle]=useState(true);
    return <div className="container mt-5">
        <div className="jumbotron">
            <h4>Register</h4>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <div className="form-group">
            <label>Name:</label>
            <input className="form-control" type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}/>
            {formik.errors.name?<div className="text-danger">{formik.errors.name}</div>:null }
            </div>
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
            <input className="form-control" type={hidden?'password':'text'}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}/>
            {formik.errors.password?<div className="text-danger">{formik.errors.password}</div>:null} <p class="p2" onClick={()=>{toggle(!hidden)}}>show</p>
            </div>
            <div className="form-group">
            <label>Confirm password:</label>
            <input className="form-control" type={show?'password':'text'}
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}/>
            {formik.errors.confirmPassword?<div className="text-danger">{formik.errors.confirmPassword}</div>:null} <p class="p2" onClick={()=>{showToggle(!show)}}>show</p>
            </div>
            <button className="btn btn-primary">submit</button>
            <p id="l1">already have an account?<a href="#" onClick={()=>{
                window.location.href='login';
            }}>Login</a></p>
        </form>
    </div>
    </div>
}

export default Register