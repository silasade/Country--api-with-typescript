import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/Navbar';
import { ThemeContextProvider } from './components/contexts/ThemeContext';
import { BackgroundContextProvider } from './components/contexts/BackgroundContext';
import { RegionContextProvider } from './components/contexts/RegionContext';
import { BrowserRouter } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import { Country } from './components/Country';
import { Countries } from './components/Countries';
import { useEffect,useState,useContext } from 'react';
import { FilterContext } from "./components/contexts/Filter"
import { Filters } from './components/Filter';
function App() {
  const filterContext = useContext(FilterContext);
  const [showFilter, setShowFilter] = useState<boolean|undefined>();
  if (!filterContext) {
      throw new Error("Region does not exist");
  }
  useEffect(()=>{
    const show=(localStorage.getItem("filter"))
    setShowFilter(show?JSON.parse(show): filterContext.Filter)
  },[filterContext.Filter])
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <BackgroundContextProvider>
          <RegionContextProvider>
            <Navbar />
            {(!showFilter) && <Filters/>}
            <Routes>
              <Route path='/' element={<Countries />} />
              <Route path='/Country' element={<Country />} />
            </Routes>
          </RegionContextProvider>
        </BackgroundContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  );
}
export default App