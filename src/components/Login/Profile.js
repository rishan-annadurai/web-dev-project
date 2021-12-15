import React, {useCallback} from 'react';
import {useEffect, useState} from "react";
import {API_URL} from "../constants";
import {useNavigate} from "react-router";
import NavigationSidebar from "../NavigationSideBar";
import {useParams} from "react-router-dom";


const Profile = () => {
    const params = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const getProfile = () => {
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(user => {
                setUser(user);
                // navigate(`/profile/${user.username}`);
            }).catch(e => navigate('/login'));
    }
    const logout = () => {
        fetch(`${API_URL}/logout`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => navigate('/'));
    }

    const updateDetails = () => {
        fetch(`${API_URL}/users`, {
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json()).then(user => setUser(user));
    }

    useEffect(getProfile, [navigate]);
    return (
        <div>
            <NavigationSidebar/>
            <div className={"mt-5 ml-5"}>
                <h1 style={{"fontSize": 81, "fontStyle": "bold"}}>
                    Welcome, {user.firstName}.
                </h1>

                <h1 className={"mt-3"} style={{"fontSize": 41, "fontStyle": "bold"}}>
                    Change your personal details
                </h1>

                <div >
                    <h1 style={{"display": "inline-block", "fontSize": 31, "fontStyle": "bold"}}>
                        Username:
                    </h1>
                    <input
                        value={user.username}
                        style={{"width": 250, "display": "inline-block"}}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        placeholder="Change your username"
                        className="form-control ml-3"/>
                </div>

                <div >
                    <h1 style={{"display": "inline-block", "fontSize": 31, "fontStyle": "bold"}}>
                        First name:
                    </h1>

                    <input
                        value={user.firstName}
                        style={{"width": 250, "display": "inline-block"}}
                        onChange={(e) => setUser({...user, firstName: e.target.value})}
                        placeholder="Update your first name"
                        className="form-control ml-3"/>
                </div>

                <div >
                    <h1 style={{"display": "inline-block", "fontSize": 31, "fontStyle": "bold"}}>
                        Last name:
                    </h1>

                    <input
                        value={user.lastName}
                        style={{"width": 250, "display": "inline-block"}}
                        onChange={(e) => setUser({...user, lastName: e.target.value})}
                        placeholder="Update your last name"
                        className="form-control ml-3"/>
                </div>


                <div >
                    <h1 style={{"display": "inline-block", "fontSize": 31, "fontStyle": "bold"}}>
                        Password:
                    </h1>

                    <input
                        value={user.password}
                        type={"password"}
                        style={{"width": 250, "display": "inline-block"}}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        placeholder="Change your password"
                        className="form-control ml-4"/>
                </div>

                <div>
                    <button
                        onClick={logout}
                        style={{"width": 150}}
                        className="btn btn-danger mt-3">
                        Logout
                    </button>

                    <button
                        className="btn btn-warning mt-3 ml-4"
                        style={{"width": 150}}
                        onClick={updateDetails}>
                        Update
                    </button>
                </div>

                <h1 className={"mt-5"} style={{"fontSize": 41, "fontStyle": "bold"}}>
                    Your playlist:
                </h1>
            </div>

        </div>
    );
};
export default Profile;