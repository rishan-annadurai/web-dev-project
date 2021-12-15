import React, {useEffect, useState} from 'react';
import NavigationSidebar from "../NavigationSideBar";
import {useNavigate, useParams} from "react-router";
import {API_URL} from "../constants";

const PublicProfile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const userProfile = params.profileId;
    const [user, setUser] = useState({});
    const [displayMessage, setDisplayMessage] = useState("");

    const getUserProfile = () => {
        fetch(`${API_URL}/profile/${userProfile}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(user => {
                setUser(user);
                setDisplayMessage(`${user.username}'s playlist`)
            }).catch(e => setDisplayMessage("Uh oh, user not found.")
        );
    }
    useEffect(getUserProfile, []);
    return (
        <>
            <div>
                <NavigationSidebar/>
                <div className={"mt-5 ml-5"}>
                    <h1 style={{"fontSize": 81, "fontStyle": "bold"}}>
                        {displayMessage}
                    </h1>

                    <h1 style={{"fontSize": 41, "fontStyle": "bold"}}>
                        Hi
                    </h1>
                </div>
            </div>

        </>
    );
}

export default PublicProfile;