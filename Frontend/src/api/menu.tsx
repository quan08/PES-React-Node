import instance from "./instance";
import { MenuType } from "../frontend/types/menu";
import { isAuthenticate } from "../utils/localStorate";

const { token, user } = isAuthenticate();

export const listMenu = () => {
    const url = "/menu";
    return instance.get(url);
}
export const remove = (id: number) => {
    const url = `/menu/${id}/${user._id}`;
    return instance.delete(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}
export const readMenu = (id: string | undefined) => {
    const url = `/menu/${id}`;
    return instance.get(url);
}
export const add = (menu: MenuType) => {
    const url = `/menu/${user._id}`;
    return instance.post(url, menu, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export const update = (menu: MenuType) => {
    const url = `/menu/${menu._id}/${user._id}`;
    return instance.put(url, menu, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export const SearchOrder = (key: string | undefined) => {
    const url = `/menus/search?q=${key}`;
    return instance.get(url);
}
