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

  const { Filter, setFilter } = filterContext;

  useEffect(() => {
      const handleStorageChange = (event: StorageEvent) => {
          if (event.key === 'filter') {
              const storedFilter = localStorage.getItem('filter');
              if (storedFilter !== null) {
                setShowFilter(!JSON.parse(storedFilter));
              }
          }
      };

      // Subscribe to changes in localStorage
      window.addEventListener('storage', handleStorageChange);

      // Unsubscribe when component unmounts
      return () => {
          window.removeEventListener('storage', handleStorageChange);
      };
  }, [filterContext.Filter]);
  console.log(showFilter)
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <BackgroundContextProvider>
          <RegionContextProvider>
            <Navbar />
            {filterContext.Filter && <Filters/>}
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