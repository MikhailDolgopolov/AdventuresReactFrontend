import {City, Country, Person} from "./DataTypes";

export type AdventuresStatistics={
    countries:Country[]
    cities:City[]
    people:Person[]
    numberOfTrips:number
    numberOfSouvenirs:number
}

export type FetchResult<Type>=[
    result:Type|undefined,
    loading:boolean,
    error: Error|null
]