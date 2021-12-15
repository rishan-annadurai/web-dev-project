import React from 'react';
import NavigationSidebar from "../NavigationSideBar";

const PrivacyScreen = () => {
    return (
        <>
            <NavigationSidebar/>
            <div className={"mt-5 ml-5"}>
                <h1 style={{"font-size": 81, "font-style": "bold"}}>
                    About privacy
                </h1>

                <p style={{"font-size": 40, "font-style": "normal", "text-align": "left"}}>
                    This website does not collect any personal details other than those which are provided during
                    registration of your account, and those shared through posting about or adding songs to your playlist.
                </p>
            </div>
        </>
    );
}

export default PrivacyScreen;