import { Callback, Context, Handler as LambdaHandler } from 'aws-lambda';
import { createLambdaHandler } from '../middleware';

describe('middleware', () => {
  test('one middleware component', async () => {
    let callIndex = 0;

    let theHandlerCalled = 0;
    let mw1Called = 0;
    let mw2Called = 0;
    let mw3Called = 0;

    const theHandler = async (event: { data: number }): Promise<number> => {
      callIndex++;
      theHandlerCalled = callIndex
      return event.data
    };
    const mw1 = async(event: unknown, ctx: Context, cb: Callback, nextHandler: LambdaHandler): Promise<number> => {
      callIndex++;
      mw1Called = callIndex;
      const result = await nextHandler(event, ctx, cb);
      return result;
    };
    const mw2 = async(event: unknown, ctx: Context, cb: Callback, nextHandler: LambdaHandler): Promise<number> => {
      callIndex++;
      mw2Called = callIndex;
      const result = await nextHandler(event, ctx, cb);
      return result;
    };
    const mw3 = async(event: unknown, ctx: Context, cb: Callback, nextHandler: LambdaHandler): Promise<number> => {
      callIndex++;
      mw3Called = callIndex;
      const result = await nextHandler(event, ctx, cb);
      return result;
    }

    const handler = createLambdaHandler(theHandler, [mw1, mw2, mw3]);

    const result = await handler({ data: 1 }, {} as Context, () => {});

    expect(result).toEqual(1);

    expect(mw1Called).toEqual(1);
    expect(mw2Called).toEqual(2);
    expect(mw3Called).toEqual(3);
    expect(theHandlerCalled).toEqual(4);
  });
});
