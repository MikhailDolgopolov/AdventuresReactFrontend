import {City, Country, Person, Trip, TripPoint} from "./DataTypes";

export type AdventuresStatistics={
    trips:number
    visitedCountries:number
}
export type MyData={
    people?:Person[], cities?:City[], countries?:Country[], trips?:Trip[], trippoints?:TripPoint[],
    loading:boolean,
    error:Error|null
    refetchFunction:()=>void
    functions:{points:()=>void, trips:()=>void}
}