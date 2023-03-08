export class PaginationResponse<T> {
  code: number;
  message: string;
  total: number;
  data: T[];
  constructor(code: number, data: T[], total: number, message: string) {
    this.code = code;
    this.message = message;
    this.total = total;
    this.data = data;
  }
}
