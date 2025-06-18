#!/bin/bash

# Local Amplify setup without global installation

# Install Amplify locally in the project
npm install --save aws-amplify @aws-amplify/ui-react

# Create a simple Amplify configuration
mkdir -p src/amplify
cat > src/amplify/config.js << EOF
export const amplifyConfig = {
  "aws_project_region": "us-east-1",
  "aws_cognito_identity_pool_id": "REPLACE_WITH_YOUR_IDENTITY_POOL_ID",
  "aws_cognito_region": "us-east-1",
  "aws_user_pools_id": "REPLACE_WITH_YOUR_USER_POOL_ID",
  "aws_user_pools_web_client_id": "REPLACE_WITH_YOUR_USER_POOL_CLIENT_ID",
  "aws_appsync_graphqlEndpoint": "REPLACE_WITH_YOUR_GRAPHQL_ENDPOINT",
  "aws_appsync_region": "us-east-1",
  "aws_appsync_authenticationType": "API_KEY",
  "aws_appsync_apiKey": "REPLACE_WITH_YOUR_API_KEY"
};
EOF

# Create a simple React component for authentication
mkdir -p src/components
cat > src/components/AmplifyAuth.jsx << EOF
import { useState, useEffect } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import { amplifyConfig } from '../amplify/config';

// Configure Amplify
Amplify.configure(amplifyConfig);

export default function AmplifyAuth() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [authState, setAuthState] = useState('signIn');
  
  useEffect(() => {
    checkUser();
  }, []);
  
  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  }
  
  async function signUp() {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: { email }
      });
      setAuthState('confirmSignUp');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  }
  
  async function signIn() {
    try {
      await Auth.signIn(username, password);
      checkUser();
    } catch (error) {
      console.error('Error signing in:', error);
    }
  }
  
  async function signOut() {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  
  if (user) {
    return (
      <div>
        <h2>Welcome, {user.username}</h2>
        <button onClick={signOut}>Sign Out</button>
      </div>
    );
  }
  
  return (
    <div>
      <h2>Authentication</h2>
      
      {authState === 'signIn' && (
        <div>
          <h3>Sign In</h3>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signIn}>Sign In</button>
          <p>
            Don't have an account?{' '}
            <button onClick={() => setAuthState('signUp')}>Sign Up</button>
          </p>
        </div>
      )}
      
      {authState === 'signUp' && (
        <div>
          <h3>Sign Up</h3>
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={signUp}>Sign Up</button>
          <p>
            Already have an account?{' '}
            <button onClick={() => setAuthState('signIn')}>Sign In</button>
          </p>
        </div>
      )}
    </div>
  );
}
EOF

echo "Local Amplify setup complete!"
echo ""
echo "Next steps:"
echo "1. Create your AWS resources manually in the AWS Console"
echo "2. Update the configuration in src/amplify/config.js"
echo "3. Import the AmplifyAuth component in your app"
echo ""
echo "Example usage in your app:"
echo "import AmplifyAuth from './components/AmplifyAuth';"
echo ""
echo "<AmplifyAuth />"