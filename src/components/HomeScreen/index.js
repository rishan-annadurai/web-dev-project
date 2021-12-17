import React, {useEffect, useState} from 'react';
import NavigationSidebar from "../NavigationSideBar";
import HomeScreenPage from "./HomeScreen";
import {Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {API_URL} from "../constants";
import {useNavigate} from "react-router";

const HomeScreen = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    const goToUserProfile = (user) => navigate(`/profile/${user}`);

    const fetchPosts = () => {
        fetch(`${API_URL}/posts`,
            {
                method: 'GET'
            }).then(res => res.json()).then(fetchedPosts => setPosts(fetchedPosts.reverse()));
    }

    useEffect(fetchPosts, []);
    return(
        <>
            <NavigationSidebar/>
            <HomeScreenPage/>

            <ListGroup variant={"ml-5 mr-3"}>
                <h1 className={"ml-5"} style={{"fontSize": 41, "fontStyle": "bold"}}>
                    Recent posts
                </h1>
                {posts.map(p =>
                    <ListGroupItem className={"ml-5 mr-5 mb-5 mt-2"} key={p._id}>
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
        </>
    );
};

export default HomeScreen;