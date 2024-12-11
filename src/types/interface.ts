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
  email: string;
  address: string;
  lat: string;
  long: string;
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
  Total_question: string;
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
  start_time: string;
  end_time: string;
  Bank_packages: BankPackage[];
  status: {
    total_filled: number;
    total_unfilled: number;
  };
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
  };
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
    id_payment: number;
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
  name: string; // Umpan balik dalam bentuk teks
  feedback: string; // Umpan balik dalam bentuk teks
  package_name: string; // Nama lengkap paket
  type_package_name: string; // Jenis paket
  date: string; // ISO date string
}

// profile user
interface UserInfo {
  id: number;
  name: string;
  slug: string;
  email: string;
  telepon: string;
  alamat: string | null;
  provinsi_id: number | null;
  kota_id: number | null;
  tempat_lahir: string | null;
  tgl_lahir: string | null;
  gender: number | null;
  asal_instansi: string | null;
  image_profile: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  User: {
    id: number;
  };
}

export interface UserInfoResponse {
  status: number;
  message: string;
  data: UserInfo;
}

// user all
interface User {
  id: number;
  slug: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserListResponse {
  data: User[];
  headers: string[];
  currentPage: number;
  search: string;
  status?: number;
  message?: string;
  pagination?: Pagination;
}

// user detail
interface UserDetail {
  id: number;
  name: string;
  email: string;
  telepon: string;
  alamat: string | null;
  gender: number;
  asal_instansi: string | null;
  provinsi_id: number | null;
  kota_id: number | null;
  kota_name: string;
  image_profile: string;
  provinsi_name: string;
  createdAt: string;
  updatedAt: string;
  program: ProgramUser[]; // Adjust the type of elements based on actual data structure
  performa: PerformaUser[]; // Adjust the type of elements based on actual data structure
}

interface ProgramUser {
  id: number;
  nama_package: string;
}

interface PerformaUser {
  id: number;
  packagetryout_id: number;
  nama_tryout: string;
  skor: string;
}

export interface UserDetailResponse {
  status: number;
  message: string;
  data: UserDetail;
}

// detail bank soal id
interface QuestionOption {
  id: number;
  key: string;
}

interface QuestionForm {
  id: number;
  field: string;
  tipedata: string;
  datajson: QuestionOption[];
  correct_answer: number;
  discussion: string;
}

interface TypeQuestion {
  name: string;
}

export interface QuestionFormResponse {
  code: number;
  message: string;
  data: {
    id: number;
    title: string;
    typequestion_id: number;
    Type_question: TypeQuestion;
    Question_forms: QuestionForm[];
  };
}

// provinsi
interface Province {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProvincesResponse {
  status: number;
  message: string;
  data: Province[];
}

// quiz
export interface QuestionTryoutResponse {
  code: number;
  message: string;
  data: {
    id: number;
    title: string;
    slug: string;
    attempt: number;
    start_time: string;
    end_time: string;
    Question_forms: QuestionForm[];
    status: {
      total_filled: number;
      total_unfilled: number;
    };
  };
}

interface QuestionForm {
  id: number;
  type_question_id: number;
  type_question_name: string;
  bank_soal_id: number;
  bank_soal_name: string;
  field: string;
  tipedata: string;
  datajson: Option[];
  answer: string | null;
}

interface Option {
  id: number;
  key: string;
}

// detail package tryout
export interface PackageTryoutResponseDetailOne {
  status: number;
  message: string;
  tes: string;
  data: PackageTryoutDetailOne;
}

interface PackageTryoutDetailOne {
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
  Bank_packages: BankDetailOne[];
}

interface BankDetailOne {
  id: number;
  packagetryout_id: number;
  banksoal_id: number;
  Bank_soal: BankSoalOne;
}

interface BankSoalOne {
  id: number;
  title: string;
  typequestion_id: number;
  Type_question: TypeQuestionOne;
}

interface TypeQuestionOne {
  name: string;
}

// QUIZ START
interface QuestionForm {
  id: number;
  type_question_id: number;
  type_question_name: string;
  bank_soal_id: number;
  bank_soal_name: string;
  field: string;
  tipedata: string;
  datajson: Option[];
  answer: string | null;
}

interface Option {
  id: number;
  key: string;
}

export interface QuizData {
  code: number;
  message: string;
  data: {
    id: number;
    title: string;
    slug: string;
    attempt: number;
    start_time: string;
    end_time: string;
    Question_forms: QuestionForm[];
    status: {
      total_filled: number;
      total_unfilled: number;
    };
  };
}

// schedule
export interface ScheduleTryoutResponse {
  data: ScheduleTryout[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

interface ScheduleTryout {
  id: number;
  title: string;
  packagetryout_id: number;
  tanggal: string; // format: "YYYY-MM-DD"
  waktu: string; // format: "HH:mm:ss"
  deletedAt: string | null;
  createdAt: string; // format: ISO 8601
  updatedAt: string; // format: ISO 8601
}

// history user
interface UserTryout {
  id: number;
  userinfo_id: number;
  name: string;
  skor: string | null;
  sertifikat: string | null;
  status: number;
  packagetryout_id: number;
  package_name: string;
  duration: string;
  typepackage_id: number;
  typepackage_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryUser {
  data: UserTryout[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

// history statistik user
interface TypeQuestionSummary {
  typeName: string;
  totalQuestions: number;
  totalScore: number;
}

interface PackageDetails {
  id: number;
  title: string;
  slug: string;
  description: string;
  duration: string;
  price: string;
  score: number;
  typeQuestionSummary: TypeQuestionSummary[];
}

export interface StatistikUser {
  code: number;
  message: string;
  data: PackageDetails;
}

// pembahasan user
interface DataJson {
  id: number;
  key: string;
}

interface QuestionCorrectAnswer {
  id: number;
  key: string;
  point: number;
}

interface QuestionFormDiscussion {
  id: number;
  type_question_id: number;
  type_question_name: string;
  bank_soal_id: number;
  bank_soal_name: string;
  field: string;
  tipedata: string;
  datajson: DataJson[];
  correct_answer: number | QuestionCorrectAnswer[];
  answer: string;
  discussion: string;
  isCorrect: boolean;
  points: number;
}

interface Status {
  total_questions: number;
  total_filled: number;
  total_unfilled: number;
  total_correct: number;
  total_uncorrect: number;
}

interface PackageDetails {
  id: number;
  title: string;
  slug: string;
  duration: string;
  Question_forms: QuestionFormDiscussion[];
  status: Status;
}

export interface DiscussionUser {
  code: number;
  message: string;
  data: PackageDetails;
}

// history all
interface TryoutHistory {
  id: number;
  userinfo_id: number;
  name: string;
  skor: string | null;
  sertifikat: string | null;
  status: number;
  duration: string;
  packagetryout_id: number;
  package_name: string;
  typepackage_id: number;
  typepackage_name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TryoutResponseHistory {
  data: TryoutHistory[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

// why us
export interface WhyUsResponse {
  data: WhyUsItem[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

interface WhyUsItem {
  id: number;
  title: string;
  description: string;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}

// why us by id
export interface WhyUsByIdResponse {
  status: number;
  message: string;
  data: WhyUsItem;
}

// setting sertifikat
export interface CertificateSettingResponse {
  status: number;
  message: string;
  data: CertificateSetting;
}

interface CertificateSetting {
  id: number;
  title: string;
  name: string;
  sign: string; // URL string
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}

// sosial media
export interface SocialMediaResponse {
  data: SocialMediaItem[];
  headers: string[];
  currentPage: number;
  search: string;
  pagination?: Pagination;
  status?: number;
  message?: string;
}

interface SocialMediaItem {
  id: number;
  title: string;
  link: string; // URL string
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}

// sosial media id
export interface SocialMediaByIdResponse {
  status: number;
  message: string;
  data: SocialMediaItem;
}

interface SocialMediaItem {
  id: number;
  title: string;
  link: string; // URL string
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}

// sertifikat
export interface SertifikatResponse {
  status: number;
  message: string;
  data: {
    id: number;
    sertifikat: string;
  };
};


// detail performa user
interface TypeQuestionSummary {
  typeName: string;
  totalQuestions: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalUnanswered: number;
  totalScore: number;
}

interface Status {
  total_questions: number;
  total_filled: number;
  total_unfilled: number;
  total_correct: number;
  total_uncorrect: number;
}

interface QuestionDetailsData {
  id: number;
  title: string;
  slug: string;
  startTime: string;
  endTime: string;
  description: string;
  duration: string;
  price: string;
  score: number;
  typeQuestionSummary: TypeQuestionSummary[];
  Question_forms: QuestionForm[];
  status: Status;
}

export interface QuestionDetailsResponse {
  code: number;
  message: string;
  data: QuestionDetailsData;
}

// dashboard
export interface DashboardResponse {
  status: number;
  message: string;
  data: DashboardData;
}

interface DashboardData {
  totalUser: number;
  totalPackageTryout: number;
  totalBankSoal: number;
  usersByPackageType: PackageType[];
  tryoutMonthly: MonthlyTryout[];
}

interface PackageType {
  type_package: string;
  user_count: number;
}

interface MonthlyTryout {
  month: string;
  user_count: number;
}

