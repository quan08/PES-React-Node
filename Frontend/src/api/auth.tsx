import { AuthType } from "../types/auth";
import instance from "./instance";
import { isAuthenticate } from "../utils/localStorate";

const { token, user } = isAuthenticate();


export const signup = (user: AuthType) => {
    const url = `/signup`;
    return instance.post(url, user);
}
export const signin = (user: AuthType) => {
    const url = `/signin`;
    return instance.post(url, user);
}

export const listStaff = () => {
    const url = `/staff`;
    return instance.get(url);
}

export const removeStaff = (id: string| undefined) => {
    const url = `/staff/${id}/${user._id}`;
    return instance.delete(url,{
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}


export const getStaff = (id: string) => {
    const url = `/staff/${id}`;
    return instance.get(url);
}