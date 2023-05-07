## How to develop

1. Each folder in `lambdas` directory is a separate lambda function.
2. Each lambda function has its own `package.json` file.
3. Run `npm run start:dev` for live rebuild and rerun your lambda function locally.

TODO: needs to create some kind of test files and test lambdas on it.

## How to deploy

### 1. Create .env file
```
AWS_LAMBDA_FUNCTION_NAME="--function-name $npm_package_name"
AWS_LAMBDA_HANDLER="--handler <your-handler>"
AWS_LAMBDA_RUNTIME="--runtime nodejs18.x"
AWS_LAMBDA_FILE="--zip-file fileb://artifacts/lambda/lambda-$npm_package_version.zip"
AWS_LAMBDA_ROLE="--role <your-arn-role-for-execution>"

AWS_LAMBDA_LAYER_NAME="--layer-name layer-$npm_package_name"
AWS_LAMBDA_LAYER_FILE="--zip-file fileb://artifacts/layer/layer-$npm_package_version.zip"
AWS_LAMBDA_LAYER_RUNTIME="--compatible-runtimes nodejs18.x"
AWS_LAMBDA_REGION="--region eu-central-1"
```

### 2. Build prod artifacts
```npm run build:prod```
it run building of lambda code and then create zip of lambda code and node_modules for layer

### 3. Deploy lambda
```npm run aws-lambda:update-finction-code```

### 4. Deploy layer
```npm run aws-lambda:publish```

### 5. Update lambda's layer
```npm run aws-lambda:update-layer```

## How to release new layer version in git
```npm run bump:patch```
```npm run bump:minor```

and then create git pr and merge it to master
