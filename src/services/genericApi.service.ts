import axios, { AxiosError, AxiosResponse } from "axios";

export type GenericErrors = Array<string>;

/**
 * @description Generic error response type. Every error response will have a status code and an array of errors.
 */
export interface GenericError {
  success: false;
  error: ResponseErrorData & {
    status: number;
  }
}

/**
 * @description Generic success response type. Every success response will have a data field typed based on the request.
 * @example
 * const response: GenericSuccess<PlanningArea> = {
    success: true,
    data: {
      id: 1,
      name: 'Area 1',
      status: 'Draft'
    }
  }
 *
 */
export interface GenericSuccess<DType> {
  success: true;
  data: DType;
}

// Shorthand types
export type GenericResponse<DType> = GenericSuccess<DType> | GenericError;
export type GenericResponsePromise<DType> = Promise<GenericResponse<DType>>;


export type ResponseErrorData = {
  errors: Array<string>;
  message?: string;
}

export function makeGenericError(status: number, errorData: ResponseErrorData): GenericError {
  return {
    success: false,
    error: {
      status,
      ...errorData
    }
  };
}

/**
 * @description Generic function to make a POST request.
 * @param url url to make the request to
 * @param payload data to send in the request
 * @returns GenericResponsePromise<RDType>
 * @example
 * type NewAreaPayload = {
 *  name: string;
 * }
 * const response = await postRequest<NewAreaPayload, PlanningArea>('/api/planning-area', newArea);
 */
export async function postRequest<PType, RDType>(url: string, payload: PType): GenericResponsePromise<RDType> {
  try {
    const response = await axios.post(url, payload);
    const isOk = response.status >= 200 && response.status < 300;
    if (!isOk) {
      return makeGenericError(response.status, { errors: ['Unknown status code'] });
    }
    return {
      success: true,
      data: response.data as RDType
    };
  }
  catch (error) {
    const axError = error as AxiosError;
    const errorResponse = axError.response as AxiosResponse;
    console.log('errorResponse', errorResponse);
    return makeGenericError(errorResponse.status ?? 500, errorResponse.data);
  }
}
/**
 *
 * @param url - url to make the request to
 * @param payload - data to send in the request
 * @returns GenericResponsePromise<RDType>
 * @example
 * const response = await patchRequest<Partial<PlanningArea>, PlanningArea>('/api/planning-area', areaUpdates);
 */
export async function patchRequest<PType, RDType>(url: string, payload: PType): GenericResponsePromise<RDType> {
  try {
    const response = await axios.patch(url, payload);
    const isOk = response.status >= 200 && response.status < 300;
    if (!isOk) {
      return makeGenericError(response.status, response.data.errors);
    }
    return {
      success: true,
      data: response.data as RDType
    }
  }
  catch (error) {
    const axError = error as AxiosError;
    const errorResponse = axError.response as AxiosResponse;
    console.log('errorResponse', errorResponse);
    return makeGenericError(errorResponse.status ?? 500, errorResponse.data);
  }
}

/**
 * Generic function to make a GET request.
 * @param url
 * @returns GenericResponsePromise<RDType>
 * @example
 * const response = await getRequest<PlanningArea[]>('/api/planning-area');
 */
export async function getRequest<RDType>(url: string): GenericResponsePromise<RDType> {
  try {
    const response = await axios.get(url);
    const isOk = response.status >= 200 && response.status < 300;
    if (!isOk) {
      return makeGenericError(response.status, response.data.errors);
    }
    return {
      success: true,
      data: response.data as RDType
    }
  }
  catch (error) {
    const axError = error as AxiosError;
    const errorResponse = axError.response as AxiosResponse;
    console.log('errorResponse', errorResponse);
    return makeGenericError(errorResponse.status ?? 500, errorResponse.data);
  }
}
