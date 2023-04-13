import React, {useState} from 'react';
import useFetch from "./useFetch";
import {serverProperties} from "../././Server/ServerProperties";
import {City, Country, Person, Sight, Trip, TripPoint} from "../Helpers/DataTypes";
import {MyData} from "../Helpers/HelperTypes";
import useSwitch from "./useSwitch";

function useMyData():MyData {

    const [result,load, error]=useFetch("")
    const[refetchPeople, flipPeople]=useSwitch()
    const[refetchCities, flipCities]=useSwitch()
    const[refetchCountries, flipCountries]=useSwitch()
    const[refetchTrips, flipTrips]=useSwitch()
    const[refetchPoints, flipPoints]=useSwitch()
    const [people,loadPeople, errorPeople]=
        useFetch<Person[]>("people/", refetchPeople)
    const [cities,loadCities, errorCities]=
        useFetch<City[]>("cities/", refetchCities)
    const [countries,loadCountries, errorCountries]=
        useFetch<Country[]>("countries/", refetchCountries)
    const [trips,loadTrips, errorTrips]=
        useFetch<Trip[]>("trips/", refetchTrips)
    const [points,loadPoints, errorPoints]=
        useFetch<TripPoint[]>("trippoints/", refetchPoints)
    const [sights, loadSights] = useFetch<Sight[]>("sights/")

    function refetchAll() {
        flipPeople()
        flipCities()
        flipCountries()
        flipTrips()
        flipPoints()
    }
    let errors = false;
    if(error||errorPeople||errorCities||errorCountries||errorTrips||errorPoints) errors=true;
    return {people:people, cities:cities, countries:countries, trips:trips, trippoints:points,sights:sights,
    loading:(loadCities||loadCountries||loadPoints||loadTrips||loadPeople)&&!errors, error:error,
    refetchFunction:refetchAll,
    functions:{points:flipPoints, trips:flipTrips}}
}

export default useMyData;