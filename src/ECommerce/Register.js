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
import { useSelector, useDispatch } from 'react-redux';
import { namebar1, id, emailOfUser, contactOfUser, cart } from './slice';
// import { useRouteId } from 'react-router/dist/lib/hooks';
// import { useDispatch, useSelector } from 'react-router';



export default function Register() {

    const [ username, setUserName] = useState('');
    const [userpassword, setUserPassword] = useState('');
    const [userInputPassword, setUserInputPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userInputEmail,setUserInputEmail]=useState('');
    const [contact, setContact] = useState(0);
    const [userId, setUserId] = useState(null);
    const [users, setUsers] = useState([]);
    const name = useSelector((state) => state.namebar1.value);
    // const [cartProductsDispatch, setCartProductsDispatch] = useState([]);

    console.log(userInputEmail, userInputPassword, email, userpassword);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://fakestoreapi.com/users')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //cart dispatch to store
    useEffect(
        ()=>{

        if( userId ){ 
            axios.get(`https://fakestoreapi.com/carts/user/${userId}`).
            then((response)=>{
                console.log("car",response.data);
                response.data.map(
                    (item)=>{
                       item.products.map(
                        product => {
                            dispatch(cart({"productId":product.productId,"quantity":product.quantity}));
                        }
                       )
                    }
                )
            })
            .catch((error)=>{ console.log("error ",error)})
        }
        },[userId]
    )


    const userNameFun = (e) => {
        
        setUserName(e.target.value);
    };

    const userEmailFun = (e) => {
        // setEmail("");
        setUserInputEmail(e.target.value);
    };

    const userPasswordFun=(e)=>{
        setUserInputPassword(e.target.value)
    }

    

    const handleRegister = (e) => {
        e.preventDefault();
        console.log(userInputEmail, email , userInputPassword, userpassword)
        if( userInputEmail && email && (userInputEmail===email && userInputPassword===userpassword) ){
            dispatch(namebar1(username));
            dispatch(id (userId));
            dispatch(emailOfUser(email));
            console.log("email ",email);
            dispatch(contactOfUser(contact));
            navigate('/AllProduct/'+"All");
           } 

           else{
            document.getElementById("error").innerHTML="enter valid email and password.<br/> Here use this john@gmail.com and m38rmF$";
           }
        
    };

    
    useEffect(
        ()=>{
           
        //  console.log(inputpassword);
        if (userInputEmail ) {

            const existingUser = users.find((user) => user.email === userInputEmail);
                if (existingUser) {
                
                    setUserId(existingUser.id);
                    setUserName(existingUser.username);
                    setUserPassword(existingUser.password);
                    setEmail(existingUser.email);
                    setContact(existingUser.phone);
                
                } else {
                    console.log("User not found");
                }
            
        }      
        },[userInputEmail,userInputPassword]
    )

    return (
        <>
            <form id="form" >
                {/* <div className="form-group">
                    <label>username:</label>
                    <input type="text" className="form-control" name="username" placeholder="Enter Your Name" value={username} onChange={userNameFun} required />
                </div> */}

                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your Email id" name="email" value={userInputEmail} onChange={userEmailFun} />
                </div>

                {/* <div className="form-group">
                    <label>Mobile:</label>
                    <input type="text" className="form-control" placeholder="Enter your Mobile Number" />
                </div> */}

                <div className="form-group">
                    <label>Password:</label>
                    <input type="text" id="password" className="form-control" placeholder="Enter The Password" value={userInputPassword} onChange={userPasswordFun}/>
                </div>
                
                {/* <div className="form-group"> */}
                <p id="error"  style={{color:"red"}}></p>
                {/* </div> */}
                

                <div className="btnn">
                    <button type="submit" className="btn btn-info" onClick={handleRegister}>Login</button>
                </div>
            </form>
        </>
    );
}

// export default function Register(){

        
      
//         // const [formData, setFormData] = useContext(contextCreate);
//         const [username, setUserName] = useState(' ');
//         const [email, setEmail] = useState(' ');
//         const [userId, setUserId] = useState(null);
//         const name= useSelector( (state)=> state.namebar.value);
//         const dispatch = useDispatch();

//         const [users, setUsers] = useState([]);

//         const navigate = useNavigate();

        
   
//         useEffect(
//             ()=>{

//                 axios.get('https://fakestoreapi.com/users')
//                 .then(
//                     (response) =>{
//                         setUsers(response.data);
//                     }
//                     )
//                  .catch((err) =>{ console.log(err)})   
//             },[]
//         )
       
//         const userNameFun = (e)=>{
//             setUserName(e.target.value);
//         }
//         const userEmailFun = (e)=>{
//             setEmail(e.target.value);
//         }

//         const existingUser = users.find((user) => user.email === email);
//         if (existingUser) {
//             console.log("IDDDDDDDDD " + existingUser.id);
//             setUserId(existingUser.id);
//             setUserName(existingUser.username); 
            
//         } else {
//             console.log("User not found");
            
//         }
     


//     const handleInput = (e) => {
//     e.preventDefault();
//     if(username){
//     dispatch(existingUser.username);
//     }
//     }      

//     return(
//         <>
//         <form action="/AllProduct" id="form" onSubmit={handleInput}>
//             <div className="form-group">
//                 <label>username:</label>
//                 <input type="text" className="form-control " name="username" placeholder="Enter Your Name" value={username} onChange={userNameFun} required></input>
//             </div>

//             <div className="form-group">
//                 <label>Email:</label>
//                 <input type="email" className="form-control" placeholder="Enter your Email id" name="email" value={email} onChange={userEmailFun}></input>
//             </div>

//             <div className="form-group">
//                 <label>Mobile:</label>
//                 <input type="text" className="form-control" placeholder="Enter your Mobile Number"></input>
//             </div>

//             <div className="form-group">
//                 <label>Password:</label>
//                 <input type="text" className="form-control" placeholder="Enter The Password"></input>
//             </div>

//            <div className='btnn'> <button type="submit"  className="btn btn-info">Register</button></div>

           
           
//         </form>

        

//         </>
//     )
// }



// useEffect(() => {
//         if (userId !== null) {
//             console.log("USERId " + userId);
//             setFormData({ ...formData, username, email, userId });
//             navigate("/AllProduct");
//         }
//     }, [userId]);
