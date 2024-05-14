import Dropdown from 'react-bootstrap/Dropdown';
import { RegionContext } from './contexts/RegionContext';
import { useContext } from 'react';
import { BackgroundContext } from './contexts/BackgroundContext';
import { ThemeContext } from './contexts/ThemeContext';
type MenuProps={
    country: Array<string>
}
export const Menu=({country}:MenuProps)=>{
    const regionContext= useContext(RegionContext)
    const themecontext=useContext(ThemeContext)
    const backgroundContext=useContext(BackgroundContext)
    const region=country.map((item,index)=> {
        return <Dropdown.Item className='item' style={{color:themecontext?.theme? backgroundContext.light.primary:backgroundContext.light.secondary}} key={index} onClick={()=>handleRegions(item)}>{item}</Dropdown.Item>
    })
    if(!regionContext){
        throw new Error('region does not exist')
    }
    const {regions, setRegions}=regionContext
    function handleRegions(item:string){
        setRegions({region:item})
    }
    console.log(regions)
    return(
        <Dropdown  >
        <Dropdown.Toggle className='drop' id="dropdown-basic" style={{backgroundColor: themecontext?.theme? "white": backgroundContext.dark.primary, border:"0", color:themecontext?.theme? backgroundContext.light.primary:backgroundContext.light.secondary}}>
            Filter by Region
        </Dropdown.Toggle>
  
        <Dropdown.Menu className='item' style={{backgroundColor: themecontext?.theme? "white": backgroundContext.dark.primary, border:"0", color:themecontext?.theme? backgroundContext.light.primary:backgroundContext.light.secondary}}>
          {region}
          
        </Dropdown.Menu>
      </Dropdown>
      )
}