import { Callback, Context, Handler as LambdaHandler } from 'aws-lambda';

type Middleware<TEvent, TResult> = (event: TEvent, context: Context, callback: Callback, nextHandler: LambdaHandler) => Promise<TResult>;

/**
 * Creates lambda handler, which have middleware lambda handlers that are called before the actual lambdaHandler
 *
 * @param theHandler LambdaHandler that will be called after all the middleware lambda handlers have been called
 * @params middlewares: List of middleware lambda handlers. Middlewares are called in order of the array.
 *
 * @return lambda handler function that can be used AWS lambda handler
 */
export function createLambdaHandler<TEvent, TResult>(theHandler: LambdaHandler<TEvent, TResult>, middlewares: Middleware<TEvent, TResult>[]): LambdaHandler<TEvent, TResult> {
  const lambdaHandler = middlewares.reduceRight((p, c) => {
    return createMiddlewareLambdaHandler(c, p)
  }, theHandler);
  return lambdaHandler;
}

function createMiddlewareLambdaHandler<TEvent, TResult>(mw: Middleware<TEvent, TResult>, lambdaHandler: LambdaHandler<TEvent, TResult>): LambdaHandler<TEvent, TResult> {
  return async (event: TEvent, context: Context, callback: Callback) => {
    const next = async (e: TEvent, ctx: Context, cb: Callback) => await lambdaHandler(e, ctx, cb);
    return mw(event, context, callback, next);
  };
}
