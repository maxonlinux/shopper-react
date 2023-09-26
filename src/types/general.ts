import { AxiosError, AxiosResponse } from "axios";

export enum ResponseStatus {
  Loading,
  Error,
  Empty,
  Success,
}

export enum ErrorCode {
  TokenExpired,
}

export interface ApiError extends AxiosError {
  response: AxiosResponse;
  isAuthExpired?: boolean;
}