import { createContext, useState } from "react";

type AuthRegion={
    region:string
}
type RegionContextProviderProps={
    children:React.ReactNode
}
type RegionContextType={
    regions: AuthRegion |null
    setRegions: React.Dispatch<React.SetStateAction<AuthRegion | null>>
}
export const RegionContext=createContext<RegionContextType | null>(null)
export const RegionContextProvider=({children}: RegionContextProviderProps)=>{
    const [regions, setRegions]=useState<AuthRegion | null >(null)
   return( 
   <RegionContext.Provider value={{regions,setRegions}}>
        {children}
    </RegionContext.Provider>
)
}
