import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as path from 'node:path';

export class LambdainfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFn = new lambda.Function(this, 'SayHello', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'dist/lambdahandlers.sayHelloHandler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../bundle/asset.zip')),
      timeout: cdk.Duration.seconds(60),
    });

    new logs.LogGroup(this, 'LogGroup', {
      logGroupName: `/aws/lambda/${lambdaFn.functionName}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      retention: 7, // days
    });
  }
}
