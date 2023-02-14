// import React from 'react';
import { Outlet } from 'react-router-dom';
import POPOSDetails from './POPOSDetails/POPOSinfo.css'

import './App.css';
import Title from './Title/Title';
import POPOSList from './POPOSList/POPOSList';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="App">
      <Title />
      <POPOSList />
      <Footer />
    </div>
  );
}

export default App;
