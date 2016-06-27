#Nodejs AWS Lambda Template

##How it works

`index.js` exports the handler function which will be called in AWS Lambda.

```js
'use strict';

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    console.log('value1 =', event.key1);
    console.log('value2 =', event.key2);
    console.log('value3 =', event.key3);
    callback(null, event.key1);  // Echo back the first key value
    // callback('Something went wrong');
};
```

This is the hello world template but AWS provides plenty of 'blueprints' for interacting with different AWS services.

##Configuration
`lambda-config.defaults.js` should be renamed to `lambda-config.js` and should be set up appropriately. This script reads AWS credentials from the environment and defines parameters for the creation of the lambda function.

##Testing
For now testing is done with [mocha](https://mochajs.org/). Mocha is easy to setup and it works well with callback heavy code.

To run tests locally either

```bash
sudo npm i -g mocha #global install
mocha #run tests
```

or if you don't want to install it globally:

```bash
./node_modules/mocha/bin/mocha #run tests
```

## Gulp
This project uses a slightly modified version of a really handy build [template](https://github.com/ThoughtWorksStudios/node-aws-lambda) from the thoughtworks team.

###gulp build
`index.js` and production dependencies are packaged into `build` and `build.zip`. Tests are not packaged.

Additional root directories are packaged too. e.g. a `utils` or `lib` directory and any `.js` files within will be packaged up too.

run `gulp build` to check this out.

###gulp upload
creates or updates a lambda function using the built project. the `AWS_AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID` environment variables must be set.

run `gulp upload` to try this. The new function should be in the [Lambda console](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2) (us-west-2)

###gulp deploy
combines the build and upload tasks into a single task.

run `gulp deploy`

