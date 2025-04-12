import { useAuth } from "@/context/AuthProvider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASEURL } from "./constant";
import useAxiosAuth from "@/hooks/useAuth";
import { ClockFading } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const Persist: React.FC<Props> = ({ children }) => {
  const { accessToken, setAccessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const rememberMe = localStorage.getItem("rememberMe") === "true";
const axiosInstance = useAxiosAuth();
  useEffect(() => {
    const refreshAuth = async () => {
      try {
        const res = await axiosInstance.post(
          `/users/refresh-token`,
          {},
          {
            withCredentials: true, // ✅ Send cookie with refresh token
          }
        );
        console.log(res.data)
        setAccessToken(res.data.accessToken);
      } catch (error) {
        console.error("Error refreshing token:", error);
      } finally {
        setLoading(false);
      }
    };

    if (rememberMe && !accessToken) {
      refreshAuth();
    } else {
      setLoading(false); // No refresh needed
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default Persist;
