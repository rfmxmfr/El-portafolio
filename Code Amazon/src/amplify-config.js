export const amplifyConfig = {
  // This will be replaced with actual values after deployment
  API: {
    GraphQL: {
      endpoint: process.env.GRAPHQL_ENDPOINT || 'https://placeholder-api-id.appsync-api.region.amazonaws.com/graphql',
      region: process.env.AWS_REGION || 'us-east-1',
      defaultAuthMode: 'apiKey',
      apiKey: process.env.API_KEY || 'placeholder-api-key'
    }
  },
  Auth: {
    Cognito: {
      userPoolId: process.env.USER_POOL_ID || 'placeholder-user-pool-id',
      userPoolClientId: process.env.USER_POOL_CLIENT_ID || 'placeholder-user-pool-client-id',
      identityPoolId: process.env.IDENTITY_POOL_ID || 'placeholder-identity-pool-id',
      signUpVerificationMethod: 'code'
    }
  }
};