import awsSdk from 'aws-sdk';
import csvParser from 'csv-parser';
import InternalServerError from '../../product-service/InternalServerError';

const {
  AWS_REGION, AWS_UPLOAD_BUCKET, AWS_UPLOAD_BUCKET_CATALOG, AWS_TARGET_BUCKET_CATALOG,
} = process.env;
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

    const promises = objects.map((key) => {
      return new Promise((resolve) => {
        const objectParams = {
          Bucket: AWS_UPLOAD_BUCKET,
          Key: key,
        };

        console.log('ObjParams', objectParams);

        S3
            .getObject(objectParams)
            .createReadStream()
            .pipe(csvParser())
            .on('data', (data) => {
              console.log(JSON.stringify(data));
            })
            .on('error', (e) => {
              throw new Error(`Parsing error: ${e.message}`);
            })
            .on('end', async () => {
              const source = `${AWS_UPLOAD_BUCKET}/${key}`;
              const dest = key.replace(AWS_UPLOAD_BUCKET_CATALOG, AWS_TARGET_BUCKET_CATALOG);

              await S3.copyObject({
                Bucket: AWS_UPLOAD_BUCKET,
                CopySource: source,
                Key: dest,
              }).promise();

              console.log(`File -- ${source} -- copied to ${dest}.`);

              await S3.deleteObject({
                Bucket: AWS_UPLOAD_BUCKET,
                Key: key,
              }).promise();

              console.log(`File -- ${source} -- deleted.`);

              resolve('Done');
            });
      });
    });

    await Promise.all(promises);
  } catch (e) {
    console.log('error', JSON.stringify(e));
    throw new InternalServerError(e.message);
  }
};
