import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { BASEURL } from "../lib/constant";
import { useNavigate } from "react-router-dom";

const useAxiosAuth = () => {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: BASEURL,
    withCredentials: true, // ✅ Needed to send/receive cookies
  });

  // ✅ Attach access token to requests
  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ✅ Handle 401 and refresh using the *same* axiosInstance
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await axiosInstance.post(
            "/users/refresh", // ✅ Ensure this matches your backend
            {}, 
            { withCredentials: true }
          );

          const newAccessToken = res.data.accessToken;

          if (setAccessToken) setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest); // 🔁 Retry original request
        } catch (refreshError) {
          console.error("Session expired. Logging out...");
          if (setAccessToken) setAccessToken(null);
          navigate("/login", { replace: true });
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosAuth;
