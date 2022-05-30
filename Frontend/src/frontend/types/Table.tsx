import type { MenuType } from "./menu"
export interface TableType{
    [x: string]: any
    id?: number,
    status: number      
    name: string,
    img: string,
    timestar?: {
        year: number,
        month: number,
        date: number,
        hours: number,
        minute: number
    },
    order?: [{
        quantity: number,
        food: MenuType
    }]
}