
export async function handler(event: unknown, context: any) {
  console.log(event);
  console.log(context);
  context.callbackWaitsForEmptyEventLoop = false;

  return {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
    multiValueHeaders: {
      'Set-Cookie':  ['session=deadbeef; Secure; HttpOnly;', 'something=else; Secure; HttpOnly'],
    },
    statusCode: 200,
    body: '<!DOCTYPE html><html><body><h1>Hello from the otherside!</h1></body></html>',
  }
}
