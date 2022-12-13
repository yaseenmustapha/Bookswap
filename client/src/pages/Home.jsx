import React from 'react';
import Header from '../components/Header'
import YourListings from '../components/YourListings'
import SearchBar from '../components/SearchBar'

function Home() {
    return (
        <div>
            <Header></Header>
            <div class="row" style={{paddingTop: "50px", paddingBottom: "50px"}}>
                <div class="col-md-3"></div>
                <div class="col-md-6 col-md-offset-3">
                    <SearchBar></SearchBar>
                </div>
                <div class="col-md-3"></div>
            </div>
            <YourListings></YourListings>
        </div>
        
    );
}

export default Home;