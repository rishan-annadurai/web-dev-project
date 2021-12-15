import React from 'react';
import {useNavigate} from "react-router";
import {useState} from "react";
import {API_URL} from "../constants";
import NavigationSidebar from "../NavigationSideBar";

const Login = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const login = () => {
        fetch(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(status => {
            navigate('/profile')
        });
    }
    return (
        <div>
            <NavigationSidebar/>

            <div className={"mt-5 ml-5"}>
                <h1 style={{"font-size": 81, "font-style": "bold"}}>
                    Login
                </h1>
            </div>

            <input
                value={user.username}
                style={{"width": 250, "margin": "auto"}}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username"
                className="form-control"/>
            <input
                value={user.password}
                style={{"width": 250, "margin": "auto"}}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"
                type="password"
                className="form-control"/>
            <button
                className="btn btn-primary"
                style={{
                    "marginTop": 50,
                    "width": 150,
                    "position": "absolute",
                    "left": "50%",
                    "transform": "translateX(-50%)"
                }}
                onClick={login}>
                Login
            </button>
        </div>
    );
};
export default Login;