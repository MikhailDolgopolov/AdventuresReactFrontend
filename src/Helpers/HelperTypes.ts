import {City, Country, Person, Sight, Trip, TripPoint} from "./DataTypes";
import points from "../Components/Pages/TripPoint/Points";

export type AdventuresStatistics={
    trips:number
    visitedCountries:number
}
export type MyData={
    people?:Person[], cities?:City[], countries?:Country[], trips?:Trip[], trippoints?:TripPoint[],sights?:Sight[]
    loading:boolean,
    error:Error|null
    refetchFunction:()=>void,
    functions:{points:Function, trips:Function}
}
export type FetchResult<Type>=[
    result:Type|undefined,
    loading:boolean,
    error: Error|null
]