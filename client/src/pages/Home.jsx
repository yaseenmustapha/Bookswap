import React from 'react';
import Header from '../components/Header'
import YourListings from '../components/YourListings'
import SearchBar from '../components/SearchBar'
import useAuthCookie from '../Utils/useAuthCookie';

function Home() {
    const [isAuthenticated,] = useAuthCookie();
    
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