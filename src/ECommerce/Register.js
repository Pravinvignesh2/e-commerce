import React, { createContext } from 'react';
import { useContext, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Header from './Header';
import context from './context';
import contextCreate from './context';
import { UserProvider } from './context';
import AllProduct from './AllProduct';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Register(){

        
      
        const [formData, setFormData] = useContext(contextCreate);
        const [username, setUserName] = useState(' ');
        const [email, setEmail] = useState(' ');
       
        const userNameFun = (e)=>{
            setUserName(e.target.value);
        }
        const userEmailFun = (e)=>{
            setEmail(e.target.value);
        }
    
        const handleInput = ()=>{
                setFormData({...formData,username,email});
             }
        
        const onClick = ()=>{
            handleInput(); 
            
        }

    return(
        <>
        <form action="/AllProduct" id="form">
            <div className="form-group">
                <label>username:</label>
                <input type="text" className="form-control " name="username" placeholder="Enter Your Name" value={username} onChange={userNameFun} required></input>
            </div>

            <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" placeholder="Enter your Email id" name="email" value={email} onChange={userEmailFun}></input>
            </div>

            <div className="form-group">
                <label>Mobile:</label>
                <input type="text" className="form-control" placeholder="Enter your Mobile Number"></input>
            </div>

            <div className="form-group">
                <label>Password:</label>
                <input type="text" className="form-control" placeholder="Enter The Password"></input>
            </div>

           <div className='btnn'><Link to="/AllProduct"> <button type="button" onClick={onClick} className="btn btn-info">Register</button></Link></div>

           
           
        </form>

        

        </>
    )
}