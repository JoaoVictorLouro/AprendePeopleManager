import * as cdk from '@aws-cdk/core';
import * as rds from '@aws-cdk/aws-rds';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as secretsmanager from '@aws-cdk/aws-secretsmanager';
import { ApplicationProtocol } from '@aws-cdk/aws-elasticloadbalancingv2';
import * as certificatemanager from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';

import { resolve } from 'path';



export class AprendePeopleManagerCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "AprendeVPC", {
      maxAzs: 2,
    });

    const ecsCluster = new ecs.Cluster(this, "AprendeCluster", {
      clusterName: 'AprendeCluster',
      vpc: vpc,
    });

    const s3bucket = new s3.Bucket(this, "AprendeCDN", {
      bucketName: "aprende-cdn",
      versioned: false,
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
    });

    const dbName = 'people_manager';
    const dbUser = 'postgres';

    const dbPassowrdSecret = new secretsmanager.Secret(this, 'db-password', {
      description: 'DBMasterPassword',
      secretName: 'aprendedbmasterpassword',
      generateSecretString: {
        excludePunctuation: true,
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const db = new rds.DatabaseInstance(this, "AprendeDB", {
      vpc,
      instanceIdentifier: 'aprendedb',
      autoMinorVersionUpgrade: true,
      databaseName: dbName,
      engine: rds.DatabaseInstanceEngine.POSTGRES,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
      masterUsername: dbUser,
      masterUserPassword: dbPassowrdSecret.secretValue,


      // Keeping this demo easy to destroy, don't do the following in prod.
      deletionProtection: false,

    });

    const cert = certificatemanager.Certificate.fromCertificateArn(this, 'joaovictorlouro-cert', 'arn:aws:acm:us-east-1:813907278121:certificate/dd3fd3ce-0baf-49bf-aaf4-728958c6b8b3');

    const domainZone = route53.HostedZone.fromHostedZoneAttributes(this, 'joaovictorlouro-zone', {
      zoneName: 'joaovictorlouro.com',
      hostedZoneId: 'Z21NEZUNUIXKVV',
    });

    const app = new ecsPatterns.ApplicationLoadBalancedFargateService(this, "AprendeApp", {
      cluster: ecsCluster,
      cpu: 256,
      desiredCount: 1,
      publicLoadBalancer: true,
      domainName: 'aprende.joaovictorlouro.com',
      domainZone,
      protocol: ApplicationProtocol.HTTPS,
      certificate: cert,
      taskImageOptions: {
        environment: {
          PORT: '80',
          DATABASE_URL: `postgresql://${dbUser}:${dbPassowrdSecret.secretValue}@${db.dbInstanceEndpointAddress}:${db.dbInstanceEndpointPort}/${dbName}`
        },
        image: ecs.ContainerImage.fromAsset(resolve(__dirname, '../../aprende-people-manager-server'), {
          file: './docker/prod/server/Dockerfile',
        }),
      },
    });

    app.targetGroup.configureHealthCheck({
      path: "/people",
    })

    const uiDeploy = new s3Deployment.BucketDeployment(this, 'AprendeCDNDeploy', {
      destinationBucket: s3bucket,
      sources: [
        s3Deployment.Source.asset(resolve(__dirname, '../../aprende-people-manager-webapp/build')),
      ],
    });

    new cloudfront.CloudFrontWebDistribution(this, 'AprendeCDNOverCloudFront', {
      originConfigs: [{
        s3OriginSource: {
          s3BucketSource: s3bucket,
        },
        behaviors: [{ isDefaultBehavior: true }]
      }]
    });
  }
}
