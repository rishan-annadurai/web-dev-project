import React from 'react';
import {useNavigate} from "react-router";
import {useState} from "react";
import {API_URL} from "../constants";
import NavigationSidebar from "../NavigationSideBar";
import {FormControl, FormCheck, FormSelect} from "react-bootstrap";


const Register = () => {
    const [user, setUser] = useState({username: '', password: '', firstName: '', lastName: ''});
    const navigate = useNavigate();
    const register = () => {
        fetch(`${API_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(status => navigate('/profile'));
    };
    return (
        <div>
            <NavigationSidebar/>
            <div className={"mt-5 ml-5"}>
                <h1 style={{"font-size": 81, "font-style": "bold"}}>
                    Register
                </h1>
            </div>

            <input
                value={user.username}
                style={{"width": 250, "margin": "auto"}}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Enter your username"
                className="form-control mb-3"/>
            <input
                value={user.password}
                style={{"width": 250, "margin": "auto"}}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Enter your password"
                type="password"
                className="form-control mb-3"/>
            <input
                value={user.firstName}
                style={{"width": 250, "margin": "auto"}}
                onChange={(e) => setUser({...user, firstName: e.target.value})}
                placeholder="Enter your first name"
                className="form-control mb-3"/>
            <input
                value={user.lastName}
                style={{"width": 250, "margin": "auto"}}
                onChange={(e) => setUser({...user, lastName: e.target.value})}
                placeholder="Enter your last name"
                className="form-control mb-3"/>


            <FormSelect style={{"width": 250, "margin": "auto"}} aria-label="Default select example">

                <option>Select an account type</option>
                <option value="1">Listener</option>
                <option value="2">Artist</option>
            </FormSelect>

            <button
                className="btn btn-primary"
                style={{
                    "marginTop": 75,
                    "width": 150,
                    "position": "absolute",
                    "left": "50%",
                    "transform": "translateX(-50%)"
                }}
                onClick={register}>
                Register
            </button>
        </div>
    );
};
export default Register;