import { Client } from 'minio'

const region = 'us-east-1'

const minioClient = new Client({
  endPoint: 'localhost',
  port: 9000,
  path: 'minio',
  secure: false,
  insecure: true,
  accessKey: 'minioAccessKey',
  secretKey: 'minioSecretKey'
})

export default {
  client: minioClient,
  region
}
