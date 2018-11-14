#!/bin/bash

rm lambda.zip
zip -r lambda.zip lambda

aws lambda update-function-code --zip-file fileb://./lambda.zip --function-name nodeServerStatus --region eu-west-1 --profile personal


