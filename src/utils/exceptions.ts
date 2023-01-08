import {ApiException} from '~~/types/exceptions';

/**
 * Generic class used to create HTTP errors (here 400 and 404)
 *
 * We specify that our class must correspond to the `ApiException` interface
 *
 * The `readonly` keywords serve as a shorthand for `this.property=value`,
 * they also prevent us from changing values afterwards.
 *
 * Here `this.error = error` and `this.status = status`
 */
class Exception implements ApiException {
  constructor(readonly error: any, readonly status: number) {
  }
}


export class NotFoundException extends Exception {
  constructor(error: any) {
    super(error, 404);
  }
}

export class BadRequestException extends Exception {
  constructor(error: any) {
    super(error, 400);
  }
}
