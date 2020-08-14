# Local Deployment Instructions for the Amazon IVS eCommerce Backend

Deploy a simple serverless stack with API Gateway, Lambda and DynamoDB to store and retrieve product details.

## Prerequisites 

* Access to AWS Account with permission to create IAM role, DynamoDB, Lambda, API Gateway, S3, and Cloudformation.
* [AWS CLI Version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
* [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)


## Deploy from your local machine

Before you start, run below command to make sure you're in the correct AWS account and configured.
```
aws configure
```
For additional help on configuring, please see https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

### 1. Create an S3 bucket

* Replace `<my-bucket-name>` with your bucket name.
* Replace `<my-region>` with your region name.

```
aws s3api create-bucket --bucket <my-bucket-name> --region <my-region> \
--create-bucket-configuration LocationConstraint=<my-region>
```

### 2. Pack template with SAM
```
sam package \
--template-file template.yaml \
--output-template-file packaged.yaml \
--s3-bucket <my-bucket-name>
```
DO NOT run the output from above command, proceed to next step.

### 3. Deploy Cloudformation with SAM

Replace `<my-stack-name>` with your stack name.

Run with default DynamoDB table name `products`:
```
sam deploy \
--template-file packaged.yaml \
--stack-name <my-stack-name> \
--capabilities CAPABILITY_IAM
```

Optional - You can override the default DynamoDB table name by replacing `<my-table-name>` below and run:
```
sam deploy \
--template-file packaged.yaml \
--stack-name <my-stack-name> \
--capabilities CAPABILITY_IAM \
--parameter-overrides TableName=<my-table-name>
```

On completion, copy the value of `SimpleProductEnpointURL` as you will need it later for your client.

If you run into error with `ROLLBACK_COMPETE` then perform Clean Up > Step 1 and re-run this step.

To retrieve Cloudformation stack outputs again run 
```
aws cloudformation describe-stacks --stack-name <my-stack-name> 

aws cloudformation describe-stacks \
--stack-name <my-stack-name> --query 'Stacks[].Outputs'
```

### 4. Import sample products

Upload product images to S3 bucket from step 1
```
aws s3 cp ./product_images/ s3://<my-bucket-name>/products --recursive --exclude "*" --include "*.jpg"
```

Add S3 bucket policy to allow public read access to product images.
Open `s3-policy.json` and replace `<my-bucket-name>` with S3 bucket name from step 1. Save and run command below.

Note, we're allowing only `/<my-bucket-name>/products` folder to be public.
```
aws s3api put-bucket-policy --bucket <my-bucket-name> --policy file://s3-policy.json
```

Verify bucket policy
```
aws s3api get-bucket-policy --bucket <my-bucket-name>
```

Next, open `products.json` file and replace

* `<my-bucket-name>` with bucket name from step 1
* `<my-region>` with your bucket region
* Save the file and run the command below to create product details in DynamoDB

If you overrides the default DynamoDB table name then you will need to update line 2; replace `products` with `<my-table-name>`.

```
aws dynamodb batch-write-item \
--request-items file://products.json
```

### 5. Verify data import

If you overrides the default DynamoDB table name then you will need replace `products` with `<my-table-name>`.

```
aws dynamodb scan --table-name products
aws dynamodb get-item --table-name products --key '{"id":{"S":"1000567890"}}'
```

### 6. Verify API Gateway 

Verify product details can be retrieved from DynamoDB. Copy and paste link below into your browser.
```
https://url-from-step-3
https://url-from-step-3?productId=1000567890
```
### 7. Deploy eCommerce Web UI Demo

Follow these [detailed instructions](../web-ui) on how to get the web demo running.

## Clean Up

1. Delete Cloudformation stack:
```
aws cloudformation delete-stack --stack-name <my-stack-name>
```

3. Remove files in S3 bucket
```
aws s3 rm s3://<my-bucket-name> --recursive
```

2. Delete S3 bucket
```
aws s3api delete-bucket --bucket <my-bucket-name> --region <my-region>
```