import React from 'react';

import TopArtists from "../components/HomePage/TopArtists"
import Banner from '../components/Other/Banner'
import MainNavigation from '../../shared/components/Navigation/MainNavigation';


const HomePage = () => {
  
  return (
    <React.Fragment>
      <MainNavigation  />
      <Banner />
      <h2 style={{ color: "white", textAlign: "center" }}>Top Artists</h2>
      <TopArtists className={"top-artists-list"} />
    </React.Fragment>
  )
};

export default HomePage;
