module.exports = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // optional
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // optional
  region: 'us-west-2',
  handler: 'index.handler',
  role: 'arn:aws:iam::531035182238:role/lambda_basic_execution',
  functionName: 'my_test_node_function',
  timeout: 10,
  memorySize: 128,
  publish: true, // default: false,
  runtime: 'nodejs4.3' // default: 'nodejs4.3',
}