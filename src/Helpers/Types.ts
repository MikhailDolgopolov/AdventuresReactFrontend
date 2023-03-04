export type Connection = {
    connected: boolean
    message: string
}

export type Trip={
    trip_id : number
    title : string
    start_date : string
    end_date : string
    description : string
    photo_link : string
}
export function getTripDate(trip:Trip){
    return trip.start_date + ((trip.end_date==undefined || trip.end_date!.length<1)?"":" - "+trip.end_date);
}
export type Entry ={
    year : number
    yearList : Array<Trip>
}
export type Person={
    person_id: number
    first_name: string
    last_name: string
    patronym: string
    alias: string
}
export function getName(person:Person):string{
    if(person.alias) return person.alias;
    return person.first_name+" "+person.last_name;
}
export type TripPoint={
    trip_point_id : number
    title: string
    trip_id: number
    trip_order:number
    hotel_id: number
    city : string
}

export type City={
    city : string
    country : string
    population : number
    founded_year : number
}
export type Country={
    country : string
    capital_city : string
    population : number
    area : number
}
export type AdventuresStatistics={
    trips:number
    visitedCountries:number
}
