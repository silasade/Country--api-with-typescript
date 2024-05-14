import React, { useContext, useState, ChangeEvent, FormEvent } from 'react';
import Autosuggest, {InputProps} from 'react-autosuggest';

import { Menu } from './Menu';
import { Countries } from './Countries';
import { ThemeContext } from './contexts/ThemeContext';
import { BackgroundContext } from './contexts/BackgroundContext';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';
export const Filter = () => {
    const themeContext = useContext(ThemeContext);
    const backgroundContext = useContext(BackgroundContext);
    const [value, setInput] = useState<string | null>(null);
    const countries = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
    const [suggestions, setSuggestions] = useState<Array<string>>([]);
    const [showNotification,setShowNotification]=useState<boolean>(false)
    const [searched, setSearched]=useState<string>("")
    const navigate=useNavigate()
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
    const defaultData: mycountry[] = []; // Provide a default value if no data is found

    const data: mycountry[] = myCountryString ? JSON.parse(myCountryString) : defaultData;
    const getSuggestions = (value: string) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        const name= inputLength === 0 ? [] : data
            .filter(country => country.name.toLowerCase().startsWith(inputValue))
            .map(country => country.name); // Map suggestions to strings
        const notFOund="Country not found"
        return name?name:Array(notFOund)
    };

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        setInput((event.target as HTMLInputElement).value);
    };
    const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };
    const handleKeyPress = (event:React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            let enteredValue:string
            if(typeof value==="string"){
                enteredValue= value.trim().toLowerCase();
                setSearched(enteredValue)
            }
            const matchingCountry = data.find(country => country.name.toLowerCase() === enteredValue);
            try {
                console.log(matchingCountry)
                localStorage.setItem("Mycountry",JSON.stringify(matchingCountry))
            } catch (error) {
                console.error(error)
            }
            if (matchingCountry) {
                
                navigate("/country");
            } else {
                setShowNotification(true);
            }
        }
    };
    console.log(showNotification)
    return (
        <div className="filt" >
            <div className="filter" style={{ backgroundColor: themeContext?.theme ? backgroundContext.light.secondary : backgroundContext.dark.secondary, color: themeContext?.theme ? backgroundContext.light.primary : backgroundContext.light.secondary }}>
               <div>
                <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={onSuggestionsClearRequested}
                        getSuggestionValue={(suggestion) => suggestion? suggestion: "Country does not exist..."} // Return the suggestion as string
                        renderSuggestion={(suggestion) => (
                            <div className='sugesstion'>{suggestion?suggestion:"Country does not exist..."}</div>
                        )}
                        theme={{
                            container: 'my-autosuggest-container',
                            suggestionsContainer: 'my-suggestions-container',
                            suggestionsList: 'my-suggestions-list',
                            suggestion: 'my-suggestion'
                        }}
                        inputProps={{
                            placeholder: 'Type a country...',
                            value: value || "",
                            onKeyPress: handleKeyPress,
                            onChange: (event: React.FormEvent<HTMLElement>, { newValue }: Autosuggest.ChangeEvent) => {
                                setInput(newValue);
                            },
                            
                        }}
                    />
                </div>
                {showNotification && <Notification show={showNotification} setShow={()=>setShowNotification(!showNotification)} country={searched}/>}
                <div className="menu">
                    <Menu country={countries} />
                </div>
            </div>
        </div>
    );
};
