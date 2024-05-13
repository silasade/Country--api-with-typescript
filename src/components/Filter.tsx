import React, { useContext, useState, ChangeEvent } from 'react';
import Autosuggest from 'react-autosuggest';

import { Menu } from './Menu';
import { Countries } from './Countries';
import { ThemeContext } from './contexts/ThemeContext';
import { BackgroundContext } from './contexts/BackgroundContext';

export const Filter = () => {
    const themeContext = useContext(ThemeContext);
    const backgroundContext = useContext(BackgroundContext);
    const [value, setInput] = useState<string | null>(null);
    const countries = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const [suggestions, setSuggestions] = useState<Array<string>>([]);

    type mycountry = {
        flag: string;
        name: string;
        nativeName: string;
        population: string;
        region: string;
        subregion: string;
        capital: string;
        topLevelDomain: string | Array<string>;
        currencies: { name: string }[];
        languages: { name: string }[];
    };

    const myCountryString: string | null = localStorage.getItem('Countries');
    const data: mycountry[] = myCountryString ? JSON.parse(myCountryString) : [];

    const getSuggestions = (value: string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : data
            .filter(country => country.name.toLowerCase().startsWith(inputValue))
            .map(country => country.name); // Map suggestions to strings
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
        setInput(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Search for a country...',
        value: value || "",
        onChange: (event: ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => onChange(event, { newValue }) // Corrected type
    };

    return (
        <div className="filt" style={{ backgroundColor: themeContext?.theme ? backgroundContext.light.secondary : backgroundContext.dark.secondary, color: themeContext?.theme ? backgroundContext.light.primary : backgroundContext.light.secondary }}>
            <div className="filter">
                <form>
                <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={(suggestion) => suggestion} // Return the suggestion as string
                        renderSuggestion={(suggestion) => (
                            <div>{suggestion}</div>
                        )}
                        inputProps={inputProps}
                    />
                </form>
                <div className="menu">
                    <Menu country={countries} />
                </div>
            </div>
            <Countries />
        </div>
    );
};
