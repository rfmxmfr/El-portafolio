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
