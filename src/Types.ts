export type Connection = {
    connected: boolean
    message: string
}
export type SharedData={
    allPeople:Array<Person>
}
export type MultiselectOption={
    name: string
    id:number
}
export interface MyData {
    [x:string]:string|number
}
export interface Trip extends MyData{
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
export interface Entry {
    year : number
    yearList : Array<Trip>
}
export interface Person extends MyData{
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
export interface TripPoint  extends MyData {
    trip_point_id : number
    title: string
    trip_id: number
    trip_order:number
    hotel_id: number
    city : string
}

export interface City extends MyData {
    city : string
    country : string
    population : number
    founded_year : number
}
export interface Country extends MyData {
    country : string
    capital_city : string
    population : number
    area : number
}