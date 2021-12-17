import React from 'react';

const HomeScreen = () => {
    return (
        <div className={"m-5"}>
            <h1 style={{"fontSize": 111, "fontStyle": "bold"}}>
                Welcome to Playlist.
            </h1>

            <p style={{"fontSize": 40, "fontStyle": "normal", "textAlign": "left"}}>
                Here, you can be more than just a listener. Browse new songs using the Search page.
                Or, discuss your favorite songs in the Profile page.
            </p>
        </div>
    );
};

export default HomeScreen;