import { useState } from "react";
import Cookies from "js-cookie";

const useCookies = (key: string, initialValue: any) => {
  const [state, setState] = useState(() => {
    try {
      const value = Cookies.get(key);
      // Coba parse JSON, jika gagal, kembalikan nilai string mentah atau initialValue
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.warn(`Cookie "${key}" tidak dapat di-parse sebagai JSON. Menggunakan nilai mentah:`, error);
      return Cookies.get(key) || initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      Cookies.set(key, JSON.stringify(valueToStore), { expires: 7 }); // Cookie berlaku selama 7 hari
      setState(valueToStore);
    } catch (error) {
      console.error(`Gagal menyimpan cookie "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      Cookies.remove(key);
      setState(initialValue);
    } catch (error) {
      console.error(`Gagal menghapus cookie "${key}":`, error);
    }
  };

  return [state, setValue, removeValue] as const;
};

export default useCookies;
