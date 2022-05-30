import { TableType } from "../frontend/types/Table";
import instance from "./instance";
import { isAuthenticate } from "../utils/localStorate";

const { token, user } = isAuthenticate();

export const list = () => {
    const url = "/table";
    return instance.get(url);
}


export const fillter = (key: number) => {
    const url = `/tables/fillter?q=${key}`;
    return instance.get(url);
}

export const remove = (id: string) => {
    const url = `/table/${id}/${user._id}`;
    return instance.delete(url,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
export const read = (id: string | undefined) => {
    const url = `/table/${id}`;
    return instance.get(url);
}
export const add = (table: TableType) => {
    const url = `/table/${user._id}`;
    return instance.post(url, table, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export const update = (table: TableType) => {
    const url = `/table/${table._id}`;
    return instance.put(url, table);
}
