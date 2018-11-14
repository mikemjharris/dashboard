#!/bin/bash

npm run build-prod 

aws s3 sync ./dist s3://mj-status-dashboard --acl bucket-owner-full-control --acl public-read --profile personal

