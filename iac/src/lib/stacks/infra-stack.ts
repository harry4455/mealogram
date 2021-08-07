import * as cdk from "@aws-cdk/core";
import { RdsStack } from "./rds-stack";
import { ServerStack } from "./server-stack";

export interface InfraProps extends cdk.StackProps {
  prefix: string;
  environment: string;
}

export class InfraStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: InfraProps) {
    super(scope, id, props);

    const prefix = props?.prefix || "";

    /**
     * 📝 Server Stack
     * @description @aws-cdk/aws-ec2 를 사용하여 spring boot 인스턴스를 기동한다.
     **/

    const serverStack = new ServerStack(this, `${prefix}-serverStack`, {
      stackName: `${prefix}-serverStack`,
      environment: this.environment,
      prefix,
    });

    /**
     * 📝 rds Stack
     * @description @aws-cdk/aws-rds를 사용하여 rdb를 생성한다.
     **/
    const rdsStack = new RdsStack(this, `${prefix}-rdsStack`, {
      stackName: `${prefix}-rdsStack`,
      environment: this.environment,
      prefix,
    });
  }
}
