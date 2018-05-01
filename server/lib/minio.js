import logger from './logger'
import { minioConfig } from '../config'

const { client, region } = minioConfig

const setBucketPolicy = async (bucketName) => {
  try {
    await client.setBucketPolicy(bucketName, JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Sid: '',
          Action: ['s3:GetObject'],
          Effect: 'Allow',
          Resource: `arn:aws:s3:::${bucketName}/*`,
          Principal: {
            AWS: ['*']
          }
        }
      ]
    }))
  } catch (err) {
    logger.error(err)
  }
}

/**
 * Creates a bucket to upload
 * @param {String} bucketName
 */
const makeBucket = async (bucketName) => {
  try {
    await client.makeBucket(bucketName, region)
    await setBucketPolicy(bucketName)
  } catch (err) {
    logger.error(err)
  }
}
/**
 * checks if a bucket exists
 * @param {String} bucketName
 */
const bucketExists = async (bucketName) => {
  try {
    return await client.bucketExists(bucketName)
  } catch (err) {
    logger.error(err)
  }
}
/**
 * get's a pre-signed url to upload a file
 * @param {String} bucketName
 * @param {String} objectName
 */
const presignedPutObject = async (bucketName, objectName) => {
  try {
    return await client.presignedPutObject(bucketName, objectName)
  } catch (err) {
    logger.error(err)
  }
}
/**
 * creates a bucket if it doesn't already exists.
 * @param {String} bucketName
 */
const createBucketIfNecessary = async (bucketName) => {
  try {
    const exists = await bucketExists(bucketName)
    console.log('exists', exists, bucketName)
    if (!exists) {
      await makeBucket(bucketName)
    }
  } catch (err) {
    logger.error(err)
  }
}

export {
  presignedPutObject,
  createBucketIfNecessary

}
