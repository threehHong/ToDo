import { axiosInstance } from "./config";

export const getTodos = () => {
    return axiosInstance({
        url: "todos",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
    })
}