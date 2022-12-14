import React from 'react';
import Header from '../components/Header'
import YourListings from '../components/YourListings'
import SearchBar from '../components/SearchBar'
import { useCookies } from 'react-cookie';

function Home() {
    const [cookies,] = useCookies(["jwt", "username"]);
    const isAuthenticated = !!cookies.jwt

    return (
        <div>
            <Header />
            <div className="row" style={{paddingTop: "50px", paddingBottom: "50px"}}>
                <div className="col-md-3"></div>
                <div className="col-md-6 col-md-offset-3">
                    <SearchBar />
                </div>
                <div className="col-md-3"></div>
            </div>
            {isAuthenticated && <YourListings />}
            
        </div>
        
    );
}

export default Home;