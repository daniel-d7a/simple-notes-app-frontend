import { IPaginationData } from "./ipagination-data";

export interface IPaginatedResponse<T> extends IPaginationData {
  data: T[];
}
