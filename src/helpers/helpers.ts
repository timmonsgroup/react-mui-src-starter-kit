/**
 * Returns the error message from the server response in an array
 * @param {object} error - The error object
 * @param {string} fallback - The fallback error message
 * @return {array<string>} The error messages
 *  */

import { FIELD_TYPES } from "@timmons-group/shared-react-components";
import Decimal from "decimal.js";
import { AuthContext } from "@timmons-group/shared-react-auth";

export const getUserAcls = (useAuthObject: AuthContext = {} as AuthContext) => {
  const { authState: { user } = {} } = useAuthObject;
  const { acl } = user || {};
  return acl ?? [];
}

/**
 * Use Decimal.js to format a number to 1 decimal places and return a Decimal object.
 * @param acres
 * @returns Decimal
 */
export const decimalAcres = (acres: number): Decimal => {
  return new Decimal(acres).toDecimalPlaces(1);
}

/**
 * Use Decimal.js to format a number to 1 decimal places and return a number.
 * @param acres
 * @returns
 */
export const decimalAcresNumber = (acres: number): number => {
  return decimalAcres(acres).toNumber();
}

/**
 * Use Decimal.js to format a number to 2 decimal places and return a Decimal object.
 * @param currency
 * @returns Decimal
 */
export const decimalCurrency = (currency: number): Decimal => {
  return new Decimal(currency).toDecimalPlaces(2);
}

/**
 * Use Decimal.js to format a number to 2 decimal places and return a number.
 * @param currency
 * @returns
 */
export const decimalCurrencyNumber = (currency: number): number => {
  return decimalCurrency(currency).toNumber();
}

export type CalcSumFormat = 'currency' | 'acres' | 'number';

export const calcSum = (fields: Array<string>, data: Record<string, any>, format: CalcSumFormat = 'number'): number => {

  let formatter = (num: number) => {
    return new Decimal(num);
  }

  if (format === 'currency') {
    formatter = decimalCurrency;
  } else if (format === 'acres') {
    formatter = decimalAcres;
  }

  const sum: number = fields.reduce(
    (acc: number, fieldId: string) => {
      const theData = parseFloat(data?.[fieldId]) || 0;
      const dAcc = formatter(acc);
      const dItem = formatter(theData);
      const result = dAcc.plus(dItem).toNumber();
      return result;
    }, 0
  )
  return sum;
}

export const calcMultiply = (fields: Array<string>, data: Record<string, any>, format: CalcSumFormat = 'number'): number => {

    let formatter = (num: number) => {
      return new Decimal(num);
    }

    if (format === 'currency') {
      formatter = decimalCurrency;
    } else if (format === 'acres') {
      formatter = decimalAcres;
    }

    const product: number = fields.reduce(
      (acc: number, fieldId: string) => {
        const theData = parseFloat(data?.[fieldId]) || 0;
        const dAcc = formatter(acc);
        const dItem = formatter(theData);
        const result = dAcc.times(dItem).toNumber();
        return result;
      }, 1
    )
    return product;
  }

export const createGridColumn = (label: string, colId: string | number, type: number = FIELD_TYPES.TEXT, flex = 0, otherProps = {}) => (
  {
    label,
    path: colId,
    type,
    flex,
    ...otherProps
  }
);

export type ValidationError = {
  fieldId: string;
  message: string;
}

export type DataError = {
  message?: string;
  validationErrors?: ValidationError[];
}

export type ErrorResponse = {
  data: ErrorData
}

export type ErrorData = {
  error: DataError
}

export type ServerError = {
  response: ErrorResponse | ErrorData;
}

export const getServerErrorMessages = (error: ServerError, fallback = 'An unknown error occurred') => {
  let message = [fallback];
  let errorResponseData: DataError = (error.response as ErrorResponse)?.data?.error;
  if (!errorResponseData) {
    errorResponseData = (error.response as ErrorData).error;
  }

  if (errorResponseData) {
    if (errorResponseData.validationErrors) {
      // add validation errors to message
      errorResponseData.validationErrors.forEach((validationError) => {
        message.push(validationError.message);
      });
    } else if (errorResponseData.message) {
      message = [errorResponseData.message];
    }
    // if (Array.isArray(errorResponse)) {
    //   console.log('Error message of type array received from server')
    //   // message = errorResponse.join('<br>');
    //   message = errorResponse;
    // } else if (typeof errorResponse === 'string') {
    //   console.log('Error message of type string received from server')
    //   message = [errorResponse];
    // } else if (typeof errorResponse === 'object') {
    //   console.warn('Error message of type object received from server. Using default message');
    // } else {
    //   console.warn('Error message of unknown type received from server. Using default message');
    // }
  }
  return message;
}

export const createTextModel = (
  name: string,
  label: string,
  required = false,
  otherThings = {},
  dataThings = {}
) => ({
  label,
  path: name,
  type: 0,
  model: {
    name,
    type: 0,
    data: dataThings,
  },
  required,
  ...otherThings,
});

export const createLongTextModel = (name: string,
  label: string,
  required = false,
  otherThings = {},
  dataThings = {}
) => ({
  label,
  path: name,
  type: FIELD_TYPES.LONG_TEXT,
  model: {
    name,
    type: FIELD_TYPES.LONG_TEXT,
    data: dataThings,
  },
  required,
  ...otherThings,
});

export const createCurrencyModel = (name: string, label: string, required = false, otherThings = {}) => {
  const nonNeg = { ...otherThings, minValue: 0 };
  return createAnyModel(FIELD_TYPES.CURRENCY, name, label, required, nonNeg)
};

export const createPositiveCountModel = (name: string, label: string, required = false, otherThings = {}) => (
  createAnyModel(FIELD_TYPES.INT, name, label, required, { ...otherThings, minValue: 0 })
);

export const createAcresModel = (name: string, label: string, required = false, otherThings = {}) => (
  createAnyModel(FIELD_TYPES.FLOAT, name, label, required, { ...otherThings, minValue: 0, fractionalDigits: 1 })
);

export const createAnyModel = (fieldType: number, name: string, label: string, required = false, otherThings = {}) => {
  const type = fieldType ?? FIELD_TYPES.TEXT;
  return {
    label,
    path: name,
    type,
    model: {
      name,
      id: 5,
      modelid: 10,
      type,
    },
    required,
    ...otherThings,
  }
};