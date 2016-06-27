module.exports = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // optional
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // optional
  sessionToken: process.env.AWS_SESSION_TOKEN,  // optional
  profile: '<shared credentials profile name>', // optional for loading AWS credientail from custom profile
  region: 'us-west-1',
  handler: 'index.handler',
  role: '<role arn>',
  functionName: '<function name>',
  timeout: 10,
  memorySize: 128,
  publish: true, // default: false,
  runtime: 'nodejs4.3', // default: 'nodejs4.3',
  vpc: { // optional
    SecurityGroupIds: [],
    SubnetIds: []
  },
  eventSource: {
    EventSourceArn: '<event source such as kinesis ARN>',
    BatchSize: 200,
    StartingPosition: "TRIM_HORIZON"
  }
}