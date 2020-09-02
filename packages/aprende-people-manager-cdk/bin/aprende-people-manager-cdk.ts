#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AprendePeopleManagerCdkStack } from '../lib/aprende-people-manager-cdk-stack';

const app = new cdk.App();
new AprendePeopleManagerCdkStack(app, 'AprendePeopleManagerCdkStack');
