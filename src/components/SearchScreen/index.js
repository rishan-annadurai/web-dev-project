import React, {useEffect, useState} from 'react';
import "../../vendors/bootstrap/bootstrap.min.css"
import "../../vendors/bootstrap/css/bootstrap.min.css"
import {Link} from "react-router-dom";
import {useNavigate, useParams} from "react-router";
import {API_KEY} from "../constants";
import NavigationSidebar from "../NavigationSideBar";
import {Button, Col, Container, Form, FormControl, ListGroup, ListGroupItem, Row} from "react-bootstrap";
// import {Button, Form, FormControl} from "react-bootstrap";


const SearchScreen = () => {
    const params = useParams();
    const musicTitle = params.searchTerm || "christmas"
    // const [music, setMusic] = useState({tracks: {items: [{id: "", name: "", album: {images: [{url: ""}, {url: ""}]}, artists: [{name: ""}],}]}})
    const [music, setMusic] = useState(
        {
            tracks: {
                items: [{
                    id: "",
                    name: "",
                    album: {
                        images: [{
                            url: ""
                        },
                            {url: ""}]
                    },
                    artists: [{
                        name: ""
                    }]

                }]
            }
        })
    const [searchTerm, setSearchTerm] = useState(musicTitle)
    const navigate = useNavigate();
    const findMusic = () => {
        fetch(`https://api.spotify.com/v1/search?type=album,artist,track&limit=50&q=${searchTerm}`, {
            headers: {"Authorization": "Bearer " + API_KEY}
        }).then(res => res.json()).then(results => setMusic(results))
        navigate(`/search/${searchTerm}`);
    }

    useEffect(findMusic, [])

    return (
        <div>
            <NavigationSidebar/>

            <h1 className={"mt-5 ml-5"} style={{"font-size": 81, "font-style": "bold"}}>
                Search your favorite songs
            </h1>

            {/*{JSON.stringify(music)}*/}

            <Form className="d-flex p-4" md={"4"}>
                <FormControl
                    type="search"
                    placeholder="Search for songs"
                    className="me-2"
                    aria-label="Search"
                    onChange={event => {
                        setSearchTerm(event.target.value)
                    }}

                    onSubmit={event => {
                        setSearchTerm(event.target.value)
                    }}

                    value={searchTerm}
                />
                <Button onClick={findMusic} variant="outline-success">Search</Button>
            </Form>

            {/*<input className={"d-flex me-3"} type={"text"}*/}
            {/*       onChange={event => {*/}
            {/*           setSearchTerm(event.target.value)*/}
            {/*       }}*/}
            {/*       onSubmit={e => findMusic()}*/}
            {/*       value={searchTerm}/>*/}
            {/*/!*{JSON.stringify(music)}*!/*/}
            {/*<button className={"me-4"} onClick={findMusic}> Search</button>*/}

            <ListGroup variant={"ml-3 mr-3"}>
                {music.tracks.items.map(m =>
                    <ListGroupItem key={m.id}>
                        <Link to={`/details/${m.id}`}>
                            <Container fluid={"auto"}>
                                <Row>
                                    <Col md={"auto"}>
                                        <img alt={'thumbnail'} src={m.album.images[1].url} height={100} width={100}/>
                                    </Col>

                                    <Col className={"d-flex"}>
                                        {m.name} by {m.artists[0].name}
                                    </Col>
                                </Row>
                            </Container>

                        </Link>
                    </ListGroupItem>)}
            </ListGroup>

            {/*<ul>*/}
            {/*    {music.tracks.items.map(m =>*/}
            {/*        <li key={m.id}>*/}
            {/*            <Link to={`/details/${m.id}`}>*/}
            {/*                <img alt={'thumbnail'} src={m.album.images[1].url} height={100} width={100}/>*/}

            {/*                {m.name} by {m.artists[0].name}*/}
            {/*            </Link>*/}
            {/*        </li>)}*/}
            {/*</ul>*/}
        </div>

    );

}

export default SearchScreen