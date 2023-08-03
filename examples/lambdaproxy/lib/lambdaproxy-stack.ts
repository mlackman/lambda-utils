import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';

export class LambdaproxyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new lambda.NodejsFunction(this, 'handler');

    new apigateway.LambdaRestApi(this, 'API', {
      handler: fn,
      proxy: true,
    });


  }
}
