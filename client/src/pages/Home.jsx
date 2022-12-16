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
            <div style={{paddingTop: "50px", paddingBottom: "50px"}}>
                <SearchBar />
            </div>
            {isAuthenticated && <YourListings />}
            
        </div>
        
    );
}

export default Home;