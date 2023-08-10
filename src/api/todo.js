import { axiosInstance } from "./config";

export const getTodos = () => {
    return axiosInstance({
        url: "todos",
        method: "GET",
    })
}

export const createTodo = (todo) => {
    return axiosInstance({
        url: "todos",
        method: "POST",
        data: { 
            todo 
        },
    })
}

export const deleteTodo = (id) => {
    return axiosInstance({
        url: `todos/${id}`,
        method: "DELETE",
    })
}

export const todoApi = {
    getTodos,
    createTodo,
    deleteTodo,
}