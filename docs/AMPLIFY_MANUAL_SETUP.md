# Manual Amplify Setup

Since you're having permission issues with npm global installations, here's how to set up Amplify manually:

## 1. Install Amplify Locally

```bash
npm install --save aws-amplify @aws-amplify/ui-react
```

## 2. Create AWS Resources Manually

1. **Create a Cognito User Pool**:
   - Go to [Amazon Cognito Console](https://console.aws.amazon.com/cognito/home)
   - Click "Create user pool"
   - Follow the wizard to set up authentication
   - Note the User Pool ID and App Client ID

2. **Create an AppSync API**:
   - Go to [AWS AppSync Console](https://console.aws.amazon.com/appsync/home)
   - Click "Create API"
   - Choose "Design from scratch"
   - Create your schema and note the API endpoint and API key

## 3. Configure Amplify in Your App

Create a configuration file at `src/amplify/config.js`:

```javascript
export const amplifyConfig = {
  "aws_project_region": "us-east-1",
  "aws_cognito_identity_pool_id": "YOUR_IDENTITY_POOL_ID",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "YOUR_USER_POOL_ID",
  "aws_user_pools_web_client_id": "YOUR_USER_POOL_CLIENT_ID",
  "aws_appsync_graphqlEndpoint": "YOUR_GRAPHQL_ENDPOINT",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "YOUR_API_KEY"
};
```

## 4. Initialize Amplify in Your App

In your main.jsx file:

```javascript
import { Amplify } from 'aws-amplify';
import { amplifyConfig } from './amplify/config';

// Configure Amplify
Amplify.configure(amplifyConfig);
```

## 5. Use Amplify Components

Import and use Amplify components in your app:

```javascript
import { AmplifyAuth } from './components/AmplifyAuth';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <AmplifyAuth />
    </div>
  );
}
```

## Alternative: Use AWS Amplify Console

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/home)
2. Click "New app" > "Host web app"
3. Connect to your GitHub repository
4. Follow the setup wizard