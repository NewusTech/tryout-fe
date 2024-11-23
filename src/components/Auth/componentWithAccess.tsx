import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingPage from "../ui/LoadingPage";

interface IComponentWithAccess {
  children: React.ReactNode;
  toLogin?: boolean;  // Jika true, redirect ke login
  toBack?: boolean;   // Jika true, redirect ke halaman sebelumnya
  toNotFound?: boolean; // Jika true, redirect ke halaman not found jika tidak ada akses
}

const ComponentWithAccess: React.FC<IComponentWithAccess> = ({
  toLogin = false,
  toBack = false,
  toNotFound = false,
  children,
}) => {
  const [access, setAccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken"); // Ambil token langsung dari cookies

    if (!accessToken) {
      // Jika token tidak ada, arahkan ke halaman sesuai opsi
      if (toLogin) {
        router.push("/login");
      } else if (toBack) {
        router.back();
      } else if (toNotFound) {
        router.push("/not-found");
      }
    } else {
      // Jika token ada, beri akses
      setAccess(true);
    }

    setLoading(false); // Hentikan loading setelah pengecekan selesai
  }, [router, toLogin, toBack, toNotFound]);

  if (loading) {
    return (
      <div className="">
        <LoadingPage />
      </div>
    );
  }

  return <>{access && children}</>;
};

export default ComponentWithAccess;
