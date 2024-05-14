import { ThemeContext } from "./contexts/ThemeContext";
import { useContext, useEffect } from "react";
import { AuthTheme } from "./contexts/ThemeContext";
import { BackgroundContext } from "./contexts/BackgroundContext";
import moon from "./images/moon.svg"
import sun from "./images/brightness-high.svg"
function Navbar(){
    const themecontext=useContext(ThemeContext)
    const backgroundContext=useContext(BackgroundContext)
    if(!themecontext){
        throw new Error("context does not exist")
    }
    const {theme,setTheme}=themecontext
    function handleClick(){
        setTheme(!theme)
    }
    console.log(theme)
    return(
        <div className="navbar" style={{backgroundColor: theme? "white": backgroundContext.dark.primary, color:theme? backgroundContext.light.primary:backgroundContext.light.secondary}}>
            <div>
                <h3 className="logo">Where in the world?</h3>
            </div>
            <div className="toggle" onClick={handleClick}>
                <img style={{color:"white"}} src={theme? backgroundContext.light.image: backgroundContext.dark.image} alt="" />
                <h4 className="mode">{theme? backgroundContext.light.text: backgroundContext.dark.text}</h4>
            </div>
        </div>
    )
}
export default Navbar;