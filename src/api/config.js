import axios from "axios";

console.log('config 출력 확인');

export const axiosInstance = axios.create({
    baseURL: "https://www.pre-onboarding-selection-task.shop",
})

// 요청이 날아갈 때마다 실행되는 로직
axiosInstance.interceptors.request.use((config) => {
    
    // header의 Authorization에 accessToken을 넣어주는 로직
    const accessToken = localStorage.getItem("access_token");

    config.headers.Authorization = 'Bearer ' + accessToken;

    return config;
}, 
(error) => {
    return Promise.reject(error);
})