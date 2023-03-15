import { useState, useEffect } from "react"
import CountryList from "../components/CountryList";

const CountryContainer = () => {

    const [countries, setCountries] = useState([])
    const [visitedCountries, setVisitedCountries] = useState([])

    useEffect(() => {
        updateCountryData();
    }, []);

    const updateCountryData = async () => {
        const response = await fetch("https://restcountries.com/v3.1/all")
        const data = await response.json();
        setCountries(data);
    }

    // includes method is used to check whether a country has been added to
    // visitedCountries already or not
    const updateVisitedList = (countryName) => {
        const alreadySelectedCountries = visitedCountries.includes((country) => {
            return country.name.common === countryName;
        })

        if(alreadySelectedCountries){
            return;
        }

        // filteredCountriesList is our original list with all of the countries in it
        // filter method is used to create a filteredCountriesList which includes all of 
        // the countries other than the ones where the countryName no longer equals the
        // common name on the API - they get removed from the filteredCountriesList
        const filteredCountriesList = countries.filter((country)=>{
            return country.name.common !== countryName;
        })

        // find method finds the specific countries with the countryName in the countries array, 
        // and these countries are stored in the selectedCountry variable
        const selectedCountry = countries.find((country) => {
            return country.name.common === countryName
        })

        // setVisitedCountries updates the visitedCountries array and selectedCountry is added to 
        // this array
        setVisitedCountries([...visitedCountries, selectedCountry]);
        // setCountries uses the filteredCountriesList to update the original countries array
        // and doesn't include the countries from visitedCountries or selectedCountry
        setCountries(filteredCountriesList);
    }

    return (
    <>
        {countries ? <CountryList countries={countries} updateVisitedList={updateVisitedList}/> : <p>Loading</p>}
        {countries ? <CountryList countries={visitedCountries}/> : <p>Loading</p>}
     </>
    );
};
export default CountryContainer;