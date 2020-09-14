/* eslint-disable @typescript-eslint/ban-types */

import {
  Request as expressRequest,
  Response as expressResponse,
  NextFunction as expressNextFunction,
} from 'express';

import { Output } from '../modules/common/types/output';
import { RError } from '../modules/common/types/error';

// errorAdapterMiddleware will catch error thrown by the handlers
// Wrap error / RError into ACResponse
const errorAdapterMiddleware = function errorAdaptingMiddlewareHandler(
  error: Error,
  request: expressRequest,
  response: expressResponse,
  nextFunc: expressNextFunction
): void {
  let rError: RError;
  if (error instanceof RError) {
    rError = error;
  } else {
    if ((error as any).status as number) {
      rError = new RError(error.message, (error as any).status);
    } else {
      rError = new RError(error.message);
    }
  }

  const output: Output<any> = {
    error: {
      code: rError.code,
      httpStatusCode: rError.httpStatusCode,
      message: rError.message,
    } as RError,
  };
  response.status(rError.httpStatusCode).send(output);
};

// TODO: Publish to log stream
const errorLoggingMiddleware = function errorLoggingMiddlewareHandler(
  error: Error,
  request: expressRequest,
  response: expressResponse,
  nextFunc: expressNextFunction
): void {
  console.error('Error caught from middleware:', error);
  nextFunc(error);
};

export { errorAdapterMiddleware, errorLoggingMiddleware };
