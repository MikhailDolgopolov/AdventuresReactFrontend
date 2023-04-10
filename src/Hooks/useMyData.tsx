import React from 'react';
import useFetch from "./useFetch";
import {serverProperties} from "../././Server/ServerProperties";
import {City, Country, Person, Trip, TripPoint} from "../Helpers/DataTypes";
import {MyData} from "../Helpers/HelperTypes";

function useMyData():MyData {

    const [result,load, error]=useFetch("")
    const [people,loadPeople, errorPeople, refetchPeople]=useFetch<Person[]>("people/")

    const [cities,loadCities, errorCities, refetchCities]=useFetch<City[]>("cities/")
    const [countries,loadCountries, errorCountries, refetchCountries]=useFetch<Country[]>("countries/")
    const [trips,loadTrips, errorTrips, refetchTrips]=useFetch<Trip[]>("trips/")
    const [points,loadPoints, errorPoints, refetchPoints]=useFetch<TripPoint[]>("trippoints/")

    function refetchAll() {
        refetchPeople()
        refetchCities()
        refetchCountries()
        refetchTrips()
        refetchPoints()
    }
    let errors = false;
    if(error||errorPeople||errorCities||errorCountries||errorTrips||errorPoints) errors=true;
    return {people:people, cities:cities, countries:countries, trips:trips, trippoints:points,
    loading:(loadCities||loadCountries||loadPoints||loadTrips||loadPeople)&&!errors, error:error,
    refetchFunction:refetchAll,
    functions:{points:()=>refetchPoints(), trips:()=>refetchTrips()}}
}

export default useMyData;