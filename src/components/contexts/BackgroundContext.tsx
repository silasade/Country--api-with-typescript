import { createContext } from "react";
import { background } from "./Color";
type BackgroundContextProviderprops={
    children: React.ReactNode
}
export const BackgroundContext= createContext(background)

export const BackgroundContextProvider=({children}:BackgroundContextProviderprops)=>{
    return(
        <BackgroundContext.Provider value={background}>
            {children}
        </BackgroundContext.Provider>

    )
}