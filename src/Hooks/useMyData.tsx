import React from 'react';
import useFetch from "./useFetch";
import {serverProperties} from "../Server/ServerProperties";
import {City, Country, MyData, Person, Trip, TripPoint} from "../Helpers/Types";

function useMyData():MyData {

    const [result,load, error, refetch]=useFetch(serverProperties.root)
    const [people,loadPeople, errorPeople, refetchPeople]=useFetch<Person[]>(serverProperties.root+"people/")

    const [cities,loadCities, errorCities, refetchCities]=useFetch<City[]>(serverProperties.root+"cities/")
    const [countries,loadCountries, errorCountries, refetchCountries]=useFetch<Country[]>(serverProperties.root+"countries/")
    const [trips,loadTrips, errorTrips, refetchTrips]=useFetch<Trip[]>(serverProperties.root+"trips/")
    const [points,loadPoints, errorPoints, refetchPoints]=useFetch<TripPoint[]>(serverProperties.root+"trippoints/")

    function refetchAll() {
        refetch()
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
    refetchFunctions:{all:refetchAll, people:refetchPeople, cities:refetchCities, countries:refetchCountries, trips:refetchTrips, trippoints:refetchPoints}}
}

export default useMyData;