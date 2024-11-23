import React, { useState, useEffect } from "react";
import SuccessModalIcon from "../../../public/assets/icons/SuccessModal";
import FailedModalIcon from "../../../public/assets/icons/FailedModalIcon";

type ModalAksiProps = {
  isOpen: boolean; // Mengontrol apakah modal ditampilkan
  iconType: "success" | "failed"; // Jenis ikon yang akan ditampilkan
  headingText: string; // Teks heading
  subheadingText: string; // Teks subheading
  showCloseButton?: boolean; // Menampilkan tombol tutup atau tidak
  onClose?: () => void; // Fungsi yang dipanggil saat modal ditutup
};

const ModalAksi: React.FC<ModalAksiProps> = ({
  isOpen,
  iconType,
  headingText,
  subheadingText,
  showCloseButton = false,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 2000); // Delay untuk animasi keluar
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null; // Tidak render jika modal tertutup

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-2000 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="card bg-white shadow-xl border border-gray-100 h-[350px] aspect-square p-5 flex flex-col rounded-xl justify-center items-center">
        {/* Icon */}
        <div className="p-4 bg-white shadow-md rounded-full flex justify-center items-center">
          {iconType === "success" ? <SuccessModalIcon /> : <FailedModalIcon />}
        </div>

        {/* Heading Text */}
        <div className={`text-lg font-medium mt-8 ${iconType === "success" ? "text-[#388E3C]" : "text-red-600"}`}>
          {headingText}
        </div>

        {/* Subheading Text */}
        <div className="mt-1 text-center text-gray-600">{subheadingText}</div>

        {/* Close Button */}
        {showCloseButton && (
          <button
            className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={onClose}
          >
            Tutup
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalAksi;
