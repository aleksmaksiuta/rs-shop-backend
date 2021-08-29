import awsSdk from 'aws-sdk';
import csvParser from 'csv-parser';
import InternalServerError from '../../product-service/InternalServerError';

const { AWS_REGION, AWS_UPLOAD_BUCKET, AWS_UPLOAD_BUCKET_CATALOG } = process.env;
const S3 = new awsSdk.S3({ region: AWS_REGION });

export const fileParser = async () => {
  try {
    const result = await S3.listObjectsV2({
      Bucket: AWS_UPLOAD_BUCKET,
      Prefix: `${AWS_UPLOAD_BUCKET_CATALOG}/`,
      Delimiter: '/',
    }).promise();

    const objects = result.Contents.reduce((acc, { Key }) => {
      if (Key !== `${AWS_UPLOAD_BUCKET_CATALOG}/`) {
        return [...acc, Key];
      }

      return acc;
    },                                     []);

    objects.forEach((key) => {
      const objectParams = {
        Bucket: AWS_UPLOAD_BUCKET,
        Key: key,
      };

      const stream = S3.getObject(objectParams).createReadStream();

      stream
          .pipe(csvParser())
          .on('data', (data) => {
            console.log(data);
          })
          .on('error', (e) => {
            throw new Error(e.message);
          })
          .on('end', () => {
            console.log('End of file');
          });
    });
  } catch (e) {
    console.log('error', JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
};
