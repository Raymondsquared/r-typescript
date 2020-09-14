// RError represents error thrown by typescript microservices
// REF: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
class RError extends Error {
  code: number;
  httpStatusCode: number;

  constructor(errorString: string, code = 500, httpStatusCode = 500) {
    super(errorString);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, RError.prototype);

    this.code = code;
    this.httpStatusCode = httpStatusCode;
  }
}

export { RError };
