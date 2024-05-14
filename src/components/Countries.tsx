import data from "./data.json"
import { RegionContext } from "./contexts/RegionContext"
import { useContext, useEffect } from "react"
import { ThemeContext } from "./contexts/ThemeContext"
import { BackgroundContext } from "./contexts/BackgroundContext"
import { useNavigate } from "react-router-dom"
import { FilterContext } from "./contexts/Filter"
export const Countries=()=>{
    const region=useContext(RegionContext)
    const themecontext=useContext(ThemeContext)
    const backgroundContext=useContext(BackgroundContext)
    const filterContext=useContext(FilterContext)

    if (!filterContext){
        throw new Error("Region does not exist")
    }
    const {Filter, setFilter}=filterContext
    const navigate=useNavigate()
    if (!region){
        throw new Error("Region does not exist")
    }
    const filter=data.filter((item)=>{
        return item && item.region===region.regions?.region
    })
    const myCountries=filter.map((item,index)=>{
        return(
            <div className="country" style={{backgroundColor: themecontext?.theme? "white": backgroundContext.dark.primary}} key={index}>
                <div>
                    <img className="flag" src={item.flags.png}/>
                </div>
                <div className="details">
                    <div>
                        <h4 onClick={()=>handleCountry(item)} className="name">{item.name}</h4>
                    </div>
                    <div>
                        <span className="det1"><span>Population:</span><h5>{item.population}</h5></span>
                        <span className="det1"><span>Region:</span><h5>{item.region}</h5></span>
                      <span className="det1"><span>Capital:</span><h5>{item.capital}</h5></span>
                    </div>
                </div>
            </div>
        )
    })
    function handleCountry(item:Object){
        localStorage.setItem("Mycountry",JSON.stringify(item))
        setFilter(!Filter)
        
        localStorage.setItem("filter",JSON.stringify(true))
        navigate("/Country")
    }
    useEffect(()=>{
        
        localStorage.setItem("Countries",JSON.stringify(data))
    },[])
    console.log(localStorage.getItem("filter"))
    const myCountries1=data.map((item,index)=>{
        return(
            <div className="country" style={{backgroundColor: themecontext?.theme? "white": backgroundContext.dark.primary}} key={index}>
                <div>
                    <img className="flag" src={item.flags.png}/>
                </div>
                <div className="details">
                    <div>
                        <h4 onClick={()=>handleCountry(item)} className="name">{item.name}</h4>
                    </div>
                    <div>
                        <div className="det1">
                            <h5>Population:</h5>
                            <h5>{item.population}</h5>
                        </div>
                       <div className="det1">
                            <h5>Region:</h5>
                            <h5>{item.region}</h5>
                        </div>
                       <div className="det1">
                            <h5>Capital:</h5>
                            <h5>{item.capital}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div className="countries"  style={{ backgroundColor: themecontext?.theme ? backgroundContext.light.secondary : backgroundContext.dark.secondary, color: themecontext?.theme ? backgroundContext.light.primary : backgroundContext.light.secondary }}>
            {filter.length>0? myCountries: myCountries1}
        </div>
    )
}