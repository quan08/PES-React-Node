import instance from "./instance";

export const listSetting = () => {
    const url = "/generalSettings";
    return instance.get(url);
}

// export const remove = (id: number) => {
//     const url = `/table/${id}`;
//     return instance.delete(url);
// }
// export const read = (id: string | undefined) => {
//     const url = `/table/${id}`;
//     return instance.get(url);
// }
// export const add = (table: TableType) => {
//     const url = "/table";
//     return instance.post(url, table);
// }

// export const update = (table: TableType) => {
//     const url = `/table/${table.id}`;
//     return instance.put(url, table);
// }
