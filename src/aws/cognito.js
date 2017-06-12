import {CognitoIdentityCredentials, config} from 'aws-sdk/dist/aws-sdk-react-native';

export const authenticateUserAgainstFacebookToken = (fbToken) => {
  return new Promise((resolve, reject) => {
    config.region = 'us-west-2';
    config.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: "<THIS IS YOUR FEDERATED IDENTITY>",
      Logins: {
        'graph.facebook.com': fbToken
      }
    });
    config.credentials.refresh(function (error) {
      if (error) {
        return reject(error);
      } else {
        return resolve(config.credentials);
      }
    });
  });
}
