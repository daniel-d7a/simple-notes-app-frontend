export interface IPaginationData {
  page: number;
  pageSize: number;
  total: number;
  lastPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
