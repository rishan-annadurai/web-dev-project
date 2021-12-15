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

    const [user, setUser] = useState({});
    const [song, setSong] = useState({});

    const findMusicDetailsBySpotifyId = () => fetch(`https://api.spotify.com/v1/tracks/${params.id}`, {
        headers: {"Authorization": "Bearer " + API_KEY}
    }).then(res => res.json()).then(results => setMusicDetails(results));

    const createSong = () => {
        fetch(`${API_URL}/songs`, {
            method: 'POST',
            body: JSON.stringify(song),
            headers: {
                'content-type': 'application/json'
            }
        }).then(status => status);
    }
    const addToPlaylist = () => {
        let song = {
            tagline: musicDetails.name + " by " + musicDetails.artists[0].name,
            image: musicDetails.album.images[0].url
        };

        // get the user profile
        fetch(`${API_URL}/profile`, {
            method: 'POST',
            credentials: 'include'
        }).then(res => res.json())
            .then(user => setUser(user)).catch(e => navigate("/login"));

        // update the user with the song in their playlist
        let updatedUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            dateJoined: user.dateJoined,
            playlist: [song]
        };

        // update the user
        fetch(`${API_URL}/users`, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: {
                'content-type': 'application/json'
            }
        }).then(res => res.json()).then(user => setUser(user));

    }

    useEffect(findMusicDetailsBySpotifyId, []);
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

                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default DetailsScreen