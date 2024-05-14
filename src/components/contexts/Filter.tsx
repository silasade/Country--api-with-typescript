import React, { createContext, useEffect, useState } from "react";

type filterProps = {
    children: React.ReactNode;
};

type AuthFilter = {
    Filter: boolean;
    setFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterContext = createContext<AuthFilter | undefined>(undefined);

export function FilterProvider({ children }: filterProps) {
    const [Filter, setFilter] = useState<boolean>(false);
    
    return (
        <FilterContext.Provider value={{ Filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
}