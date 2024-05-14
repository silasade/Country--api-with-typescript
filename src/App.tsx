import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Filter } from './components/Filter';
import Navbar from './components/Navbar';
import { ThemeContextProvider } from './components/contexts/ThemeContext';
import { BackgroundContextProvider } from './components/contexts/BackgroundContext';
import { RegionContextProvider } from './components/contexts/RegionContext';
import { BrowserRouter } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import { Country } from './components/Country';
import { Countries } from './components/Countries';
function App() {
  return (
    <BrowserRouter>
    <ThemeContextProvider>
      <BackgroundContextProvider>
        <RegionContextProvider>
        <Navbar/>
        <Filter/>
          <Routes>
          <Route path='/' element={<Countries/>} />
          <Route path='/Country' element={<Country/>} />
          </Routes>
          
        </RegionContextProvider>     
    </BackgroundContextProvider>
    </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
