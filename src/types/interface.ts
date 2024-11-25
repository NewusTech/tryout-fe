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

