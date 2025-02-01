
export type CustomErrorResponse = {
    success?: boolean;
    message: string;
}

export type ApiDataResponse<K extends string, V> = {
    success?: boolean;
    message: string;
  } & Record<K, V>;