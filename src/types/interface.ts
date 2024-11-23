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

