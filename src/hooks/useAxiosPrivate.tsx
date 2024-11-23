/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Cookies from "js-cookie";
import { axiosPrivateInstance } from "../utils/axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const useAxiosPrivate = () => {
  const router = useRouter();

  useEffect(() => {
    const requestInterceptor = axiosPrivateInstance.interceptors.request.use(
      (config) => {
        const accessToken = Cookies.get("accessToken"); // Ambil token langsung
        if (!config.headers["Authorization"] && accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = axiosPrivateInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        const originalRequest = err?.config;
        if (err?.response?.status === 403 && !originalRequest.sent) {
          originalRequest.sent = true;
          // Tampilkan SweetAlert2 ketika sesi berakhir
          Swal.fire({
            icon: "warning",
            title: "Sesi Berakhir",
            text: "Sesi Anda telah berakhir. Silakan login kembali.",
            confirmButtonText: "Login",
            confirmButtonColor: "#2F55D4",
          }).then(() => {
            Cookies.remove("accessToken");
            router.push("/login");
          });

          return Promise.reject(err);
        } else if (err?.response?.status === 401) {
          // SweetAlert2 untuk akses tidak sah
          Swal.fire({
            icon: "error",
            title: "Tidak Memiliki Akses",
            text: "Anda tidak memiliki akses. Silakan login kembali.",
            confirmButtonText: "Login",
            confirmButtonColor: "#2F55D4",
          }).then(() => {
            Cookies.remove("accessToken");
            router.push("/login");
          });
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosPrivateInstance.interceptors.request.eject(requestInterceptor);
      axiosPrivateInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosPrivateInstance;
};

export default useAxiosPrivate;
