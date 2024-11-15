export class ApiError extends Error {
  statusCode: number;
  context: string;
  constructor(message: string, status: number, context: string) {
    super(message);
    this.statusCode = status;
    this.context = context;
  }
}
