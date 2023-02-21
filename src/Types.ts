export interface IApiError {
    message: string;
    description: string;
    statusCode: string | number;
}
export type SharedData={
    allPeople:Array<Person>
}
export type MultiselectOption={
    name: string
    id:number
}
export type Trip ={
    trip_id : number
    title : string
    start_date : string
    end_date : string
    description? : string
    photo_link? : string
}
export type Entry = {
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