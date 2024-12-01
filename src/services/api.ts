/* eslint-disable react-hooks/rules-of-hooks */
// api/index.ts
import useSWR, { mutate } from "swr";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import Cookies from "js-cookie";
import { showAlert } from "@/lib/swalAlert";
import { bannerEditFormData, tncFormData, typePackageFormData, typePaymentFormData, typeQuestionFormData } from "@/validations";
import { useRouter } from "next/navigation";
import { BankSoalResponse, BannerResponse, BannerResponseOne, CompanyProfileResponse, FeedbackDetailResponse, PackageResponse, PackageResponseOne, PackageTryoutResponse, PackageTryoutResponseOne, PaymentResponseFilter, PaymentResponseOne, QuestionResponseOne, ReportPaymentSlugResponse, ResponseQuestionPackage, SnkResponse } from "@/types/interface";

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

// Hook to fetch master data tipe pembayaran
const useGetTypePayment = (currentPage: number, search: string) => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/user/type/payment/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/user/type/payment/get?page=${currentPage}&limit=10&search=${search}`,
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

// post create tipe pembayaran
const postSubmitTypePayment = () => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivate();

  const handlePostSubmit = async (
    data: typePaymentFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await axiosPrivate.post("/user/type/payment/create", data);

      showAlert("success", "Data berhasil ditambahkan!");
      navigate.push("/data-master/payment-type");
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

// get one tipe pembayaran
const useGetTypePaymentId = (id: string) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<PaymentResponseOne>(
    `/user/type/payment/get/${id}`,
    () =>
      axiosPrivate
        .get(`/user/type/payment/get/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading,
  };
};

// update tipe pembayaran
const putSubmitTypePayment = (id : string) => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivate();

  const handlePostSubmit = async (
    data: typePaymentFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await axiosPrivate.put(`/user/type/payment/update/${id}`, data);

      showAlert("success", "Data berhasil ditambahkan!");
      navigate.push("/data-master/payment-type");
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

// Hook to fetch master data tipe pertanyaan
const useGetTypeQuestion = (currentPage: number, search: string) => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/user/type/question/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/user/type/question/get?page=${currentPage}&limit=10&search=${search}`,
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

// post create tipe pertanyaan
const postSubmitTypeQuestion = () => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivate();

  const handlePostSubmit = async (
    data: typeQuestionFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await axiosPrivate.post("/user/type/question/create", data);

      showAlert("success", "Data berhasil ditambahkan!");
      navigate.push("/data-master/question-type");
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

// get one tipe pertanyaan
const useGetTypeQuestionId = (id: string) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<QuestionResponseOne>(
    `/user/type/question/get/${id}`,
    () =>
      axiosPrivate
        .get(`/user/type/question/get/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading,
  };
};

