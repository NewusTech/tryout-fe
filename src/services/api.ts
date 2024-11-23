/* eslint-disable react-hooks/rules-of-hooks */
// api/index.ts
import useSWR from "swr";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Cookies from "js-cookie";
import { showAlert } from "@/lib/swalAlert";
import { typePackageFormData } from "@/validations";
import { useRouter } from "next/navigation";
import { PackageResponseOne } from "@/types/interface";

// Hook to fetch master data tipe paket
const useGetTypePackage = (currentPage: number, search: string) => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/user/type/package/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/user/type/package/get?page=${currentPage}&limit=10&search=${search}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading };
};

// post create tipe paket
const postSubmitTypePackage = () => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivate();

  const handlePostSubmit = async (
    data: typePackageFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await axiosPrivate.post("/user/type/package/create", data);

      showAlert("success", "Data berhasil ditambahkan!");
      navigate.push("/data-master/package-type");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.[0]?.message || error.response?.data?.message  || "Gagal menambahkan data!";
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handlePostSubmit };
};

// get one tipe paket
const useGetTypePackageId = (id: string) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<PackageResponseOne>(
    `/user/type/package/get/${id}`,
    () =>
      axiosPrivate
        .get(`/user/type/package/get/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading,
  };
};

// update tipe paket
const putSubmitTypePackage = (id : string) => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivate();

  const handlePostSubmit = async (
    data: typePackageFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await axiosPrivate.put(`/user/type/package/update/${id}`, data);

      showAlert("success", "Data berhasil ditambahkan!");
      navigate.push("/data-master/package-type");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.[0]?.message || error.response?.data?.message  || "Gagal menambahkan data!";
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handlePostSubmit };
};


export { 
  useGetTypePackage, 
  postSubmitTypePackage,
  useGetTypePackageId,
  putSubmitTypePackage,
};
