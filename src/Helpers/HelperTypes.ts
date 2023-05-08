import {City, Country, Person, Souvenir} from "./DataTypes";

export type AdventuresStatistics={
    countries:Country[]
    cities:City[]
    people:Person[]
    souvenirs:Souvenir[]
    numberOfTrips:number
    numberOfSouvenirs:number
}

export type FetchResult<Type>=[
    result:Type|undefined,
    loading:boolean,
    error: Error|null
]