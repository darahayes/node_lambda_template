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

##Set up CircleCI
If you've cloned this project to create a new lambda function, you should set up CircleCI.

All you need to do is add the project and do the following.

- Click the settings icon beside the project. Under `Build Settings > Advanced Settings` permissive building of fork pull requests` should be **on.**
- Under `Build Settings > Environment Variables` add the AWS_SECRET_ACCESS_KEY and AWS_ACCESS_KEY_ID.

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

###gulp deploy
Runs a build and creates/updates a lambda function. the `AWS_AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID` environment variables must be set.

run `gulp deploy` to try this. The new function should be in the [Lambda console](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2) (us-west-2)
