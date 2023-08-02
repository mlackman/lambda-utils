export interface SayHelloParams {
  name: string;
}

export function sayHello(params: SayHelloParams) {
  console.log(`Hello, ${params.name}`);
}
