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

export const updateTodo = (editItemId, newTodo, isChecked) => {
    return axiosInstance({
        url: `todos/${editItemId}`,
        method: "PUT",
        data: {
            todo: newTodo,
            isCompleted: isChecked
        }
    })
}

export const todoApi = {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
}