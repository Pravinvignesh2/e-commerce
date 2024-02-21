import React from 'react';
import {Link} from 'react-router-dom';

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <form action="/AllProduct">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                </form>
                <div className="links my-3">
                    <p>Don't have an account? <Link to="/Register">Sign up</Link></p>
                    <p>Forgot password? <a href="#">Reset password</a></p>
                </div>
            </div>
            <div className="background-shapes"></div>
        </div>
    );
}


