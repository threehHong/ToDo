import { axiosInstance } from "./config";

const signIn = (data) => {
    return axiosInstance({
        url: "/auth/signin",
        method: "POST",
        data,
    })
}

const signUp = (data) => {
    return axiosInstance({
        url: "/auth/signup",
        method: "POST",
        data,
    })
}

export const userApi = {
    signIn,
    signUp
}