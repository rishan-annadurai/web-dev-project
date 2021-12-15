import React from 'react';

const HomeScreen = () => {
    return (
        <div className={"m-5"}>
            <h1 style={{"font-size": 111, "font-style": "bold"}}>
                Welcome to Playlist.
            </h1>

            <p style={{"font-size": 40, "font-style": "normal", "text-align": "left"}}>
                Here, you can be more than just a listener. Browse new songs using the Search page.
                Or, discuss your favorite songs in the Profile page.
            </p>
        </div>
    );
};

export default HomeScreen;