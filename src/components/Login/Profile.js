import React, {useCallback} from 'react';
import {useEffect, useState} from "react";
import {API_URL} from "../constants";
import {useNavigate} from "react-router";
import NavigationSidebar from "../NavigationSideBar";
import {useParams} from "react-router-dom";
import {Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";


const Profile = () => {
    const params = useParams();
    const [updatedUser, setUpdatedUser] = useState({username: "", password: "", firstName: "", lastName: "", accountType: ""});
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [verifiedStatus, setVerifiedStatus] = useState("");
    const [refreshProfile, setRefreshProfile] = useState(0);
    const navigate = useNavigate();
    const getProfile = () => {
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(fUser => {
                setUser(fUser);
                setUpdatedUser(fUser);
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
            body: JSON.stringify(updatedUser),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json()).then(user => setUser(user));
        logout();
    }

    const fetchPosts = () => {
        fetch(`${API_URL}/posts`,
            {
                method: 'GET'
            }).then(res => res.json()).then(fetchedPosts => setPosts(fetchedPosts.filter(p => p.postedBy == user.username)));
    }

    const fetchPlaylist = () => {
        fetch(`${API_URL}/playlists`,
            {
                method: 'GET'
            }).then(res => res.json()).then(fetchedPlaylist => setPlaylist(fetchedPlaylist.filter(p => p.userId == user.id)));
        console.log(playlist)
    }


    useEffect(getProfile, [navigate, refreshProfile]);
    useEffect(fetchPosts, [user]);
    useEffect(fetchPlaylist, [user]);
    return (
        <div>
            <NavigationSidebar/>
            <div className={"mt-5 ml-5"}>
                <h1 style={{"fontSize": 81, "fontStyle": "bold"}}>
                    Welcome, {user.firstName}.
                </h1>

                <h1 className={"mt-3"} style={{"fontSize": 41, "fontStyle": "bold"}}>
                    Account type: {user.accountType}
                </h1>

                <h1 className={"mt-3"} style={{"fontSize": 41, "fontStyle": "bold"}}>
                    Change your personal details
                </h1>

                <h1 className={"mb-2"} style={{"fontSize": 27, "color": "gray"}}>
                    You will have to login again
                </h1>

                <div>
                    <h1 style={{"display": "inline-block", "fontSize": 31, "fontStyle": "bold"}}>
                        Username:
                    </h1>
                    <input
                        value={updatedUser.username}
                        style={{"width": 250, "display": "inline-block"}}
                        onChange={(e) => setUpdatedUser({...updatedUser, username: e.target.value})}
                        placeholder="Change your username"
                        className="form-control ml-3"/>
                </div>

                <div>
                    <h1 style={{"display": "inline-block", "fontSize": 31, "fontStyle": "bold"}}>
                        First name:
                    </h1>

                    <input
                        value={updatedUser.firstName}
                        style={{"width": 250, "display": "inline-block"}}
                        onChange={(e) => setUpdatedUser({...updatedUser, firstName: e.target.value})}
                        placeholder="Update your first name"
                        className="form-control ml-3"/>
                </div>

                <div>
                    <h1 style={{"display": "inline-block", "fontSize": 31, "fontStyle": "bold"}}>
                        Last name:
                    </h1>

                    <input
                        value={updatedUser.lastName}
                        style={{"width": 250, "display": "inline-block"}}
                        onChange={(e) => setUpdatedUser({...updatedUser, lastName: e.target.value})}
                        placeholder="Update your last name"
                        className="form-control ml-3"/>
                </div>


                <div>
                    <h1 style={{"display": "inline-block", "fontSize": 31, "fontStyle": "bold"}}>
                        Password:
                    </h1>

                    <input
                        value={updatedUser.password}
                        type={"password"}
                        style={{"width": 250, "display": "inline-block"}}
                        onChange={(e) => setUpdatedUser({...updatedUser, password: e.target.value})}
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
                    Your posts:
                </h1>
                <ListGroup variant={"ml-5 mr-3"}>
                    {/*{console.log(JSON.stringify(posts))}*/}
                    {posts.map(p =>
                        <ListGroupItem className={"ml-5 mr-5 mb-5 mt-2"} key={p.id}>
                            <Container fluid={"auto"}>
                                <Row>
                                    <Col md={"auto"}>
                                        <img alt={'thumbnail'} src={p.songImage} height={200} width={200}/>
                                    </Col>

                                    <Col className={"d-flex"}>
                                        <Row>
                                            <div>
                                                <h1 style={{"fontSize": 21, "fontStyle": "bold", "color": "gray"}}>
                                                    Posted by
                                                    <a href={`./profile/${p.postedBy}`} style={{"color": "gray"}}>
                                                        { " " + p.postedBy + " "}
                                                    </a>
                                                    on {new Date(p.posted).toDateString()} at {new Date(p.posted).toLocaleTimeString()}
                                                    <br/>
                                                    Song: {p.songTagline}
                                                </h1>
                                                <h1 style={{"fontSize": 21, "fontStyle": "bold"}}>
                                                    {p.post}
                                                </h1>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroupItem>)}
                </ListGroup>

                <h1 className={"mt-5"} style={{"fontSize": 41, "fontStyle": "bold"}}>
                    Your playlist:
                </h1>
                <ListGroup variant={"ml-5 mr-3"}>
                    {/*{console.log(JSON.stringify(posts))}*/}
                    {playlist.map(p =>
                        <ListGroupItem className={"ml-5 mr-5 mb-5 mt-2"} key={p.id}>
                            <Container fluid={"auto"}>
                                <Row>
                                    <Col md={"auto"}>
                                        <img alt={'thumbnail'} src={p.songImage} height={200} width={200}/>
                                    </Col>

                                    <Col className={"d-flex"}>
                                        <Row>
                                            <div>
                                                <h1 style={{"fontSize": 21, "fontStyle": "bold", "color": "gray"}}>
                                                    Song: {p.songTagline}
                                                </h1>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroupItem>)}
                </ListGroup>
            </div>

        </div>
    );
};
export default Profile;