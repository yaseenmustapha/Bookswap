import React from 'react';
import Header from '../Components/Header'
import YourListings from '../Components/YourListings'
import SearchBar from '../Components/SearchBar'
import { useAuth } from '../Hooks/useAuth';

function Home() {
    const {isAuthenticated} = useAuth()
    
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