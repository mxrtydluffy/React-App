// import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';
import Title from './Title/Title';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className='App'>
      <Title />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
