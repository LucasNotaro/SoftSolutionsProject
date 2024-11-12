export class AppError extends Error {
    public status: number;
  
    constructor(message: string, status: number) {
      super(message);
      this.status = status;
      Object.setPrototypeOf(this, AppError.prototype);
    }
  }
  