import {NextFunction, Request, Response} from 'express';

/**
 * Global error handling middleware
 *
 * @param err - Express error
 * @param req - Initial request
 * @param res - Response
 * @param next - Allows you to switch to the next middleware if existing
 *
 * @see https://expressjs.com/en/guide/error-handling.html
 */
export const ExceptionsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  /**
   * Default error handler
   */
  if (res.headersSent) {
    return next(err);
  }

  /**
   * If so, we know it's our own mistake
   */
  if (err.status && err.error) {
    return res
      .status(err.status)
      .json({error: err.error});
  }

  /**
   * In the other cases, we return a 500
   */
  return res
    .status(500)
    .json({error: 'Internal error'});
};
