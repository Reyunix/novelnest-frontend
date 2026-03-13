export type ApiSuccessResponse<TData> = {
  success: true;
  code: string;
  message: string;
  data: TData;
};
