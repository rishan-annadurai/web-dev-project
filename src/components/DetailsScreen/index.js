import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import NavigationSidebar from "../NavigationSideBar";
import {API_KEY, API_URL} from "../constants";
import {Col, Container, Image, Row} from "react-bootstrap";
import {useNavigate} from "react-router";

const DetailsScreen = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [musicDetails, setMusicDetails] = useState({
        name: "",
        album: {name: "", images: [{url: ""}], artists: [""], external_urls: {spotify: ""}},
        artists: [""]
    });

    const [postCounter, setPostCounter] = useState(0);
    const [skipCount, setSkipCount] = useState(false);
    const [user, setUser] = useState({});
    const [song, setSong] = useState({});
    const [postContent, setPostContent] = useState("");

    const findMusicDetailsBySpotifyId = () => fetch(`https://api.spotify.com/v1/tracks/${params.id}`, {
        headers: {"Authorization": "Bearer " + API_KEY}
    }).then(res => res.json()).then(results => setMusicDetails(results));

    const getProfile = () => {
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(user => {
                setUser(user);
            }).catch(e => navigate('/login'));
        console.log(user.firstName)
    }

    const createPost = () => {
        setSkipCount(true)
        // setPostCounter(postCounter + 1);
        // console.log(user.id)
        let post = {
            posted: new Date(Date.now()),
            songTagline: musicDetails.name + " by " + musicDetails.artists[0].name,
            songImage: musicDetails.album.images[0].url,
            post: postContent,
            postedBy: user.username,
            userId: user.id
        }

        // create the post
        fetch(`${API_URL}/posts`, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'content-type': 'application/json'
            }
        }).then(status => navigate("/home"));
    }

    const addToPlaylist = () => {
        setSkipCount(true)
        // setPostCounter(postCounter + 1);
        // console.log(user.id)
        let playlist = {
            songTagline: musicDetails.name + " by " + musicDetails.artists[0].name,
            songImage: musicDetails.album.images[0].url,
            userId: user.id
        }

        // create the post
        fetch(`${API_URL}/playlist`, {
            method: 'POST',
            body: JSON.stringify(playlist),
            headers: {
                'content-type': 'application/json'
            }
        }).then(status => navigate("/profile"));
    }
    // const addToPlay list = () => {
    //     let song = {
    //         tagline: musicDetails.name + " by " + musicDetails.artists[0].name,
    //         image: musicDetails.album.images[0].url
    //     };
    //
    //     // get the user profile
    //     fetch(`${API_URL}/profile`, {
    //         method: 'POST',
    //         credentials: 'include'
    //     }).then(res => res.json())
    //         .then(user => setUser(user)).catch(e => navigate("/login"));
    //
    //     // update the user with the song in their playlist
    //     let updatedUser = {
    //         username: user.username,
    //         password: user.password,
    //         firstName: user.firstName,
    //         lastName: user.lastName,
    //         dateJoined: user.dateJoined,
    //         playlist: [song]
    //     };
    //
    //     // update the user
    //     fetch(`${API_URL}/users`, {
    //         method: 'PUT',
    //         body: JSON.stringify(updatedUser),
    //         headers: {
    //             'content-type': 'application/json'
    //         }
    //     }).then(res => res.json()).then(user => setUser(user));
    //
    // }

    useEffect(findMusicDetailsBySpotifyId, []);
    useEffect(() =>{
        if (skipCount) {
            getProfile()
        }}, [skipCount])
    return (
        <>
            <NavigationSidebar/>
            {/*{JSON.stringify(musicDetails)}*/}

            <Container className={"d-flex p-2 bd-highlight mt-3 ml-3 mr-3"}>
                <Row>
                    <img className={"ml-3 mr-3 mt-3"} alt={'song details'} src={musicDetails.album.images[0].url}
                         height={400}
                         width={400}/>
                </Row>

                <Row className={"m-3 ml-4"}>
                    <Col>
                        <Row>
                            <h1>
                                {musicDetails.name}
                            </h1>
                        </Row>

                        <Row>
                            <h4>
                                Album: {musicDetails.album.name}
                            </h4>
                        </Row>

                        <Row>
                            <h4>
                                Artists: {musicDetails.artists.map(a => a.name).join(", ")}
                            </h4>
                        </Row>

                        <Row>
                            <h4>
                                <a target="_blank" href={musicDetails.album.external_urls.spotify}> Click here to listen
                                    on Spotify</a>
                            </h4>
                        </Row>

                        <Row>
                            <button className={"btn btn-primary ml-3 mt-2"}
                                    style={{"width": 330}}
                                    onClick={addToPlaylist}>
                                Add to my playlist
                            </button>
                        </Row>

                        <Row>
                            {/*<input value={postContent} onChange={e => setPostContent(e.target.value)}>*/}
                            {/*    <input/>*/}
                            <Col>
                                <textarea
                                    value={postContent}
                                    style={{"width": 520, "height": 200}}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    placeholder="What do you think about this song?"
                                    className="form-control mt-4"/>

                                <button className={"btn btn-success mt-3"}
                                        style={{"width": 330}}
                                        onClick={createPost}>
                                    Post about this song
                                </button>
                            </Col>
                        </Row>

                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default DetailsScreen