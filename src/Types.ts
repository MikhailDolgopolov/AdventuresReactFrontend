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