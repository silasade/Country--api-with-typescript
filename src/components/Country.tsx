import { useNavigate } from "react-router-dom"
import { ThemeContext } from "./contexts/ThemeContext"
import { BackgroundContext } from "./contexts/BackgroundContext"
import { useContext } from "react"
import { FilterContext } from "./contexts/Filter"

export function Country(){
    const navigate=useNavigate()
    const themecontext=useContext(ThemeContext)
    const backgroundContext=useContext(BackgroundContext)
    const filterContext=useContext(FilterContext)
    if (!filterContext){
        throw new Error("Region does not exist")
    }
    const {Filter, setFilter}=filterContext
    type mycountry={
        flag: string
        name: string
        nativeName: string
        population: string
        region: string
        subregion: string
        capital: string
        topLevelDomain: string | Array<string>
        currencies:{name:string}[]
        languages: {name:string}[]
    }
    const myCountryString: string | null = localStorage.getItem("Mycountry");
    const mine: mycountry | null = myCountryString ? JSON.parse(myCountryString) : null;
    const currency=mine?.currencies.map(item=>item.name)
    const language=mine?.languages.map(item=>item.name)
    document.body.style.backgroundColor = themecontext?.theme? backgroundContext.light.secondary: backgroundContext.dark.secondary;
    function handleNavigate(){
        setFilter(!Filter)
        navigate(-1)
    }
    return(
        <div className="about" style={{backgroundColor: themecontext?.theme? backgroundContext.light.secondary: backgroundContext.dark.secondary, color:themecontext?.theme? backgroundContext.light.primary:backgroundContext.light.secondary}}>
            <div>
                <div>
                    <button onClick={handleNavigate}>Back</button>
                    <br />
                    <br />
                </div>
                <div>
                    <img className="flag2" src={mine?.flag}/>
                </div>
            </div>
                
            <div className="bout">
                <div>
                    <div>
                        <h3 className="bout-name">{mine?.name}</h3>
    
                    </div>
                    <div>
                        <div className="det">Native Name: <h5>{mine?.nativeName}</h5></div>
                        <div className="det">Populatio: <h5>{mine?.population}</h5></div>
                        <div className="det">Region: <h5>{mine?.region}</h5></div>
                        <div className="det">Sub Region: <h5>{mine?.subregion}</h5></div>
                        <div className="det">Capital: <h5>{mine?.capital}</h5></div>
                    </div>
                </div>

                    <div className="domain">
                        <div className="det">Top Level Domain: <h5>{mine?.topLevelDomain}</h5></div>
                        <div className="det">Currencies: <h5>{currency?.toString()}</h5></div>
                        <div className="det">Languages: <h5>{language?.toString()}</h5></div>

                    </div>
                
            </div>
            
        </div>
    )
}