// update tipe pertanyaan
const putSubmitTypeQuestion = (id : string) => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivate();

  const handlePostSubmit = async (
    data: typeQuestionFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await axiosPrivate.put(`/user/type/question/update/${id}`, data);

      showAlert("success", "Data berhasil ditambahkan!");
      navigate.push("/data-master/question-type");
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

// Hook to fetch master data syarat dan kebijakan privasi
const useGetTnc = () => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<SnkResponse>(
    `/user/tnc/get`,
    () =>
      axiosPrivate
        .get(
          `/user/tnc/get`,
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

// put update Snk
const putSubmitTnc = () => {
  const navigate = useRouter(); // Pindahkan ke dalam fungsi
  const axiosPrivate = useAxiosPrivate();

  const handlePostSubmit = async (
    data: tncFormData,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    try {
      setLoading(true);
      await axiosPrivate.put("/user/tnc/update", data);

      showAlert("success", "Data berhasil diperbarui!");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.data?.[0]?.message || error.response?.data?.message  || "Gagal memperbarui data!";
      showAlert("error", errorMessage);
    } finally {
      setLoading(false);
    }mutate(`/user/tnc/get`);
  };

  return { handlePostSubmit };
};

// Hook to fetch master data tentang perusahaan
const useGetAboutCompany = () => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<CompanyProfileResponse>(
    `/user/company/profile/get/1`,
    () =>
      axiosPrivate
        .get(
          `/user/company/profile/get/1`,
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

// banner home
const useGetBanner = (currentPage: number) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/user/banner/get?page=${currentPage}&limit=10`,
    () =>
      axiosPrivate
        .get(
          `/user/banner/get?page=${currentPage}&limit=10`,
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

// edit banner home
const useGetBannerId = (id: string) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<BannerResponseOne>(
    `/user/banner/get/${id}`,
    () =>
      axiosPrivate
        .get(`/user/banner/get/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading,
  };
};

// banner home
const useGetBannerHome = () => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<BannerResponse>(
    `/user/banner/get?limit=99999`,
    () =>
      axiosPrivate
        .get(
          `/user/banner/get?limit=99999`,
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

// get bank soal
const useGetBankQuestion = (currentPage: number, search: string, ) => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/user/bank/question/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/user/bank/question/get?page=${currentPage}&limit=10&search=${search}`,
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

// get paket tryot
const useGetTryoutPackage = (currentPage: number, search: string, ) => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/user/package/tryout/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/user/package/tryout/get?page=${currentPage}&limit=10&search=${search}`,
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

// filter tipe paket
const useGetTypePackageFilter = () => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<PackageResponse>(
    `/user/type/package/get?limit=9999`,
    () =>
      axiosPrivate
        .get(
          `/user/type/package/get?limit=9999`,
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


// filter tipe pembayaran
const useGetTypePaymentFilter = () => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<PaymentResponseFilter>(
    `/user/type/payment/get?limit=9999`,
    () =>
      axiosPrivate
        .get(
          `/user/type/payment/get?limit=9999`,
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

// get bank soal tipe
const useGetBankQuestionType = (id: number, ) => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<BankSoalResponse>(
    `/user/bank/question/get/${id}`,
    () =>
      axiosPrivate
        .get(
          `/user/bank/question/get/${id}`,
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

// get paket soal (user)
const useGetQuestionPackageId = (id?: string) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<ResponseQuestionPackage>(
    `/user/question/form/${id}`,
    () =>
      axiosPrivate
        .get(`/user/question/form/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading,
  };
};

// user get paket tryout
const useGetUserTryoutPackage = (currentPage: number, search: string, ) => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<PackageTryoutResponse>(
    `/user/package/tryout/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/user/package/tryout/get?page=${currentPage}&limit=10&search=${search}`,
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

// user get paket tryout id
const useGetUserTryoutPackageId = (id?: string) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<PackageTryoutResponseOne>(
    `/user/package/tryout/get/${id}`,
    () =>
      axiosPrivate
        .get(`/user/package/tryout/get/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading,
  };
};

// get payment table
const useGetPaymentTryout = (currentPage: number, search: string, ) => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/user/report/payment/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/user/report/payment/get?page=${currentPage}&limit=10&search=${search}`,
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

// user get detail payment slug
const useGetUserTryoutPaymentSlug = (slug?: string) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<ReportPaymentSlugResponse>(
    `/user/report/payment/${slug}`,
    () =>
      axiosPrivate
        .get(`/user/report/payment/${slug}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading,
  };
};

// get feedback table
const useGetFeedbackUser = (currentPage: number, search: string, ) => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/user/history/feedback/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/user/history/feedback/get?page=${currentPage}&limit=10&search=${search}`,
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

// user get feedback id
const useGetUserFeedbackId = (id?: string) => {
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR<FeedbackDetailResponse>(
    `/user/history/feedback/detail/${id}`,
    () =>
      axiosPrivate
        .get(`/user/history/feedback/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => res.data) // Ensure `res.data` contains the desired data
  );

  return { data, error, mutate, isValidating, isLoading,
  };
};

// get report table
const useGetReportTryout = (currentPage: number, search: string, ) => {
  // const [accessToken] = useCookies("accessToken", "");
  const accessToken = Cookies.get("accessToken");
  const axiosPrivate = useAxiosPrivate();

  const { data, error, mutate, isValidating, isLoading } = useSWR(
    `/user/report/payment/get?page=${currentPage}&limit=10&search=${search}`,
    () =>
      axiosPrivate
        .get(
          `/user/report/payment/get?page=${currentPage}&limit=10&search=${search}`,
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

export {
  useGetReportTryout,
  useGetUserFeedbackId,
  useGetFeedbackUser,
  useGetUserTryoutPaymentSlug,
  useGetPaymentTryout,
  useGetTypePaymentFilter,
  useGetUserTryoutPackageId,
  useGetUserTryoutPackage,
  useGetQuestionPackageId,
  useGetBankQuestionType,
  useGetTypePackageFilter, 
  useGetTryoutPackage,
  useGetBankQuestion,
  useGetBannerHome,
  useGetBannerId,
  useGetBanner,
  useGetAboutCompany,
  putSubmitTnc,
  useGetTnc,
  useGetTypePackage, 
  postSubmitTypePackage,
  useGetTypePackageId,
  putSubmitTypePackage,
  useGetTypePayment, 
  postSubmitTypePayment,
  useGetTypePaymentId,
  putSubmitTypePayment,
  useGetTypeQuestion, 
  postSubmitTypeQuestion,
  useGetTypeQuestionId,
  putSubmitTypeQuestion,
};
