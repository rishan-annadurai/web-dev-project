import React from 'react';
import './App.css';
// import '../src/vendors/bootstrap/css/bootstrap.min.css';
// import '../src/vendors/bootstrap/bootstrap.min.css';
// import '../src/vendors/fontawesome/css/all.min.css';

import {Route, Routes} from "react-router";
// import NavigationSidebar from "./components/NavigationSideBar";
import HomeScreen from "./components/HomeScreen";
import SearchScreen from "./components/SearchScreen";
import DetailsScreen from "./components/DetailsScreen";
import {BrowserRouter} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Profile from "./components/Login/Profile";
import PrivacyScreen from "./components/PrivacyScreen/index";
import PublicProfile from "./components/Login/PublicProfile"


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/home" element={<HomeScreen/>}/>
                <Route path="/search" element={<SearchScreen/>}/>
                <Route path="/search/:searchTerm" element={<SearchScreen/>}/>
                <Route path="/details/:id" element={<DetailsScreen/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/profile/:profileId" element={<PublicProfile/>}/>
                <Route path="/privacy" element={<PrivacyScreen/>}/>
            </Routes>


            {/*<Route path={"/search"} exact={true}>*/}

            {/*</Route>*/}

            {/*<Route path={"/details"} exact={true}>*/}

            {/*</Route>*/}

            {/*<Route path={"/profile"} exact={true}>*/}

            {/*</Route>*/}

            {/*<Route path={"/login"} exact={true}>*/}

            {/*</Route>*/}
        </BrowserRouter>
    );
}

export default App;
