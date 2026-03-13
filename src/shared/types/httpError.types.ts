export type AppHttpErrorType = {
  status: number;
  message: string;
  errorCode: string;
  url?: string;
  method?: string; // http method used (GET/POST...)
  cause?: unknown; // original error for debugging
};

export class AppHttpError extends Error {
  public readonly status: number;
  public readonly errorCode: string;
  public readonly url?: string;
  public readonly method?: string;

  constructor(error: AppHttpErrorType) {
    super(error.message, {cause: error.cause});

    this.name = "AppHttpError";
    this.status = error.status;
    this.errorCode = error.errorCode;
    this.url = error.url;
    this.method = error.method;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}