import awsSdk from 'aws-sdk';

const { SNS_ARN } = process.env;
const SNS = new awsSdk.SNS();

const productCreated = (data) => {
  SNS.publish(
    {
      Subject: 'Product(s) created',
      Message: `Product(s) created -- ${JSON.stringify(data)}`,
      TopicArn: SNS_ARN,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
};

export default {
  productCreated,
};
