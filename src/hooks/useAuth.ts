import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { BASEURL } from "../lib/constant";
import {  useNavigate } from "react-router-dom";


 const useAxiosAuth = () => {
    const { accessToken, setAccessToken } = useAuth();
const navigate = useNavigate();
    const axiosInstance = axios.create({
        baseURL: BASEURL,
        withCredentials: true, // Important for refresh token in HTTP-only cookie
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // If access token expired, try refreshing
            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const res = await axios.post(
                        `${BASEURL}/users/refresh-token`,
                        {},
                        { withCredentials: true }
                    );
                    if (setAccessToken) {
                        setAccessToken(res.data.accessToken); // Update token in context
                    }
                    originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
                    return axiosInstance(originalRequest); // Retry failed request
                } catch (refreshError) {
                    console.error("Session expired, logging out...");
                    if (setAccessToken) {
                        setAccessToken(null);
                        navigate("/login", { replace: true }); // Redirect to login page
                    }
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export default useAxiosAuth;