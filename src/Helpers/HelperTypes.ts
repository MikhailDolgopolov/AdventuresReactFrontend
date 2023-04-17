import {City, Country, Person, Sight, Trip, TripPoint} from "./DataTypes";
import points from "../Components/Pages/TripPoint/Points";

export type AdventuresStatistics={
    countries:Country[]
    cities:City[]
    people:Person[]
    numberOfTrips:number
}

export type FetchResult<Type>=[
    result:Type|undefined,
    loading:boolean,
    error: Error|null
]