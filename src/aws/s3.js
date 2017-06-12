import {
  transferUtility
} from 'react-native-s3';

export const uploadImage = (credentials, image, imageName, uid) => {
  return new Promise((resolve, reject) => {
    const data = {
      bucket: 'marcussmithtestbucket',
      key: uid + "/" + imageName,
      file: image
    }
    const options = {
      region: "us-east-1",
      access_key: credentials.accessKeyId,
      secret_key: credentials.secretAccessKey,
      session_token: credentials.sessionToken
    }
    transferUtility.setupWithBasic(options)
      .then(() => transferUtility.upload(data))
      .then(results => {
        return resolve(results);
      })
      .catch(err => {
        return reject(err)
      })
  })
}
