import { Handler as LambdaHandler } from 'aws-lambda';

type Handler<Event, Result> = (event: Event) => Promise<Result>;
type EventValidator<Event> = (event: Event|unknown) => asserts event is Event;

/**
 * Wraps function to be called as lambda handler with verified Event
 */
export function createLambdaHandler<Event, Result>(handler: Handler<Event, Result>, validate: EventValidator<Event>): LambdaHandler {

  const lambdaHandler: LambdaHandler = async(event: Event|unknown, /*ctx: Context, callback: Callback*/): Promise<Result> => {
    validate(event);

    return await handler(event);
  }
  return lambdaHandler;
}
