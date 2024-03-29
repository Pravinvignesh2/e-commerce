import React, { createContext } from 'react';
import { useContext, useState , useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Header from './Header';
import context from './context';
import contextCreate from './context';
import { UserProvider } from './context';
import AllProduct from './AllProduct';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaRunning, FaWindows } from 'react-icons/fa';



export default function Register(){

        
      
        const [formData, setFormData] = useContext(contextCreate);
        const [username, setUserName] = useState(' ');
        const [email, setEmail] = useState(' ');
        const [userId, setUserId] = useState(null);

        const [users, setUsers] = useState([]);

        const navigate = useNavigate();

        
   
        useEffect(
            ()=>{

                axios.get('https://fakestoreapi.com/users')
                .then(
                    (response) =>{
                        setUsers(response.data);
                    }
                    )
                 .catch((err) =>{ console.log(err)})   
            },[]
        )
       
        const userNameFun = (e)=>{
            setUserName(e.target.value);
        }
        const userEmailFun = (e)=>{
            setEmail(e.target.value);
        }

        // const Run = ()=>{
            
            
        //     console.log("USERId " + userId);
        //    setFormData({...formData, username , email, userId});             
        //     navigate("/AllProduct");
        // }

        // useEffect(() => {

        //    const Run = ()=>{
            
            
        //     console.log("USERId " + userId);
        //     setFormData({...formData, username , email, userId});             
        //     navigate("/AllProduct");
        //    }

        //    if( userId !==null || userId !== undefined || userId !=="  "){
        //       Run();
        //     }
        //     console.log("UserId state after settinggggggg:", userId);
        // }, [userId]);
    
        
        // const handleInput = (e) => {
        //     e.preventDefault();

            
        //     const existingUser = users.find((user) => user.email === email);
        //     if (existingUser) {
        //         console.log("IDDDDDDDDD " + existingUser.id);
        //          setUserId(existingUser.id);
        //         console.log("UserId state after setting:", userId);
                
        //     } else {
        //         console.log("User not found");
        //         // Handle the case when the user is not found, such as showing an error message.
        //     }
        

        
        // }

    const handleInput = (e) => {
    e.preventDefault();

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        console.log("IDDDDDDDDD " + existingUser.id);
        setUserId(existingUser.id);
        setUserName(existingUser.username);

        
    } else {
        console.log("User not found");
        
    }
}

useEffect(() => {
        if (userId !== null) {
            console.log("USERId " + userId);
            setFormData({ ...formData, username, email, userId });
            navigate("/AllProduct");
        }
    }, [userId]);

        
        

    return(
        <>
        <form action="/AllProduct" id="form" onSubmit={handleInput}>
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

           <div className='btnn'> <button type="submit"  className="btn btn-info">Register</button></div>

           
           
        </form>

        

        </>
    )
}