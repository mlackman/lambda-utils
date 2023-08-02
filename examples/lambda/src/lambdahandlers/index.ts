import { lambda } from 'lambda-utils';
import { sayHello, SayHelloParams } from '../api';

export const sayHelloHandler = lambda.createLambdaHandler(async (event: SayHelloParams) => sayHello(event), assertIsSayHelloParams);

function assertIsSayHelloParams(event: unknown): asserts event is SayHelloParams {
  const e = event as SayHelloParams;

  if (e == null || e.name == null || typeof e.name !== 'string' || e.name.length === 0) {
    throw new Error('name must be string with length > 0!');
  }
}
