import React, {useEffect, useState} from 'react';
import NavigationSidebar from "../NavigationSideBar";
import {useNavigate, useParams} from "react-router";
import {API_URL} from "../constants";
import {Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";

const PublicProfile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const userProfile = params.profileId;
    const [user, setUser] = useState({username: "", accountType: ""});
    const [posts, setPosts] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [displayMessage, setDisplayMessage] = useState("");

    const getUserProfile = () => {
        fetch(`${API_URL}/profile/${userProfile}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(user => {
                setUser(user);
                setDisplayMessage(`${user.username}'s posts`)
            }).catch(e => setDisplayMessage("Uh oh, user not found.")
        );
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

    useEffect(getUserProfile, []);
    useEffect(fetchPosts, [user]);
    useEffect(fetchPlaylist, [user]);
    return (
        <>
            <div>
                <NavigationSidebar/>
                <div className={"mt-5 ml-5"}>
                    <h1 style={{"fontSize": 81, "fontStyle": "bold"}}>
                        {displayMessage}
                    </h1>
                    <h1 className={"mt-3"} style={{"fontSize": 41, "fontStyle": "bold"}}>
                        Account type: {user.accountType}
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


                </div>
            </div>

        </>
    );
}

export default PublicProfile;