import axios from "axios";
import { useAuth } from "@/context/AuthProvider";
import { BASEURL } from "@/lib/constant";
import { useNavigate } from "react-router-dom";

const useAxiosAuth = () => {
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: BASEURL,
    withCredentials: true, // ✅ Important: Send cookies (refresh token)
  });

  // Attach access token to all requests
  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // If request fails with 401, attempt to refresh
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await axios.post(
            `${BASEURL}/users/refresh-token`,
            {},
            {
              withCredentials: true, // ✅ Send cookie for refresh
            }
          );

          const newAccessToken = res.data.accessToken;
          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest); // Retry original request
        } catch (refreshError) {
          console.error("Session expired. Logging out...");
          setAccessToken(null);
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
