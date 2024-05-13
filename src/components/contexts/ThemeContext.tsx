import { createContext, useState } from "react"

type ThemeContextProviderProps={
    children: React.ReactNode
}
export type AuthTheme={
    theme:boolean
    setTheme:React.Dispatch<React.SetStateAction<boolean>>
}
export const ThemeContext= createContext<AuthTheme |undefined>(undefined)
export const ThemeContextProvider=({children}: ThemeContextProviderProps)=>{
    const [theme,setTheme]=useState<boolean>(false)
    return (
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}