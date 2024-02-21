import React, { useState } from 'react';
// import React from 'react';
// import { useHistory, useNavigate } from 'react-router-dom';
import {useNavigate, useParams} from 'react-router-dom';

export default function Register(){

    
       //useHistory
        // const [formData, setFormData] = useState({username:" ",email:" "});
        // const history= useHistory();   //works like a Link tag but can pass values

        // const handleInput = (e)=>{
        //     setFormData({...formData,[e.target.name] : e.target.value});
        // }

        // const submit =(e)=>{
        //     e.preventDefault();
        //     history.push("/HomePage",formData);
        // }

        // const navigate = useNavigate();
        const [formData, setFormData] = useState({username:" ",email:" "});

        const handleInput = (e)=>{
                setFormData({...formData,[e.target.name] : e.target.value});
             }

        // const submit =(e)=>{
        //              e.preventDefault();
        //             navigate(`/HomePage?param1=${formData.username}&param3=${formData.email}`);
                    
        //  }     

    return(

        <form action="/AllProduct" id="form">
            <div className="form-group">
                <label>username:</label>
                <input type="text" className="form-control " name="username" placeholder="Enter Your Name" value={formData.username} onChange={handleInput} required></input>
            </div>

            <div className="form-group">
                <label>Email:</label>
                <input type="email" className="form-control" placeholder="Enter your Email id" name="email" value={formData.email} onChange={handleInput}></input>
            </div>

            <div className="form-group">
                <label>Mobile:</label>
                <input type="text" className="form-control" placeholder="Enter your Mobile Number"></input>
            </div>

            <div className="form-group">
                <label>Password:</label>
                <input type="text" className="form-control" placeholder="Enter The Password"></input>
            </div>

           <div className='btnn'> <button className="btn btn-info">Register</button></div>
           
        </form>
    )
}