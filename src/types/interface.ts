export interface debounceInterface {
  value: string;
  delay: number;
}

export interface SelectSearchProps {
  data: { value: string | number; label: string }[]; // Definisikan tipe data
  placeholder: string;
  valueId?: { id: string | number; label: string };
  type?: string;
  setValueId?: (v: { id: string | number; label: string }) => void;
}

interface Pagination {
  page: number;
  perPage: number;
  totalPages: number;
  totalCount: number;
  links: {
    prev: string | null;
    next: string | null;
  };
}

// type Package
export interface PackageResponse {
  data: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
  headers: string[];
  currentPage: number;
  search: string;
  status?: number;
  message?: string;
  pagination?: Pagination;
}

export interface PackageResponseOne {
  status: number;
  message: string;
  data: {
    id: number;
    name: string;
  };
}

// type Question
export interface QuestionResponse {
  headers: string[];
  currentPage: number;
  search: string;
  data: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
  status?: number;
  message?: string;
  pagination?: Pagination;
}

export interface QuestionResponseOne {
  status: number;
  message: string;
  data: {
    id: number;
    name: string;
  };
}

// type payment
export interface PaymentResponse {
  headers: string[];
  currentPage: number;
  search: string;
  data: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  }[];
  status?: number;
  message?: string;
  pagination?: Pagination;
}

// type payment filter
export interface PaymentResponseFilter {
  data: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface PaymentResponseOne {
  status: number;
  message: string;
  data: {
    id: number;
    title: string;
  };
}

// snk
export interface SnkResponse {
  status: number;
  message: string;
  data: {
    id: number;
    term_condition: string;
    privacy_policy: string;
  };
}

// about company
export interface CompanyProfileResponse {
  status: number;
  message: string;
  data: CompanyProfile;
}

interface CompanyProfile {
  id: number;
  title: string;
  sub_title: string;
  description: string;
  telepon: string;
  main_logo: string;
  sub_logo: string;
  createdAt: string;
  updatedAt: string;
}

// banner
export interface BannerResponse {
  headers: string[];
  currentPage: number;
  data: {
    id: number;
    image: string;
  }[];
  status?: number;
  message?: string;
  pagination?: Pagination;
}

export interface BannerResponseOne {
  data: {
    id: number;
    image: string;
  };
  status?: number;
  message?: string;
}

// bankquestion
export interface BankSoalResponse {
  data: BankSoal[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

interface BankSoal {
  id: number;
  title: string;
  typequestion_id: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  Type_question_name: string;
}

// paket tryout
export interface PackageTryoutResponse {
  data: PackageTryout[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

interface PackageTryout {
  id: number;
  user_id: number | null;
  title: string;
  slug: string;
  description: string;
  duration: string; // Menyimpan durasi sebagai string (dari API)
  price: string; // Menyimpan harga sebagai string (dari API)
  typepackage_id: number;
  total_question: string; // Menyimpan total pertanyaan sebagai string (dari API)
  Type_package_name: string; // Nama tipe paket
}

// soal paket (user)
export interface ResponseQuestionPackage {
  code: number;
  message: string;
  data: QuestionFormData;
}

interface QuestionFormData {
  id: number;
  title: string;
  slug: string;
  Bank_packages: BankPackage[];
  status: {
    total_filled : number;
    total_unfilled : number;
  }
}

interface BankPackage {
  id: number;
  packagetryout_id: number;
  banksoal_id: number;
  Bank_soal: BankSoal;
}

interface BankSoal {
  id: number;
  title: string;
  typequestion_id: number;
  Type_question: TypeQuestion;
  Question_forms: QuestionForm[];
}

interface TypeQuestion {
  name: string;
}

interface QuestionForm {
  id: number;
  field: string;
  tipedata: string;
  datajson: DataJson[];
  answer: string | null;
}

interface DataJson {
  id: number;
  key: string;
}

//paket user tryout id
export interface PackageTryoutResponseOne {
  status: number;
  message: string;
  data: PackageTryoutData;
}

interface PackageTryoutData {
  id: number;
  user_id: number | null;
  title: string;
  slug: string;
  description: string;
  duration: string;
  price: string;
  typepackage_id: number;
  total_question: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  Bank_packages: BankPackage[];
  status: {
    total_filled: number;
    total_unfilled: number;
  }
}

interface BankPackage {
  id: number;
  packagetryout_id: number;
  banksoal_id: number;
  Bank_soal: BankSoal;
}

interface BankSoal {
  id: number;
  title: string;
  typequestion_id: number;
  Type_question: TypeQuestion;
}

interface TypeQuestion {
  name: string;
}

// history payment
export interface PaymentHistoryResponse {
  data: UserData[];
  headers: string[];
  currentPage: number;
  search: string;
  status?: number;
  message?: string;
  pagination?: Pagination;
}

interface UserData {
  id: number;
  slug: string;
  name: string;
  email: string;
  type_package?: string;
  payment_id?: number;
  metode_payment?: string | null;
  price?: string | null;
  receipt?: string | null;
  tanggal: string; // ISO date string
  updatedAt: string; // ISO date string
}

// payment by slug
export interface ReportPaymentSlugResponse {
  status: number;
  message: string;
  data: {
    id: number;
    name: string;
    metode_payment: string;
    price: string;
    receipt: string;
    package_user: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  };
}

// feedback
export interface FeedbackHistoryResponse {
  data: FeedbackHistory[];
  headers: string[];
  currentPage: number;
  search: string;
  status?: number;
  message?: string;
  pagination?: Pagination;
}

interface FeedbackHistory {
  id: number;
  name: string;
  package_id: number;
  package_name: string;
  total_feedback: number;
  nila_feedback: number;
  created_at: string; // ISO date string
}

// feedback detail
export interface FeedbackDetailResponse {
  status: number;
  message: string;
  data: FeedbackDetail;
}

interface FeedbackDetail {
  id: number;
  question_1: number; // Skor atau penilaian untuk pertanyaan 1
  feedback: string; // Umpan balik dalam bentuk teks
  package_name: string; // Nama lengkap paket
  type_package_name: string; // Jenis paket
  date: string; // ISO date string
}




