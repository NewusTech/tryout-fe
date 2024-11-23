import Swal from "sweetalert2";

export const showAlert = (type: "success" | "error", message: string) => {
  const isSuccess = type === "success";

  Swal.fire({
    title: isSuccess ? "Berhasil" : "Gagal",
    text: message,
    imageUrl: isSuccess
      ? "/assets/images/success-icon.png" // Gambar custom untuk sukses
      : "/assets/images/error-icon.png", // Gambar custom untuk error
    imageWidth: 130,
    imageAlt: isSuccess ? "Success Image" : "Error Image",
    timer: isSuccess ? 2000 : undefined,
    showConfirmButton: !isSuccess,
    // timerProgressBar: isSuccess,
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
    customClass: {
      // popup: "w-[350px] h-[350px] !p-5 rounded-[20px]", 
      popup: "rounded-[20px]", 
      title: isSuccess
        ? "text-2xl font-semibold text-green-600"
        : "text-2xl font-semibold text-red-600",
      timerProgressBar: "bg-gradient-to-r from-blue-400 to-green-400",
      confirmButton: "bg-primary", // Warna biru untuk tombol konfirmasi
    },
    backdrop: `rgba(0, 0, 0, 0.4)`, // Custom backdrop transparency
  });
};
